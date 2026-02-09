import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { formatDate, shareWithDisclaimer } from "../utils";
import type { AlertPost } from "../types";
import { theme } from "../styles/theme";

interface AlertDetailScreenProps {
  alert: AlertPost | undefined;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onBack: () => void;
}

const NEUTRAL_NOTE = "Các dấu hiệu rủi ro — cần thận trọng";

export default function AlertDetailScreen({
  alert: alertPost,
  isBookmarked,
  onToggleBookmark,
}: AlertDetailScreenProps) {
  if (!alertPost) return null;

  const handleShare = () => {
    shareWithDisclaimer(
      alertPost.title,
      `${alertPost.description}\n\nNguồn: ${alertPost.sourceNote}\n\n${NEUTRAL_NOTE}`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      <Text style={styles.title}>{alertPost.title}</Text>
      <Text style={styles.note}>{NEUTRAL_NOTE}</Text>
      <Text style={styles.body}>{alertPost.description}</Text>
      <Text style={styles.source}>Nguồn: {alertPost.sourceNote}</Text>
      <Text style={styles.meta}>{formatDate(alertPost.updatedAt)}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: theme.colors.orange,
    fontWeight: "600",
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: theme.colors.muted,
    lineHeight: 24,
    marginBottom: 8,
  },
  source: { fontSize: 13, color: theme.colors.muted, fontStyle: "italic", marginBottom: 4 },
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
