import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import { styles } from "../../assets/styles/home.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function extractAIText(obj) {
  try {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    if (obj.aiResponse) return obj.aiResponse;
    if (obj.reply) return obj.reply;
    if (obj.response && typeof obj.response === "string") return obj.response;
    if (obj.text) return obj.text;
    if (obj.message) return obj.message;
    // common SDK shapes
    if (obj.output && Array.isArray(obj.output)) {
      const pieces = [];
      obj.output.forEach(out => {
        if (Array.isArray(out.content)) {
          out.content.forEach(c => {
            if (c.text) pieces.push(c.text);
            else pieces.push(String(c));
          });
        } else if (out.text) pieces.push(out.text);
      });
      if (pieces.length) return pieces.join("\n");
    }
    if (obj.candidates && Array.isArray(obj.candidates) && obj.candidates[0]) {
      return obj.candidates[0].content || obj.candidates[0].text || "";
    }
    // fallback: first string property
    for (const k of Object.keys(obj)) {
      if (typeof obj[k] === "string" && obj[k].trim()) return obj[k];
    }
    return JSON.stringify(obj);
  } catch (e) {
    return "";
  }
}

export default function AIChat() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI financial assistant. How can I help you today?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!isLoaded || !user?.id) {
      Alert.alert("Error", "Please wait while we load your profile");
      return;
    }

    const newMessage = { text: input.trim(), sender: "user" };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          message: newMessage.text,
          userId: user.id 
        }),
      });

      // read raw text first for debugging if JSON fails
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        // server returned plain text / HTML / non-JSON
        console.warn("Non-JSON AI response:", text);
        data = { raw: text };
      }

      console.log("AI /ai/chat response:", res.status, data);

      if (!res.ok) {
        const errMsg = data?.error || data?.message || `Server returned ${res.status}`;
        throw new Error(errMsg);
      }

      const aiText = extractAIText(data) || (data.raw ? String(data.raw) : "");
      const aiMessage = { 
        text: aiText || "Sorry, I could not generate a response. Please try again.", 
        sender: "ai" 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      Alert.alert("Connection Error", error.message || "Failed to send message.");
      // show error message bubble from AI
      setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.container, { padding: 16 }]}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          marginBottom: 16,
          paddingTop: Platform.OS === 'ios' ? 40 : 0 
        }}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            <Text style={{ color: COLORS.primary, fontSize: 16 }}>Back</Text>
          </TouchableOpacity>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: "700",
            marginLeft: 20
          }}>
            💬 AI Financial Assistant
          </Text>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {messages.map((m, i) => (
            <View
              key={i}
              style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: m.sender === "user" ? COLORS.primary : "#F0F0F0",
                padding: 12,
                borderRadius: 16,
                marginBottom: 8,
                maxWidth: "80%",
                elevation: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
              }}
            >
              <Text style={{ 
                color: m.sender === "user" ? "#FFF" : "#000",
                fontSize: 16,
                lineHeight: 22
              }}>
                {m.text}
              </Text>
            </View>
          ))}
          {loading && (
            <View style={{ padding: 10, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          )}
        </ScrollView>

        <View style={{ 
          flexDirection: "row", 
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#EEE",
          paddingTop: 12
        }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about your finances..."
            placeholderTextColor="#999"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#DDD",
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 10,
              fontSize: 16,
              backgroundColor: "#FFF"
            }}
            multiline
            maxLength={500}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              marginLeft: 8,
              backgroundColor: input.trim() ? COLORS.primary : '#DDD',
              padding: 12,
              borderRadius: 24,
            }}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}