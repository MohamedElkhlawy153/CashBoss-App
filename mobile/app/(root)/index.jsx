// ...existing code...
import { useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import { COLORS } from "../../constants/colors";
// ...existing code...

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

  // Load data when user ID becomes available
  useEffect(() => {
    if (user?.id) {
      loadData();
    }
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



// 
  const ListHeader = () => (
    <View style={styles.content}>
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: COLORS.primary }]} 
          onPress={() => router.push("/create")}
        >
          <Ionicons name="add" size={18} color="#FFF" />
          <Text style={styles.addButtonText}> New</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: COLORS.primary }]} 
          onPress={() => router.push("/ai-advisor")}
        >
          <Ionicons name="bulb" size={18} color="#FFF" />
          <Text style={styles.addButtonText}> AI Advice</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: COLORS.primary }]} 
          onPress={() => router.push("/ai-chat")}
        >
          <Ionicons name="chatbubbles" size={18} color="#FFF" />
          <Text style={styles.addButtonText}> Chat</Text>
        </TouchableOpacity>
      </View>

      <BalanceCard summary={summary} />

      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Fixed Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User"}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <SignOutButton />
          </View>
        </View>

        {/* Scrollable Content */}
        <View style={styles.mainContent}>
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <TransactionItem item={item} onDelete={handleDelete} />
            )}
            keyExtractor={(item) => String(item.id)}
            ListEmptyComponent={<NoTransactionsFound />}
            ListHeaderComponent={ListHeader}
            contentContainerStyle={styles.transactionsListContent}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

