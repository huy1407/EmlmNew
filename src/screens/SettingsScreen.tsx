import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import ListItemRow from "../components/ListItemRow";
import type { Route } from "../types";

interface SettingsScreenProps {
  onNavigate: (route: Route) => void;
}

const MENU_ITEMS: { key: Route["name"]; title: string }[] = [
  { key: "risk-assessment", title: "MLM Risk Self-Assessment" },
  { key: "privacy", title: "Privacy Policy" },
  { key: "terms", title: "Terms of Use" },
  { key: "guidelines", title: "Community Guidelines" },
  { key: "about", title: "About App" },
];

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      {MENU_ITEMS.map((item) => (
        <ListItemRow
          key={item.key}
          title={item.title}
          onPress={() => onNavigate({ name: item.key })}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
});
