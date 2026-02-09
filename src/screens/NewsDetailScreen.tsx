import React from "react";
import { View, Text, ScrollView, Pressable, Linking, StyleSheet } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { formatDate, shareWithDisclaimer } from "../utils";
import type { NewsItem } from "../types";
import { theme } from "../styles/theme";

interface NewsDetailScreenProps {
  item: NewsItem | undefined;
  onBack: () => void;
}

export default function NewsDetailScreen({ item }: NewsDetailScreenProps) {
  if (!item) return null;

  const handleOpenSource = () => {
    Linking.openURL(item.sourceUrl);
  };

  const handleShare = () => {
    shareWithDisclaimer(item.title, item.summary, item.sourceUrl);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>{formatDate(item.publishedAt)}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.btn} onPress={handleOpenSource}>
          <Text style={styles.btnText}>Mở nguồn</Text>
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
  meta: { fontSize: 14, color: theme.colors.muted, marginBottom: 12 },
  summary: {
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
    backgroundColor: theme.colors.primary,
  },
  btnText: { fontSize: 14, fontWeight: "600", color: "#fff" },
});
