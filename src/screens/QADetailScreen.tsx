import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { formatDate, shareWithDisclaimer } from "../utils";
import type { QAItem } from "../types";
import { theme } from "../styles/theme";

interface QADetailScreenProps {
  item: QAItem | undefined;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onBack: () => void;
}

export default function QADetailScreen({
  item,
  isBookmarked,
  onToggleBookmark,
}: QADetailScreenProps) {
  if (!item) return null;

  const handleShare = () => {
    shareWithDisclaimer(
      item.question,
      `${item.question}\n\n${item.answer}`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      <Text style={styles.topic}>{item.topic}</Text>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
      <Text style={styles.meta}>{formatDate(item.updatedAt)}</Text>
      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, isBookmarked && styles.btnActive]}
          onPress={onToggleBookmark}
        >
          <Text style={[styles.btnText, isBookmarked && styles.btnTextActive]}>
            {isBookmarked ? "★ Đã lưu" : "☆ Lưu"}
          </Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleShare}>
          <Text style={styles.btnText}>Chia sẻ</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  topic: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: "600",
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 12,
  },
  answer: {
    fontSize: 16,
    color: theme.colors.muted,
    lineHeight: 24,
    marginBottom: 8,
  },
  meta: { fontSize: 13, color: theme.colors.muted, marginBottom: 24 },
  actions: { flexDirection: "row", gap: 12 },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  btnActive: {
    backgroundColor: theme.colors.yellowBg,
    borderColor: theme.colors.yellowBorder,
  },
  btnText: { fontSize: 14, fontWeight: "600", color: theme.colors.text },
  btnTextActive: { color: theme.colors.muted },
});
