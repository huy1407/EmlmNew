import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import SectionHeader from "../components/SectionHeader";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import type { Bookmark, RecentlyViewedItem } from "../types";
import type { Route } from "../types";
import { theme } from "../styles/theme";

const TYPE_LABELS: Record<string, string> = {
  knowledge: "Kiến thức",
  regulation: "Pháp luật",
  company: "Doanh nghiệp",
  qa: "Hỏi & đáp",
  alert: "Cảnh báo",
  news: "Tin tức",
};

interface BookmarksScreenProps {
  bookmarks: Bookmark[];
  recentlyViewed: RecentlyViewedItem[];
  onRemove: (key: string) => void;
  onClearRecent?: () => void;
  onClearBookmarks?: () => void;
  onNavigate: (route: Route) => void;
}

type TabKey = "saved" | "recent";

function getRoute(item: Bookmark | RecentlyViewedItem): Route {
  const type = item.type;
  const id = item.id;

  switch (type) {
    case "knowledge":
      return { name: "knowledge-detail", params: { id } };
    case "regulation":
      return { name: "regulation-detail", params: { id } };
    case "company":
      return { name: "company-detail", params: { id } };
    case "qa":
      return { name: "qa-detail", params: { id } };
    case "alert":
      return { name: "alert-detail", params: { id } };
    case "news":
      return { name: "news-detail", params: { id } };
    default:
      return { name: "home" };
  }
}

export default function BookmarksScreen({
  bookmarks,
  recentlyViewed,
  onRemove,
  onClearRecent,
  onClearBookmarks,
  onNavigate,
}: BookmarksScreenProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("saved");

  const handleClearBookmarks = () => {
    Alert.alert(
      "Xóa tất cả bookmark?",
      "Bạn chắc chắn muốn xóa tất cả mục đã lưu?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => onClearBookmarks?.(),
        },
      ]
    );
  };

  const handleClearRecent = () => {
    Alert.alert(
      "Xóa lịch sử xem?",
      "Bạn chắc chắn muốn xóa lịch sử các mục đã xem gần đây?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => onClearRecent?.(),
        },
      ]
    );
  };

  const groupedBookmarks = React.useMemo(() => {
    const map = new Map<string, Bookmark[]>();
    bookmarks.forEach((b) => {
      if (!map.has(b.type)) map.set(b.type, []);
      map.get(b.type)!.push(b);
    });
    return Array.from(map.entries());
  }, [bookmarks]);

  const groupedRecent = React.useMemo(() => {
    const map = new Map<string, RecentlyViewedItem[]>();
    recentlyViewed.forEach((item) => {
      if (!map.has(item.type)) map.set(item.type, []);
      map.get(item.type)!.push(item);
    });
    return Array.from(map.entries());
  }, [recentlyViewed]);

  const isEmptySaved = bookmarks.length === 0;
  const isEmptyRecent = recentlyViewed.length === 0;
  const isEmptyOverall = isEmptySaved && isEmptyRecent;

  if (isEmptyOverall) {
    return (
      <View style={styles.container}>
        <DisclaimerBanner />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Chưa có mục đã lưu hoặc xem gần đây</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DisclaimerBanner />

      {/* Tab Selection */}
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, activeTab === "saved" && styles.tabActive]}
          onPress={() => setActiveTab("saved")}
        >
          <Text style={[styles.tabLabel, activeTab === "saved" && styles.tabLabelActive]}>
            Đã lưu ({bookmarks.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === "recent" && styles.tabActive]}
          onPress={() => setActiveTab("recent")}
        >
          <Text style={[styles.tabLabel, activeTab === "recent" && styles.tabLabelActive]}>
            Đã xem ({recentlyViewed.length})
          </Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      {activeTab === "saved" ? (
        // Saved Bookmarks
        isEmptySaved ? (
          <View style={styles.emptyTab}>
            <Text style={styles.emptyTabText}>Chưa có bookmark</Text>
          </View>
        ) : (
          <View style={styles.tabContent}>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Mục đã lưu</Text>
              <Pressable
                style={styles.clearBtn}
                onPress={handleClearBookmarks}
              >
                <Text style={styles.clearBtnText}>Xóa tất cả</Text>
              </Pressable>
            </View>

            <FlatList
              data={groupedBookmarks}
              keyExtractor={([type]) => type}
              scrollEnabled={false}
              renderItem={({ item: [type, items] }) => (
                <View>
                  <SectionHeader title={TYPE_LABELS[type] || type} />
                  {items.map((b) => (
                    <View key={b.key} style={styles.rowWrapper}>
                      <View style={styles.rowContent}>
                        <ListItemRow
                          title={b.title}
                          subtitle={TYPE_LABELS[b.type]}
                          onPress={() => onNavigate(getRoute(b))}
                        />
                      </View>
                      <Pressable
                        style={styles.removeBtn}
                        onPress={() => onRemove(b.key)}
                      >
                        <Text style={styles.removeText}>Gỡ</Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            />
          </View>
        )
      ) : (
        // Recently Viewed
        isEmptyRecent ? (
          <View style={styles.emptyTab}>
            <Text style={styles.emptyTabText}>Chưa có lịch sử xem</Text>
          </View>
        ) : (
          <View style={styles.tabContent}>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Đã xem gần đây</Text>
              <Pressable
                style={styles.clearBtn}
                onPress={handleClearRecent}
              >
                <Text style={styles.clearBtnText}>Xóa tất cả</Text>
              </Pressable>
            </View>

            <FlatList
              data={groupedRecent}
              keyExtractor={([type]) => type}
              scrollEnabled={false}
              renderItem={({ item: [type, items] }) => (
                <View>
                  <SectionHeader title={TYPE_LABELS[type] || type} />
                  {items.map((item, idx) => (
                    <ListItemRow
                      key={`${item.type}-${item.id}-${idx}`}
                      title={item.title}
                      subtitle={TYPE_LABELS[item.type]}
                      onPress={() => onNavigate(getRoute(item))}
                    />
                  ))}
                </View>
              )}
            />
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
    backgroundColor: theme.colors.bg,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: theme.colors.primary,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.muted,
  },
  tabLabelActive: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.red,
    backgroundColor: "transparent",
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.red,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: { fontSize: 15, color: theme.colors.muted },
  emptyTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTabText: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  rowWrapper: { flexDirection: "row", alignItems: "center" },
  rowContent: { flex: 1 },
  removeBtn: {
    padding: 12,
  },
  removeText: {
    fontSize: 14,
    color: theme.colors.red,
    fontWeight: "600",
  },
});
