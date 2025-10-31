import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // pass user?.id to avoid calling hook with undefined id
  const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user?.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  // Load data when user ID changes 
  useEffect(() => {
    loadData();
  }, [loadData, user?.id]);

// Function to handle transaction deletion with confirmation alert
  const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) },
    ]);
  };

// wait until Clerk user is loaded
  if (!isLoaded) return <PageLoader />;
  if (isLoading) return <PageLoader />;
   // Render the main page UI for signed-in users showing balance and transactions
  return (
    <View style={styles.container}>
       <View style={styles.content}>  
         {/* Header Section */}
         <View style={styles.header}>
           {/* header left*/}
           <View style={styles.headerLeft}>
               <Image 
                source={require('../../assets/images/logo.png')} 
                style={styles.headerLogo} 
                resizeMode="contain"
               />
             <View style={styles.welcomeContainer}>
               <Text style={styles.welcomeText}>Welcome,</Text>
               <Text style={styles.usernameText}>
                 {/* Display username before "@" in email (safe) */}
                 {(() => {
                    const email = user?.emailAddresses?.[0]?.emailAddress;
                    return email ? email.split("@")[0] : "";
                  })()}
               </Text>
             </View>
             </View>
           {/* header right*/}
           <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
        </View>
      </View>
        {/* Balance Card Section */}
      <BalanceCard summary={summary} />

      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
      </View>
    </View>

        {/* Transaction List Section*/}
        {/*it was missing FlatList component to render the transactions*/}
        <FlatList
           style={styles.transactionsList}
           contentContainerStyle={styles.transactionsListContent}
           data={transactions}
           renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
           ListEmptyComponent={<NoTransactionsFound />}
           showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
           // use FlatList's built-in refreshing props
            refreshing={refreshing}
            onRefresh={onRefresh}
       />
     </View>
   );
 }