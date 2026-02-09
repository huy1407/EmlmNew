import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { formatDate, shareWithDisclaimer } from "../utils";
import type { KnowledgeArticle } from "../types";
import { theme } from "../styles/theme";

interface KnowledgeDetailScreenProps {
  article: KnowledgeArticle | undefined;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onBack: () => void;
}

export default function KnowledgeDetailScreen({
  article,
  isBookmarked,
  onToggleBookmark,
  onBack,
}: KnowledgeDetailScreenProps) {
  if (!article) return null;

  const handleShare = () => {
    shareWithDisclaimer(article.title, article.content);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.meta}>
        {article.category} • {formatDate(article.updatedAt)}
      </Text>
      <Text style={styles.body}>{article.content}</Text>
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
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 8,
  },
  meta: { fontSize: 14, color: theme.colors.muted, marginBottom: 16 },
  body: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: { flexDirection: "row", gap: 12 },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  btnActive: { backgroundColor: theme.colors.yellowBg, borderColor: theme.colors.yellowBorder },
  btnText: { fontSize: 14, fontWeight: "600", color: theme.colors.text },
  btnTextActive: { color: theme.colors.muted },
});
