import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  Share,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { theme } from "../styles/theme";
import { RISK_QUESTIONS, RISK_RESULT_DEFINITIONS, RiskLevelKey } from "../data/riskAssessment";

interface AnswerState {
  [id: string]: boolean | null;
}

interface RiskHistoryEntry {
  id: string;
  createdAt: string;
  score: number;
  total: number;
  level: RiskLevelKey;
}

const HISTORY_LIMIT = 20;

function getRiskLevel(score: number, total: number): RiskLevelKey {
  if (score <= Math.floor(total * 0.3)) return "low";
  if (score <= Math.floor(total * 0.65)) return "caution";
  return "high";
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function RiskAssessmentScreen() {
  const [answers, setAnswers] = useState<AnswerState>(() => {
    const initial: AnswerState = {};
    RISK_QUESTIONS.forEach((q) => {
      initial[q.id] = null;
    });
    return initial;
  });

  const [history, setHistory] = useState<RiskHistoryEntry[]>([]);
  const [lastResultId, setLastResultId] = useState<string | null>(null);

  const totalQuestions = RISK_QUESTIONS.length;

  const { score, levelKey, allAnswered } = useMemo(() => {
    const yesCount = RISK_QUESTIONS.reduce(
      (count, q) => (answers[q.id] === true ? count + 1 : count),
      0
    );
    const answeredCount = RISK_QUESTIONS.reduce(
      (count, q) => (answers[q.id] !== null ? count + 1 : count),
      0
    );
    const lvl = getRiskLevel(yesCount, totalQuestions);
    return {
      score: yesCount,
      levelKey: lvl,
      allAnswered: answeredCount === totalQuestions,
    };
  }, [answers, totalQuestions]);

  const levelDef = RISK_RESULT_DEFINITIONS.find((d) => d.key === levelKey)!;

  const handleSelect = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    const reset: AnswerState = {};
    RISK_QUESTIONS.forEach((q) => {
      reset[q.id] = null;
    });
    setAnswers(reset);
    setLastResultId(null);
  };

  const handleSaveResult = () => {
    const entry: RiskHistoryEntry = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      score,
      total: totalQuestions,
      level: levelKey,
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, HISTORY_LIMIT);
      return next;
    });
    setLastResultId(entry.id);
    Alert.alert("Đã lưu", "Kết quả tự đánh giá đã được lưu trong lịch sử trên thiết bị của bạn.");
  };

  const handleShare = async () => {
    try {
      const title = levelDef.title;
      const messageLines = [
        "Kết quả tự đánh giá dấu hiệu rủi ro MLM:",
        `- Điểm: ${score}/${totalQuestions}`,
        `- Mức đánh giá: ${title}`,
        "",
        "Ghi chú:",
        "• Đây chỉ là công cụ tham khảo, không phải kết luận chính thức.",
        "• Không thay thế tư vấn pháp lý, tài chính hoặc từ cơ quan có thẩm quyền.",
      ];

      await Share.share({
        title: "Kết quả tự đánh giá rủi ro MLM",
        message: messageLines.join("\n"),
      });
    } catch (error) {
      Alert.alert("Không thể chia sẻ", "Đã xảy ra lỗi khi chia sẻ kết quả. Vui lòng thử lại sau.");
    }
  };

  const canSave = allAnswered;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Tự đánh giá dấu hiệu rủi ro MLM</Text>
      <Text style={styles.subtitle}>
        Bộ câu hỏi đơn giản, ngoại tuyến, giúp bạn tự suy nghĩ về mô hình đang được giới thiệu.
        Không lưu trữ dữ liệu lên máy chủ, chỉ sử dụng cục bộ trên thiết bị.
      </Text>

      <DisclaimerBanner />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Câu hỏi (Có/Không)</Text>
        <Text style={styles.sectionHint}>
          Mỗi câu trả lời &quot;Có&quot; được tính 1 điểm. Hãy đánh dấu theo cảm nhận trung thực của bạn.
        </Text>

        <View style={styles.questionsList}>
          {RISK_QUESTIONS.map((q, index) => {
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
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              (!allAnswered || !canSave) && styles.primaryButtonDisabled,
              pressed && allAnswered && styles.primaryButtonPressed,
            ]}
            onPress={canSave ? handleSaveResult : undefined}
          >
            <Text style={styles.primaryButtonText}>
              {allAnswered ? "Lưu kết quả" : "Trả lời hết để lưu"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Kết quả hiện tại</Text>
        <Text style={styles.resultScore}>
          {score}/{totalQuestions} câu trả lời &quot;Có&quot;
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
          <Text style={styles.outlineButtonText}>Chia sẻ kết quả (kèm lưu ý)</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lịch sử trên thiết bị</Text>
        <Text style={styles.sectionHint}>
          Chỉ lưu cục bộ trên thiết bị của bạn. Bạn có thể xóa dữ liệu ứng dụng nếu không muốn lưu nữa.
        </Text>

        {history.length === 0 ? (
          <Text style={styles.emptyHistoryText}>
            Chưa có lần tự đánh giá nào được lưu. Hãy hoàn thành câu hỏi và nhấn &quot;Lưu kết quả&quot;.
          </Text>
        ) : (
          <View style={styles.historyList}>
            {history.map((item) => {
              const def = RISK_RESULT_DEFINITIONS.find((d) => d.key === item.level);
              return (
                <View
                  key={item.id}
                  style={[
                    styles.historyItem,
                    item.id === lastResultId && styles.historyItemHighlight,
                  ]}
                >
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyScore}>
                      {item.score}/{item.total} &quot;Có&quot;
                    </Text>
                    <Text style={styles.historyLevel}>
                      {def?.title ?? "Kết quả"}
                    </Text>
                  </View>
                  <Text style={styles.historyDate}>{formatDateTime(item.createdAt)}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32, gap: 16 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.muted,
    lineHeight: 18,
    marginBottom: 4,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 14,
    ...theme.shadow,
  },
  sectionTitle: {
    fontSize: 15,
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
    fontSize: 13,
    color: theme.colors.muted,
    marginTop: 2,
  },
  questionContent: {
    flex: 1,
  },
  questionText: {
    fontSize: 13,
    color: theme.colors.text,
    lineHeight: 18,
  },
  answerRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 6,
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
  answerButtonPressed: {
    opacity: 0.85,
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.text,
  },
  answerLabelSelectedYes: {
    color: "#166534",
  },
  answerLabelSelectedNo: {
    color: "#374151",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
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
  secondaryButtonPressed: {
    opacity: 0.8,
  },
  secondaryButtonText: {
    fontSize: 13,
    color: theme.colors.text,
  },
  primaryButton: {
    flex: 2,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  primaryButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  primaryButtonPressed: {
    opacity: 0.9,
  },
  primaryButtonText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
  },
  resultScore: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  resultLevel: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  resultSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: theme.colors.muted,
  },
  resultGuidance: {
    marginTop: 8,
    fontSize: 13,
    color: theme.colors.text,
    lineHeight: 18,
  },
  outlineButton: {
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },
  outlineButtonPressed: {
    opacity: 0.9,
  },
  outlineButtonText: {
    fontSize: 13,
    color: "#1D4ED8",
    fontWeight: "600",
  },
  historyList: {
    marginTop: 8,
    gap: 8,
  },
  historyItem: {
    padding: 10,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  historyItemHighlight: {
    borderColor: "#93C5FD",
    backgroundColor: "#EFF6FF",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  historyScore: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
  },
  historyLevel: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  historyDate: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  emptyHistoryText: {
    marginTop: 6,
    fontSize: 12,
    color: theme.colors.muted,
  },
});

