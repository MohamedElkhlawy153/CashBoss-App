// react custom hook to fetch and manage transactions
import { useCallback, useState} from 'react';
import { Alert } from 'react-native';


// API base URL
const API_URL = 'https://localhost:5001/api/transactions';

// custom hook to manage transactions and summary
export const useTransactions = (userID) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
    const [loading, setLoading] = useState(true);

    // Fetch transactions for the user
    const fetchTransactions = useCallback (async () => {
        try {
            const response = await fetch(`${API_URL}/${userID}`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    }, [userID]);

    // Fetch summary (income, expenses, balance) for the user
    const fetchSummary = useCallback (async () => {
        try {
            const response = await fetch(`${API_URL}/summary/${userID}`);
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error('Error fetching summary:', error);
        } finally {
            setLoading(false);
        }
    }, [userID]);

// Load both transactions and summary   
    const loadData = useCallback (async () => {
        if (!userID) return;

        setLoading(true);
        try {
            // Fetch transactions and summary in parallel
          await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userID]);


    const deleteTransaction = async (id) => { 
        try {
            const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
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