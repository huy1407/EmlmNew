import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import FeatureCardWithIcon from "../components/FeatureCardWithIcon";
import BookmarksPreview from "../components/BookmarksPreview";
import CompanyCompareCard from "../components/CompanyCompareCard";
import DisclaimerBanner from "../components/DisclaimerBanner";
import LearningPathCard from "../components/LearningPathCard";
import RecentlyViewedPreview from "../components/RecentlyViewedPreview";
import RiskAssessmentWidget from "../components/RiskAssessmentWidget";
import { LEARNING_PATH } from "../data/learningPath";
import { useLearningProgress } from "../hooks/useLearningProgress";
import type { Bookmark, RecentlyViewedItem, Route } from "../types";

interface HomeScreenProps {
  onNavigate: (route: Route) => void;
  bookmarks?: Bookmark[];
  recentlyViewed?: RecentlyViewedItem[];
  hideDisclaimer?: boolean;
}

const FEATURES = [
  { key: "about", title: "Giới thiệu", icon: "information-outline" },
  { key: "legal-document", title: "Pháp luật bán hàng đa cấp", icon: "scale-balance" },
  { key: "company-list", title: "Doanh nghiệp bán hàng đa cấp", icon: "bookmark" },
  { key: "qa", title: "Hỏi & đáp", icon: "help-circle-outline" },
  { key: "distributor-notes", title: "Lưu ý", icon: "alert-circle-outline" },
  { key: "news-list", title: "Tin tức", icon: "newspaper" },
];


export default function HomeScreen({
  onNavigate,
  bookmarks = [],
  recentlyViewed = [],
  hideDisclaimer = false,
}: HomeScreenProps) {
  const { getProgressPercentage } = useLearningProgress();
  const [riskAssessmentExpanded, setRiskAssessmentExpanded] = useState(false);

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

      {/* MLM Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={require("../../public/mlm-illustration.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
      {!hideDisclaimer && <DisclaimerBanner />}
      {/* Main Features Grid */}
      <View style={styles.grid}>
        {FEATURES.map((f) => (
          <View key={f.key} style={styles.gridItem}>
            <FeatureCardWithIcon
              title={f.title}
              icon={f.icon}
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
  appName: { fontSize: 28, fontWeight: "700", color: "#0066CC", textAlign: "center" },
  heroContainer: {
    marginHorizontal: 12,
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    height: 160,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 24,
  },
  gridItem: { width: "48%", flexGrow: 1 },
});

