// react custom hook to fetch and manage transactions
import { useCallback, useState} from 'react';
import { Alert } from 'react-native';
import { API_URL } from '../constants/api';
//
// const API_URL = "https://CashBoss-api-cxqp.onrender.com/api"; // production URL its deployed
// API base URL
//const API_URL = 'https://localhost:5001/api';

// custom hook to manage transactions and summary
export const useTransactions = (user_id) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
    const [loading, setLoading] = useState(true);

    // Fetch transactions for the user
    const fetchTransactions = useCallback (async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${user_id}`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    }, [user_id]);

    // Fetch summary (income, expenses, balance) for the user
    const fetchSummary = useCallback (async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${user_id}`);
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error('Error fetching summary:', error);
        } finally {
            setLoading(false);
        }
    }, [user_id]);

// Load both transactions and summary   
    const loadData = useCallback (async () => {
        if (!user_id) return;

        setLoading(true);
        try {
            // Fetch transactions and summary in parallel
          await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setLoading(false);
        }
    }, [fetchTransactions, fetchSummary, user_id]);


    const deleteTransaction = async (id) => { 
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {method: 'DELETE'});
            if (!response.ok) throw new Error('Failed to delete transaction');

            // Refresh data after deletion
            loadData();
            Alert.alert('Transaction deleted successfully');
        } catch (error) {
            console.error('Error deleting transaction:', error);    
            Alert.alert('Error', error.message);
        }
    };
    return {
        transactions,
        summary,
        loading,
        loadData,
        deleteTransaction,
    };
};    