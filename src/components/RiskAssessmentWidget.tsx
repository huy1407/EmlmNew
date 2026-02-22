import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  Share,
} from "react-native";
import DisclaimerBanner from "./DisclaimerBanner";
import {
  RISK_QUESTIONS,
  RISK_RESULT_DEFINITIONS,
  RiskLevelKey,
} from "../data/riskAssessment";
import { theme } from "../styles/theme";

interface AnswerState {
  [id: string]: boolean | null;
}

interface RiskAssessmentWidgetProps {
  isExpanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
}

function getRiskLevel(score: number): RiskLevelKey {
  if (score <= 5) return "low";
  if (score <= 12) return "caution";
  return "high";
}

function buildInitialAnswers(): AnswerState {
  const initial: AnswerState = {};
  RISK_QUESTIONS.forEach((q) => {
    initial[q.id] = null;
  });
  return initial;
}

export default function RiskAssessmentWidget({
  isExpanded = false,
  onToggleExpand,
}: RiskAssessmentWidgetProps) {
  const [answers, setAnswers] = useState<AnswerState>(() => buildInitialAnswers());
  const totalQuestions = RISK_QUESTIONS.length;

  const { score, levelKey, answeredCount, allAnswered } = useMemo(() => {
    const yesCount = RISK_QUESTIONS.reduce(
      (count, q) => (answers[q.id] === true ? count + 1 : count),
      0
    );
    const aCount = RISK_QUESTIONS.reduce(
      (count, q) => (answers[q.id] !== null ? count + 1 : count),
      0
    );
    const lvl = getRiskLevel(yesCount);

    return {
      score: yesCount,
      levelKey: lvl,
      answeredCount: aCount,
      allAnswered: aCount === totalQuestions,
    };
  }, [answers, totalQuestions]);

  const levelDef =
    RISK_RESULT_DEFINITIONS.find((d) => d.key === levelKey) ??
    RISK_RESULT_DEFINITIONS[0];

  const handleSelect = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setAnswers(buildInitialAnswers());
  };

  const handleShare = async () => {
    try {
      const title = levelDef.title;
      const messageLines = [
        "Kết quả tự đánh giá dấu hiệu rủi ro MLM:",
        `- Điểm: ${score}/${totalQuestions}`,
        `- Mức đánh giá: ${title}`,
        allAnswered ? "" : "(Lưu ý: Kết quả này là tạm thời vì bạn chưa trả lời hết câu hỏi.)",
        "",
        "Ghi chú:",
        "• Đây chỉ là công cụ tham khảo, không phải kết luận chính thức.",
        "• Không thay thế tư vấn pháp lý, tài chính hoặc từ cơ quan có thẩm quyền.",
        "",
        "(eMLM) Ứng dụng cộng đồng. Thông tin chỉ mang tính tham khảo.",
      ];

      await Share.share({
        title: "Kết quả tự đánh giá rủi ro MLM",
        message: messageLines.filter(Boolean).join("\n"),
      });
    } catch {
      Alert.alert("Không thể chia sẻ", "Đã xảy ra lỗi khi chia sẻ kết quả. Vui lòng thử lại sau.");
    }
  };

  if (!isExpanded) {
    return (
      <Pressable
        style={styles.collapsedCard}
        onPress={() => onToggleExpand?.(true)}
      >
        <Text style={styles.collapsedTitle}>Tự đánh giá rủi ro MLM</Text>
        <View style={styles.collapsedRow}>
          <Text style={styles.collapsedScore}>
            {answeredCount}/{totalQuestions} câu
          </Text>
          <Text style={styles.collapsedResult}>
            Kết quả: <Text style={styles.collapsedResultValue}>{levelDef.title}</Text>
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.expandedContainer}>
      <View style={styles.expandedHeader}>
        <Text style={styles.expandedTitle}>Tự đánh giá dấu hiệu rủi ro MLM</Text>
        <Pressable onPress={() => onToggleExpand?.(false)}>
          <Text style={styles.closeButton}>Đóng</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.expandedContent}>
        <Text style={styles.subtitle}>
          Bộ câu hỏi đơn giản, ngoại tuyến, giúp bạn tự suy nghĩ về mô hình đang được giới thiệu.
        </Text>

        <DisclaimerBanner />

        <View style={styles.card}>
          <View style={styles.progressRow}>
            <Text style={styles.sectionTitle}>Câu hỏi (Có/Không)</Text>
            <Text style={styles.progressText}>
              Đã trả lời: {answeredCount}/{totalQuestions}
            </Text>
          </View>

          <Text style={styles.sectionHint}>
            Mỗi câu trả lời "Có" được tính 1 điểm. Hãy đánh dấu theo cảm nhận trung thực của bạn.
          </Text>

          <View style={styles.questionsList}>
            {RISK_QUESTIONS.slice(0, 5).map((q, index) => {
              const value = answers[q.id];
              return (
                <View key={q.id} style={styles.questionItem}>
                  <Text style={styles.questionIndex}>{index + 1}.</Text>
                  <View style={styles.questionContent}>
                    <Text style={styles.questionText}>{q.text}</Text>

                    <View style={styles.answerRow}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.answerButton,
                          value === true && styles.answerButtonSelectedYes,
                          pressed && styles.answerButtonPressed,
                        ]}
                        onPress={() => handleSelect(q.id, true)}
                      >
                        <Text
                          style={[
                            styles.answerLabel,
                            value === true && styles.answerLabelSelectedYes,
                          ]}
                        >
                          Có
                        </Text>
                      </Pressable>

                      <Pressable
                        style={({ pressed }) => [
                          styles.answerButton,
                          value === false && styles.answerButtonSelectedNo,
                          pressed && styles.answerButtonPressed,
                        ]}
                        onPress={() => handleSelect(q.id, false)}
                      >
                        <Text
                          style={[
                            styles.answerLabel,
                            value === false && styles.answerLabelSelectedNo,
                          ]}
                        >
                          Không
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
            {answeredCount > 5 && (
              <Text style={styles.moreQuestionsHint}>
                + {totalQuestions - 5} câu hỏi khác (xem toàn bộ để trả lời hết)
              </Text>
            )}
          </View>

          <View style={styles.actionsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
              onPress={handleReset}
            >
              <Text style={styles.secondaryButtonText}>Làm lại</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Kết quả hiện tại</Text>

          <Text style={styles.resultScore}>
            {score}/{totalQuestions} câu trả lời "Có"
          </Text>

          <Text style={styles.resultLevel}>{levelDef.title}</Text>
          <Text style={styles.resultSubtitle}>{levelDef.subtitle}</Text>
          <Text style={styles.resultGuidance}>{levelDef.guidance}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.outlineButton,
              pressed && styles.outlineButtonPressed,
            ]}
            onPress={handleShare}
          >
            <Text style={styles.outlineButtonText}>
              Chia sẻ kết quả (kèm lưu ý)
            </Text>
          </Pressable>
        </View>

        <View style={styles.hint}>
          <Text style={styles.hintText}>
            💡 Để xem đầy đủ 20 câu hỏi và lưu lịch sử kết quả, hãy mở tab "Tự đánh giá rủi ro" từ cài đặt.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  collapsedCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#FEF3C7",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#FCD34D",
  },
  collapsedTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#78350F",
    marginBottom: 8,
  },
  collapsedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collapsedScore: {
    fontSize: 13,
    color: "#92400E",
    fontWeight: "600",
  },
  collapsedResult: {
    fontSize: 13,
    color: "#92400E",
  },
  collapsedResultValue: {
    fontWeight: "700",
  },

  expandedContainer: {
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    maxHeight: 600,
  },
  expandedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FEF3C7",
    borderBottomWidth: 1,
    borderBottomColor: "#FCD34D",
  },
  expandedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#78350F",
  },
  closeButton: {
    fontSize: 13,
    fontWeight: "600",
    color: "#92400E",
  },

  expandedContent: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.muted,
    lineHeight: 18,
    marginBottom: 8,
  },

  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.muted,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 12,
    color: theme.colors.muted,
    marginBottom: 8,
  },

  questionsList: {
    marginTop: 4,
    gap: 8,
  },
  questionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  questionIndex: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 2,
    fontWeight: "600",
  },
  questionContent: { flex: 1 },
  questionText: {
    fontSize: 12,
    color: theme.colors.text,
    lineHeight: 16,
  },

  answerRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  answerButtonSelectedYes: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  answerButtonSelectedNo: {
    backgroundColor: "#F3F4F6",
    borderColor: "#9CA3AF",
  },
  answerButtonPressed: { opacity: 0.85 },

  answerLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.text,
  },
  answerLabelSelectedYes: { color: "#166534" },
  answerLabelSelectedNo: { color: "#374151" },

  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  secondaryButtonPressed: { opacity: 0.8 },
  secondaryButtonText: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: "600",
  },

  resultScore: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
  },
  resultLevel: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  resultSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: theme.colors.muted,
  },
  resultGuidance: {
    marginTop: 8,
    fontSize: 12,
    color: theme.colors.text,
    lineHeight: 16,
  },

  outlineButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },
  outlineButtonPressed: { opacity: 0.9 },
  outlineButtonText: {
    fontSize: 12,
    color: "#1D4ED8",
    fontWeight: "600",
  },

  moreQuestionsHint: {
    fontSize: 12,
    color: theme.colors.muted,
    fontStyle: "italic",
    marginTop: 4,
  },

  hint: {
    padding: 12,
    backgroundColor: "#FEF3C7",
    borderRadius: theme.radius.md,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 12,
    color: "#78350F",
    lineHeight: 16,
  },
});
