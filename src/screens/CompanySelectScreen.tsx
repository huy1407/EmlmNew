import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { COMPANIES } from "../data";
import { theme } from "../styles/theme";
import type { Company, Route } from "../types";

interface CompanySelectScreenProps {
  onNavigate: (route: Route) => void;
  onCompare: (companyIds: string[]) => void;
}

export default function CompanySelectScreen({
  onNavigate,
  onCompare,
}: CompanySelectScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return COMPANIES;
    const q = searchQuery.toLowerCase();
    return COMPANIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortDesc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleCompany = (companyId: string) => {
    setSelected((prev) => {
      if (prev.includes(companyId)) {
        return prev.filter((id) => id !== companyId);
      }
      if (prev.length < 3) {
        return [...prev, companyId];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selected.length >= 2) {
      onCompare(selected);
      onNavigate({ name: "company-compare", params: { companyIds: selected } });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <DisclaimerBanner />

        <View style={styles.header}>
          <Text style={styles.title}>So sánh doanh nghiệp</Text>
          <Text style={styles.subtitle}>Chọn 2-3 doanh nghiệp để so sánh</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tên doanh nghiệp..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Selected Count */}
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            Đã chọn: {selected.length}/3
          </Text>
        </View>

        {/* Company List */}
        <FlatList
          data={filtered}
          keyExtractor={(c) => c.id}
          scrollEnabled={false}
          renderItem={({ item: company }) => (
            <Pressable
              style={styles.companyItem}
              onPress={() => toggleCompany(company.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  selected.includes(company.id) && styles.checkboxChecked,
                ]}
              >
                {selected.includes(company.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <View style={styles.companyContent}>
                <Text style={styles.companyName}>{company.name}</Text>
                <Text style={styles.companyDesc} numberOfLines={2}>
                  {company.shortDesc}
                </Text>
                {company.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {company.tags.map((tag, idx) => (
                      <View key={idx} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </Pressable>
          )}
        />
      </ScrollView>

      {/* Compare Button */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.compareBtn, selected.length < 2 && styles.compareBtnDisabled]}
          onPress={handleCompare}
          disabled={selected.length < 2}
        >
          <Text
            style={[styles.compareBtnText, selected.length < 2 && styles.compareBtnTextDisabled]}
          >
            So sánh ({selected.length})
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 80 },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 20, fontWeight: "700", color: "#111827", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#6B7280" },
  searchContainer: { paddingHorizontal: 16, marginBottom: 12 },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#111827",
  },
  countBadge: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
  },
  countText: { fontSize: 12, fontWeight: "600", color: theme.colors.primary },
  companyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkmark: { fontSize: 12, color: "#fff", fontWeight: "700" },
  companyContent: { flex: 1 },
  companyName: { fontSize: 15, fontWeight: "600", color: "#111827", marginBottom: 4 },
  companyDesc: { fontSize: 13, color: "#6B7280", lineHeight: 18, marginBottom: 6 },
  tagsContainer: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  tag: { paddingVertical: 3, paddingHorizontal: 8, backgroundColor: "#F3F4F6", borderRadius: 6 },
  tagText: { fontSize: 11, color: "#4B5563", fontWeight: "500" },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#E5E7EB" },
  compareBtn: { paddingVertical: 12, backgroundColor: theme.colors.primary, borderRadius: 10 },
  compareBtnDisabled: { opacity: 0.5 },
  compareBtnText: { fontSize: 16, fontWeight: "700", color: "#fff", textAlign: "center" },
  compareBtnTextDisabled: { color: "#D1D5DB" },
});
