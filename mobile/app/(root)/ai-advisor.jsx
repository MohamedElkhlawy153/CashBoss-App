import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import { styles } from "../../assets/styles/home.styles";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";

export default function AIAdvisor() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    if (!user?.id) {
      Alert.alert("Error", "User not loaded");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/ai/advice/${user.id}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to get AI advice");
      }
      
      setAdvice(data.aiAdvice); // Note: changed from data.advice to data.aiAdvice
    } catch (err) {
      console.error("AI Advice Error:", err);
      setError(err.message || "Failed to get advice. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchAdvice();
    }
  }, [isLoaded, user?.id]);

  if (!isLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: '#f5f5f5' }]} 
      contentContainerStyle={{ padding: 20 }}
    >
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={{ marginBottom: 20 }}
      >
        <Text style={{ color: COLORS.primary, fontSize: 16 }}>‹ Back</Text>
      </TouchableOpacity>

      <View style={[styles.card, { padding: 20, borderRadius: 12 }]}>
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12 }}>
          🤖 AI Financial Advisor
        </Text>
        
        <Text style={{ marginBottom: 20, color: COLORS.text, fontSize: 16 }}>
          Get personalized insights about your spending patterns and financial habits.
        </Text>

        <TouchableOpacity
          onPress={fetchAdvice}
          style={{
            backgroundColor: COLORS.primary,
            padding: 16,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: error || advice ? 20 : 0
          }}
          disabled={loading}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            {loading ? "Analyzing..." : "Get Fresh Insights"}
          </Text>
        </TouchableOpacity>

        {loading && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 10, color: COLORS.text }}>
              Analyzing your transactions...
            </Text>
          </View>
        )}

        {error && (
          <View style={{ marginTop: 16, padding: 16, backgroundColor: '#ffebee', borderRadius: 8 }}>
            <Text style={{ color: '#c62828' }}>{error}</Text>
          </View>
        )}

        {advice && !loading && (
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
              💡 Financial Insights
            </Text>
            <Text style={{ color: COLORS.text, fontSize: 16, lineHeight: 24 }}>
              {advice}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}