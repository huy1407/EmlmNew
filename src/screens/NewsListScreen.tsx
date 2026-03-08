import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import { formatDate } from "../utils";
import { fetchNews } from "../api/client";
import type { NewsItem } from "../types";
import type { Route } from "../types";
import { theme } from "../styles/theme";

interface NewsListScreenProps {
  news: NewsItem[];
  onNavigate: (route: Route) => void;
}

export default function NewsListScreen({
  news: staticNews,
  onNavigate,
}: NewsListScreenProps) {
  const [news, setNews] = useState<NewsItem[]>(staticNews);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(staticNews);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch news from API on mount
  useEffect(() => {
    loadNews();
  }, []);

  // Filter news when search text changes
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredNews(news);
    } else {
      const searchLower = searchText.toLowerCase();
      const filtered = news.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.summary.toLowerCase().includes(searchLower)
      );
      setFilteredNews(filtered);
    }
  }, [searchText, news]);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const fetchedNews = await fetchNews();
      if (fetchedNews && fetchedNews.length > 0) {
        // Merge fetched news with static news, prioritizing fetched data
        const mergedNews = [...fetchedNews, ...staticNews];
        // Remove duplicates based on title
        const uniqueNews = Array.from(
          new Map(mergedNews.map((item) => [item.title, item])).values()
        );
        setNews(uniqueNews);
        setFilteredNews(uniqueNews);
      } else {
        // Fall back to static news if API fails
        setNews(staticNews);
        setFilteredNews(staticNews);
      }
    } catch (error) {
      console.error("Error loading news:", error);
      // Use static news as fallback
      setNews(staticNews);
      setFilteredNews(staticNews);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadNews();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSearchToggle = () => {
    if (isSearching) {
      setSearchText("");
    }
    setIsSearching(!isSearching);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {isSearching ? (
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm tin tức..."
            placeholderTextColor={theme.colors.muted}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          <TouchableOpacity
            onPress={handleSearchToggle}
            style={styles.closeSearchBtn}
          >
            <View style={styles.closeSearchIcon}>✕</View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerTitleContainer}>
          <SectionHeader title="Tin tức" />
          <TouchableOpacity
            onPress={handleSearchToggle}
            style={styles.searchBtn}
          >
            <View style={styles.searchIcon}>🔍</View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyText}>Không tìm thấy tin tức</View>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        animating={isLoading}
      />
    </View>
  );

  if (isLoading && news.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <DisclaimerBanner />
        {renderLoadingState()}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <DisclaimerBanner />
      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <ListItemRow
            title={item.title}
            subtitle={formatDate(item.publishedAt)}
            onPress={() =>
              onNavigate({ name: "news-detail", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        contentContainerStyle={
          filteredNews.length === 0 ? styles.emptyListContainer : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.text,
  },
  searchBtn: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 18,
  },
  closeSearchBtn: {
    padding: 8,
  },
  closeSearchIcon: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.muted,
    fontWeight: "500",
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
