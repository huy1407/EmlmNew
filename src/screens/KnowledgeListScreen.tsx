import React, { useState, useMemo } from "react";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import { formatDate } from "../utils";
import type { KnowledgeArticle } from "../types";
import type { Route } from "../types";
import { theme } from "../styles/theme";

interface KnowledgeListScreenProps {
  articles: KnowledgeArticle[];
  onNavigate: (route: Route) => void;
  onBack: () => void;
}

const CATEGORIES = ["Tất cả", "Cơ bản", "Cảnh giác", "Pháp lý", "Kinh nghiệm", "Thu nhập", "Bảo mật"];

export default function KnowledgeListScreen({
  articles,
  onNavigate,
}: KnowledgeListScreenProps) {
  const [category, setCategory] = useState("Tất cả");
  const filtered = useMemo(
    () =>
      category === "Tất cả"
        ? articles
        : articles.filter((a) => a.category === category),
    [articles, category]
  );

  return (
    <View style={styles.container}>
      <DisclaimerBanner />
      <View style={styles.chips}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>
              {c}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<SectionHeader title="Bài viết" />}
        renderItem={({ item }) => (
          <ListItemRow
            title={item.title}
            subtitle={`${item.category} • ${formatDate(item.updatedAt)}`}
            onPress={() =>
              onNavigate({ name: "knowledge-detail", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <ListItemRow title="Không có bài viết" onPress={() => {}} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
  },
  chipActive: { backgroundColor: theme.colors.primary },
  chipText: { fontSize: 13, color: theme.colors.text },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  empty: { padding: 16 },
});
