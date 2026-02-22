import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import type { Bookmark } from "../types";

interface BookmarksPreviewProps {
  bookmarks: Bookmark[];
  onItemPress: (bookmark: Bookmark) => void;
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

export default function BookmarksPreview({
  bookmarks,
  onItemPress,
  onViewAllPress,
}: BookmarksPreviewProps) {
  if (bookmarks.length === 0) {
    return null;
  }

  const displayedBookmarks = bookmarks.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đã lưu ({bookmarks.length})</Text>
        <Pressable onPress={onViewAllPress}>
          <Text style={styles.viewAll}>Xem tất cả ›</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayedBookmarks.map((bookmark) => (
          <Pressable
            key={bookmark.key}
            style={styles.card}
            onPress={() => onItemPress(bookmark)}
          >
            <Text style={styles.cardTitle} numberOfLines={2}>
              {bookmark.title}
            </Text>
            <Text style={styles.cardSubtitle}>{TYPE_LABELS[bookmark.type]}</Text>
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
