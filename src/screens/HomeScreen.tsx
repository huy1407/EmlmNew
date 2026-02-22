import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import CardButton from "../components/CardButton";
import type { Route } from "../types";

interface HomeScreenProps {
  onNavigate: (route: Route) => void;
}

const FEATURES = [
  { key: "knowledge-list", title: "Kiến thức MLM" },
  { key: "regulation-list", title: "Pháp luật (tham khảo)" },
  { key: "company-list", title: "Doanh nghiệp" },
  { key: "qa-list", title: "Hỏi & đáp" },
  { key: "alert-list", title: "Cảnh báo" },
  { key: "news-list", title: "Tin tức" },
];

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.appName}>eMLM</Text>
      </View>

      <Pressable style={styles.searchBar} onPress={() => onNavigate({ name: "search" })}>
        <Text style={styles.searchPlaceholder}>Tìm kiếm...</Text>
      </Pressable>

      <DisclaimerBanner />

      {/* Prominent Risk Assessment Tool */}
      <Pressable
        style={styles.riskAssessmentCard}
        onPress={() => onNavigate({ name: "risk-assessment" })}
      >
        <Text style={styles.riskAssessmentTitle}>⚠️ Tự đánh giá rủi ro MLM</Text>
        <Text style={styles.riskAssessmentDesc}>
          Bộ câu hỏi đơn giản giúp bạn tự suy nghĩ về mô hình
        </Text>
      </Pressable>

      <View style={styles.grid}>
        {FEATURES.map((f) => (
          <View key={f.key} style={styles.gridItem}>
            <CardButton
              title={f.title}
              onPress={() => onNavigate({ name: f.key as Route["name"] })}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 24 },
  header: { padding: 16 },
  appName: { fontSize: 28, fontWeight: "700", color: "#111827" },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchPlaceholder: { fontSize: 15, color: "#9CA3AF" },
  riskAssessmentCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FEF3C7",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#FCD34D",
  },
  riskAssessmentTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#78350F",
    marginBottom: 6,
  },
  riskAssessmentDesc: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
  },
  gridItem: { width: "47%", flexGrow: 1 },
});
