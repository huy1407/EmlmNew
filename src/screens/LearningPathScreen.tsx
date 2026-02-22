import React, { useState, useMemo } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { LEARNING_PATH } from "../data/learningPath";
import {
  KNOWLEDGE_ARTICLES,
  REGULATION_DOCS,
  QA_ITEMS,
  ALERT_POSTS,
  NEWS_ITEMS,
} from "../data";
import { theme } from "../styles/theme";
import type { Route, BookmarkType } from "../types";
import { useLearningProgress } from "../hooks/useLearningProgress";

interface LearningPathScreenProps {
  onNavigate: (route: Route) => void;
}

const TYPE_LABELS: Record<BookmarkType, string> = {
  knowledge: "Kiến thức",
  regulation: "Pháp luật",
  company: "Doanh nghiệp",
  qa: "Hỏi & đáp",
  alert: "Cảnh báo",
  news: "Tin tức",
};

function getLessonTitle(
  type: BookmarkType,
  id: string,
  titleOverride?: string
): string {
  if (titleOverride) return titleOverride;

  switch (type) {
    case "knowledge":
      return KNOWLEDGE_ARTICLES.find((a) => a.id === id)?.title || "Kiến thức";
    case "regulation":
      return REGULATION_DOCS.find((d) => d.id === id)?.title || "Pháp luật";
    case "qa":
      return QA_ITEMS.find((q) => q.id === id)?.question || "Hỏi & đáp";
    case "alert":
      return ALERT_POSTS.find((a) => a.id === id)?.title || "Cảnh báo";
    case "news":
      return NEWS_ITEMS.find((n) => n.id === id)?.title || "Tin tức";
    default:
      return "Bài học";
  }
}

