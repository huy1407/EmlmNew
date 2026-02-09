import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import SectionHeader from "../components/SectionHeader";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import type {
  KnowledgeArticle,
  RegulationDoc,
  Company,
  QAItem,
  AlertPost,
  NewsItem,
} from "../types";
import type { Route } from "../types";
import { theme } from "../styles/theme";

interface SearchScreenProps {
  initialQuery?: string;
  knowledge: KnowledgeArticle[];
  regulations: RegulationDoc[];
  companies: Company[];
  qa: QAItem[];
  alerts: AlertPost[];
  news: NewsItem[];
  onNavigate: (route: Route) => void;
}

type SearchResult =
  | { type: "company"; item: Company }
  | { type: "knowledge"; item: KnowledgeArticle }
  | { type: "regulation"; item: RegulationDoc }
  | { type: "qa"; item: QAItem }
  | { type: "alert"; item: AlertPost }
  | { type: "news"; item: NewsItem };

const SECTION_LABELS: Record<string, string> = {
  company: "Doanh nghiệp",
  knowledge: "Kiến thức",
  regulation: "Pháp luật",
  qa: "Hỏi & đáp",
  alert: "Cảnh báo",
  news: "Tin tức",
};

function getTitle(r: SearchResult): string {
  switch (r.type) {
    case "company":
      return r.item.name;
    case "knowledge":
      return r.item.title;
    case "regulation":
      return r.item.title;
    case "qa":
      return r.item.question;
    case "alert":
      return r.item.title;
    case "news":
      return r.item.title;
  }
}

function getRoute(r: SearchResult): Route {
  switch (r.type) {
    case "company":
      return { name: "company-detail", params: { id: r.item.id } };
    case "knowledge":
      return { name: "knowledge-detail", params: { id: r.item.id } };
    case "regulation":
      return { name: "regulation-detail", params: { id: r.item.id } };
    case "qa":
      return { name: "qa-detail", params: { id: r.item.id } };
    case "alert":
      return { name: "alert-detail", params: { id: r.item.id } };
    case "news":
      return { name: "news-detail", params: { id: r.item.id } };
  }
}

export default function SearchScreen({
  initialQuery = "",
  knowledge,
  regulations,
  companies,
  qa,
  alerts,
  news,
  onNavigate,
}: SearchScreenProps) {
  const [query, setQuery] = useState(initialQuery || "");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as SearchResult[];

    const items: SearchResult[] = [];
    companies
      .filter((c) => c.name.toLowerCase().includes(q))
      .forEach((c) => items.push({ type: "company", item: c }));
    knowledge
      .filter((k) => k.title.toLowerCase().includes(q) || k.content.toLowerCase().includes(q))
      .forEach((k) => items.push({ type: "knowledge", item: k }));
    regulations
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)
      )
      .forEach((r) => items.push({ type: "regulation", item: r }));
    qa
      .filter(
        (q_) =>
          q_.question.toLowerCase().includes(q) || q_.answer.toLowerCase().includes(q)
      )
      .forEach((q_) => items.push({ type: "qa", item: q_ }));
    alerts
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      )
      .forEach((a) => items.push({ type: "alert", item: a }));
    news
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)
      )
      .forEach((n) => items.push({ type: "news", item: n }));

    return items;
  }, [query, companies, knowledge, regulations, qa, alerts, news]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    results.forEach((r) => {
      const key = r.type;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    });
    return Array.from(map.entries());
  }, [results]);

  return (
    <View style={styles.container}>
      <DisclaimerBanner />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        placeholderTextColor={theme.colors.muted}
        value={query}
        onChangeText={setQuery}
        autoFocus
      />
      {grouped.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {query.trim() ? "Không tìm thấy kết quả" : "Nhập từ khóa để tìm kiếm"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={grouped}
          keyExtractor={([type]) => type}
          renderItem={({ item: [type, items] }) => (
            <View>
              <SectionHeader title={SECTION_LABELS[type] || type} />
              {items.map((r) => (
                <ListItemRow
                  key={`${r.type}-${(r.item as { id: string }).id}`}
                  title={getTitle(r)}
                  subtitle={SECTION_LABELS[type]}
                  onPress={() => onNavigate(getRoute(r))}
                />
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    fontSize: 15,
    color: theme.colors.text,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: { fontSize: 15, color: theme.colors.muted },
});
