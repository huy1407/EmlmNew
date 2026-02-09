import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface Tab {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onSelect: (key: string) => void;
}

export default function TabBar({ tabs, active, onSelect }: TabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          style={[styles.tab, active === tab.key && styles.tabActive]}
          onPress={() => onSelect(tab.key)}
        >
          <Text
            style={[styles.tabText, active === tab.key && styles.tabTextActive]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabActive: {
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 13,
    color: theme.colors.muted,
  },
  tabTextActive: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
