import React, { useEffect } from "react";
import { View, Text, ScrollView, Pressable, Linking, StyleSheet, Alert } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { shareWithDisclaimer } from "../utils";
import type { RegulationDoc } from "../types";
import { theme } from "../styles/theme";

const REGULATION_DISCLAIMER = "Nội dung không thay thế tư vấn pháp lý chính thức.";

interface RegulationDetailScreenProps {
  doc: RegulationDoc | undefined;
  onBack: () => void;
  onViewDetail?: () => void;
}

export default function RegulationDetailScreen({
  doc,
  onBack,
  onViewDetail,
}: RegulationDetailScreenProps) {
  useEffect(() => {
    onViewDetail?.();
  }, [doc?.id, onViewDetail]);

  if (!doc) return null;

  const handleOpenSource = () => {
    if (doc.sourceUrl) {
      Alert.alert(
        "Mở liên kết bên ngoài",
        "Bạn sắp rời khỏi ứng dụng để xem tài liệu tham khảo. Thông tin chỉ mang tính tham khảo.",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Mở",
            onPress: () => Linking.openURL(doc.sourceUrl!),
          },
        ]
      );
    }
  };

  const handleShare = () => {
    shareWithDisclaimer(doc.title, doc.summary, doc.sourceUrl);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner text={REGULATION_DISCLAIMER} />
      <Text style={styles.title}>{doc.title}</Text>
      <Text style={styles.summary}>{doc.summary}</Text>

      {/* Full content displayed natively */}
      <Text style={styles.contentLabel}>Nội dung:</Text>
      <Text style={styles.contentText}>{doc.content}</Text>

      {/* Actions */}
      <View style={styles.actions}>
        {/*{doc.sourceUrl && (*/}
        {/*  <Pressable style={styles.btn} onPress={handleOpenSource}>*/}
        {/*    <Text style={styles.btnText}>Mở tài liệu tham khảo</Text>*/}
        {/*  </Pressable>*/}
        {/*)}*/}
        <Pressable style={styles.btn} onPress={handleShare}>
          <Text style={styles.btnText}>Chia sẻ</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
  },
  summary: {
    fontSize: 16,
    color: theme.colors.muted,
    lineHeight: 24,
    marginBottom: 16,
  },
  contentLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  btnText: { fontSize: 14, fontWeight: "600", color: "#fff" },
});
