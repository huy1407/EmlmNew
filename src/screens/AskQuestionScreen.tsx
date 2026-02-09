import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { theme } from "../styles/theme";

const TOPICS = ["Legal", "Experience", "Income", "Contracts"];

interface AskQuestionScreenProps {
  onSubmit: (question: string, topic: string) => void;
  onBack: () => void;
}

export default function AskQuestionScreen({
  onSubmit,
  onBack,
}: AskQuestionScreenProps) {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("Legal");

  const handleSubmit = () => {
    if (!question.trim()) return;
    onSubmit(question.trim(), topic);
    Alert.alert(
      "Đã ghi nhận",
      "Câu hỏi đã được ghi nhận (ẩn danh).",
      [{ text: "OK" }]
    );
    setQuestion("");
  };

  return (
    <View style={styles.container}>
      <DisclaimerBanner />
      <Text style={styles.label}>Nhập câu hỏi</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập câu hỏi của bạn..."
        placeholderTextColor={theme.colors.muted}
        value={question}
        onChangeText={setQuestion}
        multiline
        numberOfLines={4}
      />
      <Text style={styles.label}>Chủ đề</Text>
      <View style={styles.topicRow}>
        {TOPICS.map((t) => (
          <Pressable
            key={t}
            style={[styles.topicBtn, topic === t && styles.topicBtnActive]}
            onPress={() => setTopic(t)}
          >
            <Text style={[styles.topicText, topic === t && styles.topicTextActive]}>
              {t}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Gửi câu hỏi</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: theme.colors.text,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  topicRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  topicBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  topicBtnActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  topicText: { fontSize: 14, color: theme.colors.text },
  topicTextActive: { color: "#fff", fontWeight: "600" },
  submitBtn: {
    paddingVertical: 14,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { fontSize: 16, fontWeight: "600", color: "#fff" },
});
