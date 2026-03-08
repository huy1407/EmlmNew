import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CompanyMLMItem from "../components/CompanyMLMItem";
import SkeletonLoader from "../components/SkeletonLoader";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import { fetchMLMCompanies } from "../api/client";
import type { CompanyMLM, Route } from "../types";
import { theme } from "../styles/theme";

interface CompanyMLMListScreenProps {
  onNavigate: (route: Route) => void;
}

export default function CompanyMLMListScreen({
  onNavigate,
}: CompanyMLMListScreenProps) {
  const [companies, setCompanies] = useState<CompanyMLM[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyMLM[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    filterCompanies(search);
  }, [companies, search]);

  const loadCompanies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMLMCompanies();
      console.log("[v0] Loaded companies:", data);
      
      // Data from API comes with fields: ten, sodangkydoanhnghiep, sodangkyhoatdong
      const parsed = Array.isArray(data)
        ? data.map((item, index) => ({
            id: item.id || `company-${index}`,
            ten: item.ten || "Unnamed",
            sodangkydoanhnghiep: item.sodangkydoanhnghiep,
            sodangkyhoatdong: item.sodangkyhoatdong,
          }))
        : [];
      
      setCompanies(parsed);
    } catch (err) {
      console.error("[v0] Error loading companies:", err);
      setError("Không thể tải danh sách doanh nghiệp");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadCompanies();
    setIsRefreshing(false);
  };

  const filterCompanies = (query: string) => {
    if (!query.trim()) {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(
        (company) =>
          company.ten.toLowerCase().includes(query.toLowerCase()) ||
          (company.sodangkydoanhnghiep &&
            company.sodangkydoanhnghiep.toLowerCase().includes(query.toLowerCase())) ||
          (company.sodangkyhoatdong &&
            company.sodangkyhoatdong.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredCompanies(filtered);
    }
  };

  const renderHeader = () => (
    <>
      <SectionHeader title="Doanh nghiệp bán hàng đa cấp" />
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color={theme.colors.muted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.search}
          placeholder="Tìm kiếm doanh nghiệp..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={theme.colors.muted}
        />
      </View>
    </>
  );

  // Loading state
  if (isLoading && companies.length === 0) {
    return (
      <View style={styles.container}>
        <DisclaimerBanner />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          {renderHeader()}
          <SkeletonLoader count={8} />
        </ScrollView>
      </View>
    );
  }

  // Error state
  if (error && companies.length === 0) {
    return (
      <View style={styles.container}>
        <DisclaimerBanner />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
          contentContainerStyle={styles.centerContent}
        >
          {renderHeader()}
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={48}
              color={theme.colors.muted}
              style={styles.errorIcon}
            />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DisclaimerBanner />
      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CompanyMLMItem
            item={item}
            onPress={() => {
              // Can be extended to navigate to detail screen
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={48}
              color={theme.colors.muted}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>
              {search.trim()
                ? "Không tìm thấy doanh nghiệp phù hợp"
                : "Không có doanh nghiệp nào"}
            </Text>
          </View>
        }
        ListFooterComponent={
          isLoading && companies.length > 0 ? (
            <View style={styles.footerLoadingContainer}>
              <ActivityIndicator
                size="small"
                color={theme.colors.primary}
              />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        contentContainerStyle={
          filteredCompanies.length === 0 ? styles.emptyListContainer : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  search: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 15,
    color: theme.colors.text,
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.muted,
    textAlign: "center",
  },
  errorContainer: {
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    marginBottom: 12,
    opacity: 0.6,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.muted,
    textAlign: "center",
  },
  footerLoadingContainer: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
