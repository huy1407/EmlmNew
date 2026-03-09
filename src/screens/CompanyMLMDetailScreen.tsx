import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Share,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { getCompanyDetail, getCompanyHoSo, getCompanyAgency, getCompanyOwner } from "../api/client";
import type { CompanyMLM } from "../types";
import { theme } from "../styles/theme";

interface CompanyMLMDetailScreenProps {
  company: CompanyMLM | undefined;
  onBack?: () => void;
}

interface CompanyDetailData {
  [key: string]: any;
}

export default function CompanyMLMDetailScreen({
  company,
  onBack,
}: CompanyMLMDetailScreenProps) {
  const [detailData, setDetailData] = useState<CompanyDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoSoData, setHoSoData] = useState<any[]>([]);
  const [hoSoLoading, setHoSoLoading] = useState(false);
  const [agencyData, setAgencyData] = useState<any[]>([]);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [ownerData, setOwnerData] = useState<any[]>([]);
  const [ownerLoading, setOwnerLoading] = useState(false);

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

  const loadCompanyHoSo = async (companyId: string) => {
    try {
      setHoSoLoading(true);
      const data = await getCompanyHoSo(companyId);
      console.log("[v0] Company HoSo data:", data);
      setHoSoData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[v0] Error loading company HoSo:", err);
      setHoSoData([]);
    } finally {
      setHoSoLoading(false);
    }
  };

  const loadCompanyAgency = async (companyId: string) => {
    try {
      setAgencyLoading(true);
      const data = await getCompanyAgency(companyId);
      console.log("[v0] Company Agency data:", data);
      setAgencyData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[v0] Error loading company Agency:", err);
      setAgencyData([]);
    } finally {
      setAgencyLoading(false);
    }
  };

  const loadCompanyOwner = async (companyId: string) => {
    try {
      setOwnerLoading(true);
      const data = await getCompanyOwner(companyId);
      console.log("[v0] Company Owner data:", data);
      setOwnerData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[v0] Error loading company Owner:", err);
      setOwnerData([]);
    } finally {
      setOwnerLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${company?.ten}\n\nGCN đăng ký: ${company?.sodangkydoanhnghiep || "N/A"}\nGCN hoạt động: ${company?.sodangkyhoatdong || "N/A"}`,
        title: company?.ten,
      });
    } catch (error) {
      console.error("[v0] Error sharing:", error);
    }
  };

  const sections = [
    { id: "hoSoChung", title: "Hồ sơ chung" },
    { id: "hoSoCapNhat", title: "Hồ sơ cập nhật" },
    { id: "truSoChiNhanh", title: "Trụ sở chính/Chi nhánh/VP đại diện/Địa điểm kinh doanh" },
    { id: "nguoiDaiDien", title: "Thông tin người đại diện" },
    { id: "chuSoHuu", title: "Thông tin chủ sở hữu" },
    { id: "khieuNai", title: "Khiếu nại" },
    { id: "danhGia", title: "Đánh giá doanh nghiệp" },
  ];

  const renderCommonProfileContent = () => {
    return (
      <>
        {/* Contact Information */}
        <View style={styles.infoGroup}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Tỉnh thành</Text>
              <Text style={styles.infoValue}>{detailData?.tinhthanh || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Điện thoại</Text>
              <Text style={styles.infoValue}>{detailData?.dienthoai || "N/A"}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Hotline</Text>
              <Text style={styles.infoValue}>{detailData?.hotline || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>{detailData?.website || "N/A"}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{detailData?.email || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Business Registration Section */}
        <View style={[styles.infoGroup, { marginTop: 16 }]}>
          <Text style={styles.sectionSubtitle}>GCN đăng ký doanh nghiệp/đầu tư</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Số đăng ký</Text>
              <Text style={styles.infoValue}>{detailData?.sodangkydoanhnghiep || company.sodangkydoanhnghiep || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Ngày cấp</Text>
              <Text style={styles.infoValue}>{detailData?.ngaycap1 || "N/A"}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Ngày sửa đổi</Text>
              <Text style={styles.infoValue}>{detailData?.ngaysuadoi1 || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Activity Certificate Section */}
        <View style={[styles.infoGroup, { marginTop: 16 }]}>
          <Text style={styles.sectionSubtitle}>GCN đăng ký hoạt động BHĐC</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Số đăng ký</Text>
              <Text style={styles.infoValue}>{detailData?.sodangkyhoatdong || company.sodangkyhoatdong || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Ngày cấp</Text>
              <Text style={styles.infoValue}>{detailData?.ngaycap2 || "N/A"}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Ngày sửa đổi bổ sung</Text>
              <Text style={styles.infoValue}>{detailData?.ngaysuadoi2 || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Ngày gia hạn</Text>
              <Text style={styles.infoValue}>{detailData?.ngaygiahan || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Representative Section */}
        <View style={[styles.infoGroup, { marginTop: 16 }]}>
          <Text style={styles.sectionSubtitle}>Người đại diện theo pháp luật</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Họ tên</Text>
              <Text style={styles.infoValue}>{detailData?.daidien || "N/A"}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>CMND/Hộ chiếu/MSDN</Text>
              <Text style={styles.infoValue}>{detailData?.cmnd || "N/A"}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Chức vụ</Text>
              <Text style={styles.infoValue}>{detailData?.chucvu || "N/A"}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderProfileUpdateContent = () => {
    if (hoSoLoading) {
      return (
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (!hoSoData || hoSoData.length === 0) {
      return (
        <Text style={styles.placeholderText}>
          Không có thông tin hồ sơ cập nhật
        </Text>
      );
    }

    return (
      <View>
      </View>
    );
  };

  const renderAgencyContent = () => {
    if (agencyLoading) {
      return (
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (!agencyData || agencyData.length === 0) {
      return (
        <Text style={styles.placeholderText}>
          Không có thông tin trụ sở/chi nhánh
        </Text>
      );
    }

    return (
      <View>
        {agencyData.map((item, index) => (
          <View key={`agency-${index}`} style={styles.agencyItem}>
            {/* Agency Name Header */}
            <Text style={styles.agencyCategoryName}>{item.ten || item.name || "Chi nhánh/Trụ sở"}</Text>

            {/* Province and Status */}
            <View style={styles.agencyRow}>
              <View style={styles.agencyColumn}>
                <Text style={styles.agencyLabel}>Tỉnh thành</Text>
                <Text style={styles.agencyValue}>{item.tinhthanh_name || item.province || "N/A"}</Text>
              </View>
              <View style={styles.agencyColumn}>
                <Text style={styles.agencyLabel}>Tình trạng</Text>
                <Text style={styles.agencyValue}>{item.option || item.status || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.agencyDivider} />

            {/* Address and Phone */}
            <View style={styles.agencyRow}>
              <View style={styles.agencyColumn}>
                <Text style={styles.agencyLabel}>Địa chỉ</Text>
                <Text style={styles.agencyValue}>{item.diachi || item.address || "N/A"}</Text>
              </View>
              <View style={styles.agencyColumn}>
                <Text style={styles.agencyLabel}>Điện thoại</Text>
                <Text style={styles.agencyValue}>{item.dienthoai || item.phone || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.agencyDivider} />

            {/* Email and Fax */}
            <View style={styles.agencyRow}>
              <View style={styles.agencyColumn}>
                <Text style={styles.agencyLabel}>Email</Text>
                <Text style={styles.agencyValue}>{item.email || "N/A"}</Text>
              </View>
              <View style={styles.agencyColumn}>
                <Text style={styles.agencyLabel}>Fax</Text>
                <Text style={styles.agencyValue}>{item.fax || "N/A"}</Text>
              </View>
            </View>

            {index < agencyData.length - 1 && <View style={styles.itemSeparator} />}
          </View>
        ))}
      </View>
    );
  };

  const renderOwnerContent = () => {
    if (ownerLoading) {
      return (
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (!ownerData || ownerData.length === 0) {
      return (
        <Text style={styles.placeholderText}>
          Không có thông tin chủ sở hữu
        </Text>
      );
    }

    return (
      <View>
        {ownerData.map((item, index) => (
          <View key={`owner-${index}`} style={styles.ownerItem}>
            {/* Owner Type Header */}
            <Text style={styles.ownerCategoryName}>{item.loai || item.type || "Loại chủ sở hữu"}</Text>

            {/* Name and Birth Date */}
            <View style={styles.ownerRow}>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>Tên</Text>
                <Text style={styles.ownerValue}>{item.ten || item.name || "N/A"}</Text>
              </View>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>Ngày sinh</Text>
                <Text style={styles.ownerValue}>{item.ngaysinh || item.dateOfBirth || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.ownerDivider} />

            {/* ID and Issue Date */}
            <View style={styles.ownerRow}>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>CMND</Text>
                <Text style={styles.ownerValue}>{item.cmnd || item.id || "N/A"}</Text>
              </View>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>Ngày cấp</Text>
                <Text style={styles.ownerValue}>{item.ngaycap || item.issueDate || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.ownerDivider} />

            {/* Business Registration and Modification Date */}
            <View style={styles.ownerRow}>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>Số đăng ký doanh nghiệp</Text>
                <Text style={styles.ownerValue}>{item.sodangkydoanhnghiep || item.businessRegNumber || "N/A"}</Text>
              </View>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>Ngày sửa đổi</Text>
                <Text style={styles.ownerValue}>{item.ngaysuadoi1 || item.modificationDate || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.ownerDivider} />

            {/* Issue Date and Status */}
            <View style={styles.ownerRow}>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>Ngày cấp</Text>
                <Text style={styles.ownerValue}>{item.ngaycap1 || item.issueDateBusiness || "N/A"}</Text>
              </View>
              <View style={styles.ownerColumn}>
                <Text style={styles.ownerLabel}>Tình trạng</Text>
                <Text style={styles.ownerValue}>{item.option || item.status || "N/A"}</Text>
              </View>
            </View>

            {index < ownerData.length - 1 && <View style={styles.itemSeparator} />}
          </View>
        ))}
      </View>
    );
  };

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
          {/* Logo */}
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
              {detailData?.ten || company.ten}
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
                {detailData?.diachi || company.diachi || "Thông tin địa chỉ sẽ được cập nhật"}
              </Text>
            </View>

            {/* Status Badge */}
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Đang hoạt động</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Expandable Sections */}
      <View style={styles.sectionsContainer}>
        {sections.map((section) => (
          <View key={section.id} style={styles.sectionWrapper}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => {
                const newSection = expandedSection === section.id ? null : section.id;
                setExpandedSection(newSection);
                
                // Load HoSo data when expanding that section
                if (newSection === "hoSoCapNhat" && company?.id && hoSoData.length === 0) {
                  loadCompanyHoSo(company.id);
                }
                
                // Load Agency data when expanding that section
                if (newSection === "truSoChiNhanh" && company?.id && agencyData.length === 0) {
                  loadCompanyAgency(company.id);
                }

                // Load Owner data when expanding that section
                if (newSection === "chuSoHuu" && company?.id && ownerData.length === 0) {
                  loadCompanyOwner(company.id);
                }
              }}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Ionicons
                name={
                  expandedSection === section.id
                    ? "chevron-down"
                    : "chevron-forward"
                }
                size={24}
                color={theme.colors.muted}
              />
            </Pressable>

            {expandedSection === section.id && section.id === "hoSoChung" && (
              <View style={styles.sectionContent}>
                {renderCommonProfileContent()}
              </View>
            )}

            {expandedSection === section.id && section.id === "hoSoCapNhat" && (
              <View style={styles.sectionContent}>
                {renderProfileUpdateContent()}
              </View>
            )}

            {expandedSection === section.id && section.id === "truSoChiNhanh" && (
              <View style={styles.sectionContent}>
                {renderAgencyContent()}
              </View>
            )}

            {expandedSection === section.id && section.id === "chuSoHuu" && (
              <View style={styles.sectionContent}>
                {renderOwnerContent()}
              </View>
            )}

            {expandedSection === section.id && section.id !== "hoSoChung" && section.id !== "hoSoCapNhat" && section.id !== "truSoChiNhanh" && section.id !== "chuSoHuu" && (
              <View style={styles.sectionContent}>
                <Text style={styles.placeholderText}>
                  Thông tin sẽ được cập nhật
                </Text>
              </View>
            )}
          </View>
        ))}
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

  // Divider
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
  },

  // Profile Section Styles
  profileSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    padding: 16,
    ...theme.shadow,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 12,
  },
  infoGroup: {
    gap: 0,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 20,
  },

  // Sections Container
  sectionsContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  sectionWrapper: {
    backgroundColor: "#fff",
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    ...theme.shadow,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
    flex: 1,
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
  },
  placeholderText: {
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: "center",
    paddingVertical: 12,
  },

  // HoSo Profile Update Styles
  loadingContent: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  hoSoItem: {
    paddingVertical: 12,
    backgroundColor: "#fafafa",
  },
  hoSoCategoryName: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.primary,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  hoSoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  hoSoColumn: {
    flex: 1,
  },
  hoSoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: 4,
  },
  hoSoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 20,
  },
  hoSoDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
  },

  // Agency/Branch Styles
  agencyItem: {
    paddingVertical: 12,
    backgroundColor: "#fafafa",
  },
  agencyCategoryName: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  agencyRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  agencyColumn: {
    flex: 1,
  },
  agencyLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: 4,
  },
  agencyValue: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 20,
  },
  agencyDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
    marginHorizontal: 4,
  },

  // Owner Information Styles
  ownerItem: {
    paddingVertical: 12,
    backgroundColor: "#fafafa",
  },
  ownerCategoryName: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  ownerRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  ownerColumn: {
    flex: 1,
  },
  ownerLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: 4,
  },
  ownerValue: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 20,
  },
  ownerDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
    marginHorizontal: 4,
  },
});
