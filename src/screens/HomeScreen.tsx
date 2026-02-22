import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import BookmarksPreview from "../components/BookmarksPreview";
import CardButton from "../components/CardButton";
import CompanyCompareCard from "../components/CompanyCompareCard";
import DisclaimerBanner from "../components/DisclaimerBanner";
import LearningPathCard from "../components/LearningPathCard";
import RecentlyViewedPreview from "../components/RecentlyViewedPreview";
import { LEARNING_PATH } from "../data/learningPath";
import { useLearningProgress } from "../hooks/useLearningProgress";
import type { Bookmark, RecentlyViewedItem, Route } from "../types";

interface HomeScreenProps {
  onNavigate: (route: Route) => void;
  bookmarks?: Bookmark[];
  recentlyViewed?: RecentlyViewedItem[];
}


const FEATURES = [
  { key: "knowledge-list", title: "Kiến thức MLM" },
  { key: "regulation-list", title: "Pháp luật (tham khảo)" },
  { key: "company-list", title: "Doanh nghiệp" },
  { key: "qa-list", title: "Hỏi & đáp" },
  { key: "alert-list", title: "Cảnh báo" },
  { key: "news-list", title: "Tin tức" },
];

export default function HomeScreen({
  onNavigate,
  bookmarks = [],
  recentlyViewed = [],
}: HomeScreenProps) {
  const { getProgressPercentage } = useLearningProgress();
  
  const totalLessons = LEARNING_PATH.reduce((sum, day) => sum + day.lessons.length, 0);
  const learningProgress = getProgressPercentage(totalLessons);

  const handleBookmarkItemPress = (bookmark: Bookmark) => {
    switch (bookmark.type) {
      case "knowledge":
        return onNavigate({ name: "knowledge-detail", params: { id: bookmark.id } });
      case "regulation":
        return onNavigate({ name: "regulation-detail", params: { id: bookmark.id } });
      case "company":
        return onNavigate({ name: "company-detail", params: { id: bookmark.id } });
      case "qa":
        return onNavigate({ name: "qa-detail", params: { id: bookmark.id } });
      case "alert":
        return onNavigate({ name: "alert-detail", params: { id: bookmark.id } });
      case "news":
        return onNavigate({ name: "news-detail", params: { id: bookmark.id } });
    }
  };

  const handleRecentItemPress = (item: RecentlyViewedItem) => {
    switch (item.type) {
      case "knowledge":
        return onNavigate({ name: "knowledge-detail", params: { id: item.id } });
      case "regulation":
        return onNavigate({ name: "regulation-detail", params: { id: item.id } });
      case "company":
        return onNavigate({ name: "company-detail", params: { id: item.id } });
      case "qa":
        return onNavigate({ name: "qa-detail", params: { id: item.id } });
      case "alert":
        return onNavigate({ name: "alert-detail", params: { id: item.id } });
      case "news":
        return onNavigate({ name: "news-detail", params: { id: item.id } });
    }
  };

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
        <Text style={styles.riskAssessmentTitle}>Tự đánh giá rủi ro MLM</Text>
        <Text style={styles.riskAssessmentDesc}>
          Bộ câu hỏi đơn giản giúp bạn tự suy nghĩ về mô hình
        </Text>
      </Pressable>

      {/* Learning Path Card */}
      <LearningPathCard
        progress={learningProgress}
        onPress={() => onNavigate({ name: "learning-path" })}
      />

      {/* Company Compare Card */}
      <CompanyCompareCard onPress={() => onNavigate({ name: "company-select" })} />

      {/* Recently Viewed Preview */}
      <RecentlyViewedPreview
        items={recentlyViewed}
        onItemPress={handleRecentItemPress}
        onViewAllPress={() => onNavigate({ name: "bookmarks" })}
      />

      {/* Bookmarks Preview */}
      <BookmarksPreview
        bookmarks={bookmarks}
        onItemPress={handleBookmarkItemPress}
        onViewAllPress={() => onNavigate({ name: "bookmarks" })}
      />

      {/* Main Features Grid */}
      <View style={styles.sectionLabel}>
        <Text style={styles.sectionTitle}>Khám phá</Text>
      </View>

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
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#FEF3C7",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#FCD34D",
  },
  riskAssessmentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#78350F",
    marginBottom: 4,
  },
  riskAssessmentDesc: {
    fontSize: 13,
    color: "#92400E",
    lineHeight: 18,
  },
  sectionLabel: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
  },
  gridItem: { width: "47%", flexGrow: 1 },
});
