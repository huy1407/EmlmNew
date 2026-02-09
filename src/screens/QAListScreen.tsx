import React, { useState, useMemo } from "react";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import type { QAItem } from "../types";
import type { Route } from "../types";
import { theme } from "../styles/theme";

interface QAListScreenProps {
  items: QAItem[];
  onNavigate: (route: Route) => void;
}

const TOPICS = ["Tất cả", "Legal", "Experience", "Income", "Contracts"];

export default function QAListScreen({ items, onNavigate }: QAListScreenProps) {
  const [topic, setTopic] = useState("Tất cả");
  const filtered = useMemo(
    () =>
      topic === "Tất cả" ? items : items.filter((i) => i.topic === topic),
    [items, topic]
  );

  return (
    <View style={styles.container}>
      <DisclaimerBanner />
      <Pressable style={styles.askBtn} onPress={() => onNavigate({ name: "ask-question" })}>
        <Text style={styles.askBtnText}>Đặt câu hỏi</Text>
      </Pressable>
      <View style={styles.chips}>
        {TOPICS.map((t) => (
          <Pressable
            key={t}
            style={[styles.chip, topic === t && styles.chipActive]}
            onPress={() => setTopic(t)}
          >
            <Text style={[styles.chipText, topic === t && styles.chipTextActive]}>
              {t}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<SectionHeader title="Hỏi & đáp" />}
        renderItem={({ item }) => (
          <ListItemRow
            title={item.question}
            subtitle={item.topic}
            onPress={() =>
              onNavigate({ name: "qa-detail", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <ListItemRow title="Không có câu hỏi" onPress={() => {}} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  askBtn: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  askBtnText: { fontSize: 15, fontWeight: "600", color: "#fff" },
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
