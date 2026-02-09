import React from "react";
import { View, FlatList } from "react-native";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import { formatDate } from "../utils";
import type { NewsItem } from "../types";
import type { Route } from "../types";

interface NewsListScreenProps {
  news: NewsItem[];
  onNavigate: (route: Route) => void;
}

export default function NewsListScreen({
  news,
  onNavigate,
}: NewsListScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <DisclaimerBanner />
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<SectionHeader title="Tin tức" />}
        renderItem={({ item }) => (
          <ListItemRow
            title={item.title}
            subtitle={formatDate(item.publishedAt)}
            onPress={() =>
              onNavigate({ name: "news-detail", params: { id: item.id } })
            }
          />
        )}
      />
    </View>
  );
}
