import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import SectionHeader from "../components/SectionHeader";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import type { Bookmark } from "../types";
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
  onRemove: (key: string) => void;
  onNavigate: (route: Route) => void;
}

function getRoute(b: Bookmark): Route {
  switch (b.type) {
    case "knowledge":
      return { name: "knowledge-detail", params: { id: b.id } };
    case "regulation":
      return { name: "regulation-detail", params: { id: b.id } };
    case "company":
      return { name: "company-detail", params: { id: b.id } };
    case "qa":
      return { name: "qa-detail", params: { id: b.id } };
    case "alert":
      return { name: "alert-detail", params: { id: b.id } };
    case "news":
      return { name: "news-detail", params: { id: b.id } };
    default:
      return { name: "home" };
  }
}

export default function BookmarksScreen({
  bookmarks,
  onRemove,
  onNavigate,
}: BookmarksScreenProps) {
  const grouped = React.useMemo(() => {
    const map = new Map<string, Bookmark[]>();
    bookmarks.forEach((b) => {
      if (!map.has(b.type)) map.set(b.type, []);
      map.get(b.type)!.push(b);
    });
    return Array.from(map.entries());
  }, [bookmarks]);

  if (bookmarks.length === 0) {
    return (
      <View style={styles.container}>
        <DisclaimerBanner />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Chưa có bookmark</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DisclaimerBanner />
      <FlatList
        data={grouped}
        keyExtractor={([type]) => type}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: { fontSize: 15, color: theme.colors.muted },
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
