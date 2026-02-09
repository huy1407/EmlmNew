import React from "react";
import { View, FlatList } from "react-native";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import type { RegulationDoc } from "../types";
import type { Route } from "../types";

const REGULATION_DISCLAIMER = "Nội dung không thay thế tư vấn pháp lý chính thức.";

interface RegulationListScreenProps {
  docs: RegulationDoc[];
  onNavigate: (route: Route) => void;
}

export default function RegulationListScreen({
  docs,
  onNavigate,
}: RegulationListScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <DisclaimerBanner text={REGULATION_DISCLAIMER} />
      <FlatList
        data={docs}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<SectionHeader title="Văn bản pháp luật (tham khảo)" />}
        renderItem={({ item }) => (
          <ListItemRow
            title={item.title}
            subtitle={item.summary}
            onPress={() =>
              onNavigate({ name: "regulation-detail", params: { id: item.id } })
            }
          />
        )}
      />
    </View>
  );
}
