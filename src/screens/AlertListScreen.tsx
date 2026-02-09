import React from "react";
import { View, FlatList } from "react-native";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import { formatDate } from "../utils";
import type { AlertPost } from "../types";
import type { Route } from "../types";

interface AlertListScreenProps {
  alerts: AlertPost[];
  onNavigate: (route: Route) => void;
}

export default function AlertListScreen({
  alerts,
  onNavigate,
}: AlertListScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <DisclaimerBanner />
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<SectionHeader title="Cảnh báo (cộng đồng)" />}
        renderItem={({ item }) => (
          <ListItemRow
            title={item.title}
            subtitle={formatDate(item.updatedAt)}
            onPress={() =>
              onNavigate({ name: "alert-detail", params: { id: item.id } })
            }
          />
        )}
      />
    </View>
  );
}
