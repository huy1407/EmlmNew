import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import type { RecentlyViewedItem } from "../types";

interface RecentlyViewedPreviewProps {
  items: RecentlyViewedItem[];
  onItemPress: (item: RecentlyViewedItem) => void;
  onViewAllPress: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  knowledge: "Kiến thức",
  regulation: "Pháp luật",
  company: "Doanh nghiệp",
  qa: "Hỏi & đáp",
  alert: "Cảnh báo",
  news: "Tin tức",
};

export default function RecentlyViewedPreview({
  items,
  onItemPress,
  onViewAllPress,
}: RecentlyViewedPreviewProps) {
  if (items.length === 0) {
    return null;
  }

  const displayedItems = items.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đã xem gần đây ({items.length})</Text>
        <Pressable onPress={onViewAllPress}>
          <Text style={styles.viewAll}>Xem tất cả ›</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayedItems.map((item, idx) => (
          <Pressable
            key={`${item.type}-${item.id}-${idx}`}
            style={styles.card}
            onPress={() => onItemPress(item)}
          >
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.cardSubtitle}>{TYPE_LABELS[item.type]}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
  },
  viewAll: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 160,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 12,
    ...theme.shadow,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 12,
    color: theme.colors.muted,
  },
});
