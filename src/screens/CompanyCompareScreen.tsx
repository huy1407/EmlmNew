import React, { useMemo, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { COMPANIES } from "../data";
import { shareWithDisclaimer } from "../utils";
import { theme } from "../styles/theme";
import { useCompareHistory } from "../hooks/useCompareHistory";
import type { Route } from "../types";

interface CompanyCompareScreenProps {
  companyIds?: string[];
  onNavigate: (route: Route) => void;
}

const COMPARISON_FIELDS = [
  { key: "name", label: "Tên doanh nghiệp" },
  { key: "shortDesc", label: "Mô tả" },
  { key: "tags", label: "Lĩnh vực" },
  { key: "signals", label: "Tín hiệu cộng đồng" },
  { key: "website", label: "Website" },
];

export default function CompanyCompareScreen({
  companyIds = [],
  onNavigate,
}: CompanyCompareScreenProps) {
  const { addComparison } = useCompareHistory();

  const companies = useMemo(() => {
    return companyIds
      .map((id) => COMPANIES.find((c) => c.id === id))
      .filter((c) => c !== undefined) as typeof COMPANIES;
  }, [companyIds]);

  // Add to history on mount
  useEffect(() => {
    if (companies.length >= 2) {
      addComparison(companies.map((c) => c.id));
    }
  }, []);

  if (companies.length < 2) {
    return (
      <View style={styles.container}>
        <DisclaimerBanner />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Chọn ít nhất 2 doanh nghiệp để so sánh</Text>
          <Pressable
            style={styles.backBtn}
            onPress={() => onNavigate({ name: "company-list" })}
          >
            <Text style={styles.backBtnText}>Quay lại</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const handleShare = () => {
    const companyNames = companies.map((c) => c.name).join(", ");
    shareWithDisclaimer(
      `So sánh: ${companyNames}`,
      "Thông tin tham khảo từ ứng dụng eMLM",
      ""
    );
  };

  return (
    <View style={styles.container}>
      <DisclaimerBanner />

      <ScrollView horizontal={true} style={styles.tableScroll}>
        <View style={styles.table}>
          {/* Header row */}
          <View style={styles.headerRow}>
            <View style={styles.labelCell} />
            {companies.map((company) => (
              <View key={company.id} style={styles.headerCell}>
                <Text style={styles.headerText}>{company.name}</Text>
              </View>
            ))}
          </View>

          {/* Data rows */}
          {COMPARISON_FIELDS.map((field) => (
            <View key={field.key} style={styles.dataRow}>
              <View style={styles.labelCell}>
                <Text style={styles.labelText}>{field.label}</Text>
              </View>
              {companies.map((company) => {
                let value = "";
                switch (field.key) {
                  case "name":
                    value = company.name;
                    break;
                  case "shortDesc":
                    value = company.shortDesc;
                    break;
                  case "tags":
                    value = company.tags.join(", ");
                    break;
                  case "signals":
                    value = `Minh bạch: ${company.communitySignals.transparentCount}\nNghiên cứu: ${company.communitySignals.researchCount}`;
                    break;
                  case "website":
                    value = company.websiteUrl || "—";
                    break;
                }
                return (
                  <View key={company.id} style={styles.dataCell}>
                    <Text style={styles.dataText} numberOfLines={4}>
                      {value}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer buttons */}
      <View style={styles.footer}>
        <Pressable style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.shareBtnText}>Chia sẻ so sánh</Text>
        </Pressable>
        <Pressable
          style={styles.backBtn}
          onPress={() => onNavigate({ name: "company-list" })}
        >
          <Text style={styles.backBtnText}>Quay lại</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tableScroll: { flex: 1 },
  table: { backgroundColor: "#fff" },
  headerRow: { flexDirection: "row", borderBottomWidth: 2, borderBottomColor: theme.colors.primary },
  dataRow: { flexDirection: "row" },
  labelCell: {
    width: 130,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F9FAFB",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    justifyContent: "center",
  },
  labelText: { fontSize: 12, fontWeight: "700", color: "#374151" },
  headerCell: {
    minWidth: 140,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
    backgroundColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    textAlign: "center",
  },
  dataCell: {
    minWidth: 140,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  dataText: { fontSize: 12, color: "#4B5563", lineHeight: 16 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 },
  emptyText: { fontSize: 15, color: "#6B7280", marginBottom: 16, textAlign: "center" },
  footer: { paddingVertical: 12, paddingHorizontal: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#E5E7EB", gap: 8 },
  shareBtn: { paddingVertical: 12, backgroundColor: theme.colors.primary, borderRadius: 10 },
  shareBtnText: { fontSize: 15, fontWeight: "700", color: "#fff", textAlign: "center" },
  backBtn: { paddingVertical: 12, backgroundColor: "#F3F4F6", borderRadius: 10 },
  backBtnText: { fontSize: 15, fontWeight: "700", color: theme.colors.primary, textAlign: "center" },
});

