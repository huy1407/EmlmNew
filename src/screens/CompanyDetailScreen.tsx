import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  StyleSheet,
  Alert,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { computePct } from "../utils";
import type { Company } from "../types";
import { theme } from "../styles/theme";

interface CompanyDetailScreenProps {
  company: Company | undefined;
  getSignals: (c: Company) => { transparentCount: number; researchCount: number };
  onVoteTransparent: (id: string) => void;
  onVoteResearch: (id: string) => void;
  onBack: () => void;
  onViewDetail?: () => void;
}

export default function CompanyDetailScreen({
  company,
  getSignals,
  onVoteTransparent,
  onVoteResearch,
  onViewDetail,
}: CompanyDetailScreenProps) {
  useEffect(() => {
    onViewDetail?.();
  }, [company?.id, onViewDetail]);

  if (!company) return null;

  const signals = getSignals(company);
  const { aPct: transparentPct, bPct: researchPct } = computePct(
    signals.transparentCount,
    signals.researchCount
  );

  const handleOpenWebsite = () => {
    if (company.websiteUrl) {
      Alert.alert(
        "Mở liên kết bên ngoài",
        "Bạn sắp rời khỏi ứng dụng. Thông tin chỉ mang tính tham khảo.",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Mở",
            onPress: () => Linking.openURL(company.websiteUrl!),
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />

      {/* Header */}
      <Text style={styles.title}>{company.name}</Text>
      <Text style={styles.desc}>{company.shortDesc}</Text>

      {/* License Status Badge */}
      {company.licenseStatus && (
        <View style={[styles.badge, company.licenseStatus === "licensed" ? styles.licensedBadge : styles.unknownBadge]}>
          <Text style={styles.badgeText}>
            {company.licenseStatus === "licensed" ? "✓ Có giấy phép" : "? Tình trạng chưa rõ"}
          </Text>
        </View>
      )}

      {/* Company Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin công ty</Text>
        <View style={styles.infoGrid}>
          {company.foundedYear && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Thành lập</Text>
              <Text style={styles.infoValue}>{company.foundedYear}</Text>
            </View>
          )}
          {company.headquarters && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Trụ sở chính</Text>
              <Text style={styles.infoValue}>{company.headquarters}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Full Description */}
      {company.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giới thiệu chi tiết</Text>
          <Text style={styles.descriptionText}>{company.description}</Text>
        </View>
      )}

      {/* Product Categories */}
      {company.productCategories && company.productCategories.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nhóm sản phẩm</Text>
          <View style={styles.categoryList}>
            {company.productCategories.map((cat, idx) => (
              <View key={idx} style={styles.categoryItem}>
                <Text style={styles.categoryDot}>•</Text>
                <Text style={styles.categoryText}>{cat}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Tags */}
      {company.tags.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phân loại</Text>
          <View style={styles.tags}>
            {company.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Website Link */}
      {/*{company.websiteUrl && (*/}
      {/*  <Pressable style={styles.linkBtn} onPress={handleOpenWebsite}>*/}
      {/*    <Text style={styles.linkText}>Mở website tham khảo</Text>*/}
      {/*  </Pressable>*/}
      {/*)}*/}

      {/* Community Signals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tín hiệu cộng đồng</Text>
        <Text style={styles.signalsDesc}>Phản hồi từ cộng đồng người sử dụng</Text>
        <View style={styles.buttons}>
          <Pressable
            style={styles.signalBtn}
            onPress={() => onVoteTransparent(company.id)}
          >
            <Text style={styles.signalBtnText}>👍 Minh bạch</Text>
            <Text style={styles.signalPct}>{transparentPct}%</Text>
          </Pressable>
          <Pressable
            style={styles.signalBtn}
            onPress={() => onVoteResearch(company.id)}
          >
            <Text style={styles.signalBtnText}>⚠️ Cần tìm hiểu</Text>
            <Text style={styles.signalPct}>{researchPct}%</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: theme.colors.muted,
    lineHeight: 22,
    marginBottom: 12,
  },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  licensedBadge: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
  },
  unknownBadge: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
  },
  signalsDesc: {
    fontSize: 13,
    color: theme.colors.muted,
    marginBottom: 12,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoLabel: {
    fontSize: 12,
    color: theme.colors.muted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  descriptionText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 22,
    backgroundColor: theme.colors.card,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryList: {
    gap: 8,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6,
  },
  categoryDot: {
    fontSize: 16,
    color: theme.colors.primary,
    marginRight: 10,
    marginTop: -2,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.text,
    flex: 1,
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: theme.colors.border,
  },
  tagText: { fontSize: 13, color: theme.colors.muted, fontWeight: "500" },
  linkBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  linkText: { fontSize: 15, fontWeight: "600", color: "#fff" },
  buttons: { flexDirection: "row", gap: 12 },
  signalBtn: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  signalBtnText: { fontSize: 14, fontWeight: "600", color: theme.colors.text },
  signalPct: { fontSize: 20, fontWeight: "700", color: theme.colors.primary, marginTop: 8 },
});
