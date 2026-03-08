import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Linking, StyleSheet, Alert, ActivityIndicator } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { formatDate, shareWithDisclaimer } from "../utils";
import { getNewsDetail } from "../api/client";
import type { NewsItem } from "../types";
import { theme } from "../styles/theme";

interface NewsDetailScreenProps {
  item: NewsItem | undefined;
  onBack: () => void;
  onViewDetail?: () => void;
}

export default function NewsDetailScreen({ item, onViewDetail }: NewsDetailScreenProps) {
  const [newsDetail, setNewsDetail] = useState<NewsItem | null>(item || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onViewDetail?.();
    
    // If we have the item ID but not full content, fetch the details
    if (item?.id && (!item.content || item.content.length < 100)) {
      loadNewsDetail(item.id);
    }
  }, [item?.id, onViewDetail]);

  const loadNewsDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const detail = await getNewsDetail(id);
      if (detail) {
        setNewsDetail(detail);
      }
    } catch (error) {
      console.error("Error loading news detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!newsDetail) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <DisclaimerBanner />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Không tìm thấy tin tức</Text>
        </View>
      </ScrollView>
    );
  }

  const handleOpenSource = () => {
    if (newsDetail.sourceUrl) {
      Alert.alert(
        "Mở liên kết bên ngoài",
        "Bạn sắp rời khỏi ứng dụng để xem tài liệu tham khảo. Thông tin chỉ mang tính tham khảo.",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Mở",
            onPress: () => Linking.openURL(newsDetail.sourceUrl!),
          },
        ]
      );
    }
  };

  const handleShare = () => {
    shareWithDisclaimer(newsDetail.title, newsDetail.summary, newsDetail.sourceUrl);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      {isLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      <Text style={styles.title}>{newsDetail.title}</Text>
      <Text style={styles.meta}>{formatDate(newsDetail.publishedAt)}</Text>
      <Text style={styles.summary}>{newsDetail.summary}</Text>

      {/* Full content displayed natively */}
      {newsDetail.content && (
        <>
          <Text style={styles.contentLabel}>Nội dung:</Text>
          <Text style={styles.contentText}>{newsDetail.content}</Text>
        </>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        {newsDetail.sourceUrl && (
          <Pressable style={styles.btn} onPress={handleOpenSource}>
            <Text style={styles.btnText}>Mở tài liệu tham khảo</Text>
          </Pressable>
        )}
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
    color: theme.colors.muted,
    lineHeight: 24,
    marginBottom: 16,
  },
  contentLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  btnText: { fontSize: 14, fontWeight: "600", color: "#fff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.muted,
    fontWeight: "500",
  },
  loadingIndicator: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