function getRoute(
  type: BookmarkType,
  id: string
): Route {
  switch (type) {
    case "knowledge":
      return { name: "knowledge-detail", params: { id } };
    case "regulation":
      return { name: "regulation-detail", params: { id } };
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

export default function LearningPathScreen({ onNavigate }: LearningPathScreenProps) {
  const { progress, toggleLessonComplete, isLessonComplete, getProgressPercentage } =
    useLearningProgress();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const totalLessons = useMemo(() => {
    return LEARNING_PATH.reduce((sum, day) => sum + day.lessons.length, 0);
  }, []);

  const overallProgress = useMemo(() => {
    return getProgressPercentage(totalLessons);
  }, [getProgressPercentage, totalLessons]);

  const nextUncompletedLesson = useMemo(() => {
    for (const day of LEARNING_PATH) {
      for (const lesson of day.lessons) {
        const key = `${day.day}-${lesson.type}-${lesson.id}`;
        if (!isLessonComplete(key)) {
          return { day: day.day, lesson, key };
        }
      }
    }
    return null;
  }, [isLessonComplete]);

  const handleContinue = () => {
    if (nextUncompletedLesson) {
      onNavigate(getRoute(nextUncompletedLesson.lesson.type, nextUncompletedLesson.lesson.id));
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      "Đặt lại tiến độ?",
      "Bạn chắc chắn muốn xóa tất cả tiến độ học?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đặt lại",
          style: "destructive",
          onPress: () => {
            // Would need to add clearProgress to hook
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />

      <View style={styles.header}>
        <Text style={styles.title}>Lộ trình học 7 ngày</Text>
        <Text style={styles.subtitle}>Khám phá thông tin MLM qua từng bài học</Text>
      </View>

      {/* Overall Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Tiến độ tổng thể</Text>
          <Text style={styles.progressPercent}>{overallProgress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${overallProgress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {progress.completedLessons.length} / {totalLessons} bài hoàn thành
        </Text>
      </View>

      {/* Continue Button */}
      {nextUncompletedLesson && (
        <Pressable style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>
            Tiếp tục: Ngày {nextUncompletedLesson.day}
          </Text>
        </Pressable>
      )}

      {/* Days List */}
      <View style={styles.daysContainer}>
        {LEARNING_PATH.map((day) => {
          const dayLessons = day.lessons;
          const completedCount = dayLessons.filter((lesson) => {
            const key = `${day.day}-${lesson.type}-${lesson.id}`;
            return isLessonComplete(key);
          }).length;
          const isExpanded = expandedDay === day.day;

          return (
            <View key={`day-${day.day}`} style={styles.dayCard}>
              <Pressable
                style={styles.dayHeader}
                onPress={() => setExpandedDay(isExpanded ? null : day.day)}
              >
                <View>
                  <Text style={styles.dayTitle}>Ngày {day.day}</Text>
                  <Text style={styles.dayProgress}>
                    {completedCount}/{dayLessons.length} bài
                  </Text>
                </View>
                <View style={styles.dayProgressBar}>
                  <View
                    style={[
                      styles.dayProgressFill,
                      { width: `${(completedCount / dayLessons.length) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.expandIcon}>{isExpanded ? "▼" : "▶"}</Text>
              </Pressable>

              {isExpanded && (
                <View style={styles.lessonsContainer}>
                  {dayLessons.map((lesson) => {
                    const key = `${day.day}-${lesson.type}-${lesson.id}`;
                    const isCompleted = isLessonComplete(key);
                    const title = getLessonTitle(lesson.type, lesson.id, lesson.titleOverride);

                    return (
                      <Pressable
                        key={key}
                        style={styles.lessonRow}
                        onPress={() => {
                          if (!isCompleted) {
                            toggleLessonComplete(key);
                          }
                          onNavigate(getRoute(lesson.type, lesson.id));
                        }}
                      >
                        <Pressable
                          style={styles.checkbox}
                          onPress={() => toggleLessonComplete(key)}
                        >
                          <Text style={styles.checkboxText}>{isCompleted ? "✓" : ""}</Text>
                        </Pressable>
                        <View style={styles.lessonContent}>
                          <Text style={[styles.lessonTitle, isCompleted && styles.completed]}>
                            {title}
                          </Text>
                          <Text style={styles.lessonType}>{TYPE_LABELS[lesson.type]}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 24 },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#6B7280" },
  progressSection: { marginHorizontal: 16, marginBottom: 20, padding: 14, backgroundColor: "#F3F4F6", borderRadius: 12 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  progressLabel: { fontSize: 14, fontWeight: "600", color: "#374151" },
  progressPercent: { fontSize: 18, fontWeight: "700", color: theme.colors.primary },
  progressBar: { height: 8, backgroundColor: "#E5E7EB", borderRadius: 4, overflow: "hidden", marginBottom: 8 },
  progressFill: { height: "100%", backgroundColor: theme.colors.primary },
  progressText: { fontSize: 12, color: "#6B7280" },
  continueBtn: { marginHorizontal: 16, marginBottom: 16, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: theme.colors.primary, borderRadius: 10 },
  continueBtnText: { fontSize: 15, fontWeight: "700", color: "#fff", textAlign: "center" },
  daysContainer: { paddingHorizontal: 16, gap: 12 },
  dayCard: { backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB", overflow: "hidden" },
  dayHeader: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  dayTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  dayProgress: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  dayProgressBar: { flex: 1, height: 4, backgroundColor: "#E5E7EB", borderRadius: 2, overflow: "hidden" },
  dayProgressFill: { height: "100%", backgroundColor: theme.colors.primary },
  expandIcon: { fontSize: 12, color: "#9CA3AF", fontWeight: "600" },
  lessonsContainer: { borderTopWidth: 1, borderTopColor: "#E5E7EB" },
  lessonRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: theme.colors.primary, alignItems: "center", justifyContent: "center", marginRight: 12 },
  checkboxText: { fontSize: 14, fontWeight: "700", color: theme.colors.primary },
  lessonContent: { flex: 1 },
  lessonTitle: { fontSize: 14, fontWeight: "500", color: "#111827" },
  completed: { textDecorationLine: "line-through", color: "#9CA3AF" },
  lessonType: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
});
