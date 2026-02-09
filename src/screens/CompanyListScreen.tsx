import React, { useState, useMemo } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import ListItemRow from "../components/ListItemRow";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SectionHeader from "../components/SectionHeader";
import type { Company } from "../types";
import type { Route } from "../types";
import { theme } from "../styles/theme";

interface CompanyListScreenProps {
  companies: Company[];
  onNavigate: (route: Route) => void;
}

export default function CompanyListScreen({
  companies,
  onNavigate,
}: CompanyListScreenProps) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      search.trim()
        ? companies.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
          )
        : companies,
    [companies, search]
  );

  return (
    <View style={styles.container}>
      <DisclaimerBanner />
      <TextInput
        style={styles.search}
        placeholder="Tìm doanh nghiệp..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={theme.colors.muted}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<SectionHeader title="Doanh nghiệp" />}
        renderItem={({ item }) => (
          <ListItemRow
            title={item.name}
            subtitle={`${item.shortDesc} • ${item.tags.join(", ")}`}
            onPress={() =>
              onNavigate({ name: "company-detail", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <ListItemRow title="Không tìm thấy doanh nghiệp" onPress={() => {}} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    fontSize: 15,
    color: theme.colors.text,
  },
  empty: { padding: 16 },
});
