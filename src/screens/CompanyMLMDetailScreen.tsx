import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Share,
  Image,
    ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { getCompanyDetail } from "../api/client";
import type { CompanyMLM } from "../types";
import { theme } from "../styles/theme";

interface CompanyMLMDetailScreenProps {
  company: CompanyMLM | undefined;
  onBack?: () => void;
}

interface ExpandableSection {
  id: string;
  title: string;
  content?: string;
}

interface CompanyDetailData {
  [key: string]: any;
}

export default function CompanyMLMDetailScreen({
  company,
  onBack,
}: CompanyMLMDetailScreenProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [detailData, setDetailData] = useState<CompanyDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (company?.id) {
      loadCompanyDetail(company.id);
    }
  }, [company?.id]);

  const loadCompanyDetail = async (companyId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCompanyDetail(companyId);
      console.log("[v0] Company detail data:", data);
      setDetailData(data);
    } catch (err) {
      console.error("[v0] Error loading company detail:", err);
      setError("Không thể tải chi tiết doanh nghiệp");
    } finally {
      setIsLoading(false);
    }
  };

  const sections: ExpandableSection[] = [
    { id: "registration", title: "Hồ sơ chung" },
    { id: "updated", title: "Hồ sơ cập nhật" },
    { id: "locations", title: "Trụ sở chính/Chi nhánh/VP đại diện/Địa điểm kinh doanh" },
    { id: "representative", title: "Thông tin người đại diện" },
    { id: "owner", title: "Thông tin chủ sở hữu" },
    { id: "complaints", title: "Khiếu nại" },
    { id: "evaluation", title: "Đánh giá doanh nghiệp" },
  ];

  if (!company) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <DisclaimerBanner />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Không tìm thấy doanh nghiệp</Text>
        </View>
      </ScrollView>
    );
  }

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const getSectionContent = (sectionId: string): string => {
    if (!detailData) {
      return "Đang tải dữ liệu...";
    }

    switch (sectionId) {
      case "registration":
        return detailData.sHoSoChung || "Không có dữ liệu";
      case "updated":
        return detailData.sHoSoCapNhat || "Không có dữ liệu";
      case "locations":
        return detailData.sNoiKinhDoanh || "Không có dữ liệu";
      case "representative":
        return detailData.sThongTinNguoiDaiDien || "Không có dữ liệu";
      case "owner":
        return detailData.sThongTinChuSoHuu || "Không có dữ liệu";
      case "complaints":
        return detailData.sKhieuNai || "Không có dữ liệu";
      case "evaluation":
        return detailData.sDanhGia || "Không có dữ liệu";
      default:
        return "Không có dữ liệu";
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${company.ten}\n\nGCN đăng ký: ${company.sodangkydoanhnghiep || "N/A"}\nGCN hoạt động: ${company.sodangkyhoatdong || "N/A"}`,
        title: company.ten,
      });
    } catch (error) {
      console.error("[v0] Error sharing:", error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />

      {isLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {error && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Company Card */}
      <View style={styles.companyCard}>
        <View style={styles.cardHeader}>
          {/* Logo Placeholder */}
          <View style={styles.logoContainer}>
            <Image
                style={{
                  height: 60,
                  width: 80,
                  borderRadius: 5,
                  resizeMode: 'contain',
                }}
                source={{uri: `${detailData?.logo}`}}
                placeholderStyle={{backgroundColor: 'transparent'}}
            />
          </View>

          {/* Company Info */}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName} numberOfLines={2}>
              {detailData?.ten}
            </Text>

            {/* Address */}
            <View style={styles.addressRow}>
              <Ionicons
                name="location-outline"
                size={16}
                color={theme.colors.primary}
                style={styles.addressIcon}
              />
              <Text style={styles.addressText} numberOfLines={4}>
                {detailData?.diachi || "Thông tin địa chỉ sẽ được cập nhật"}
              </Text>
            </View>

            {/* Status Badge */}
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Đang hoạt động</Text>
            </View>
          </View>

          {/* Share Button */}
          {/*<Pressable*/}
          {/*  style={styles.shareButton}*/}
          {/*  onPress={handleShare}*/}
          {/*>*/}
          {/*  <Ionicons*/}
          {/*    name="share-social"*/}
          {/*    size={24}*/}
          {/*    color="#fff"*/}
          {/*  />*/}
          {/*</Pressable>*/}
        </View>
      </View>

      {/* Expandable Sections */}
      <View style={styles.sectionsContainer}>
        {sections.map((section) => (
          <View key={section.id}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Ionicons
                name={expandedSections.has(section.id) ? "chevron-down" : "chevron-forward"}
                size={24}
                color={theme.colors.muted}
              />
            </Pressable>

            {expandedSections.has(section.id) && (
              <View style={styles.sectionContent}>
                <Text style={styles.contentText}>
                  {getSectionContent(section.id)}
                </Text>
              </View>
            )}

            <View style={styles.divider} />
          </View>
        ))}
      </View>

      {/* Registration Info Summary */}
      <View style={styles.summarySection}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>GCN đăng ký doanh nghiệp:</Text>
          <Text style={styles.summaryValue}>
            {company.sodangkydoanhnghiep || "N/A"}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>GCN đăng ký hoạt động BHDC:</Text>
          <Text style={styles.summaryValue}>
            {company.sodangkyhoatdong || "N/A"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.muted,
    fontWeight: "500",
  },
  loadingIndicator: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  errorText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "500",
    flex: 1,
  },

  // Company Card
  companyCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    ...theme.shadow,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    gap: 12,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 22,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 6,
  },
  addressIcon: {
    marginTop: 2,
  },
  addressText: {
    fontSize: 13,
    color: theme.colors.muted,
    flex: 1,
    lineHeight: 18,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#22C55E",
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  // Sections
  sectionsContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    ...theme.shadow,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: "500",
    flex: 1,
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: theme.colors.card,
  },
  contentText: {
    fontSize: 13,
    color: theme.colors.muted,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },

  // Summary Section
  summarySection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    ...theme.shadow,
  },
  summaryItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: theme.colors.muted,
    fontWeight: "500",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: "600",
  },
});
