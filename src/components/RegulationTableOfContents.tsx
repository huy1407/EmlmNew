import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import type { RegulationSection } from "../types";
import { theme } from "../styles/theme";

interface RegulationTableOfContentsProps {
  sections: RegulationSection[];
  currentSectionIndex: number;
  onSelectSection: (index: number) => void;
}

export default function RegulationTableOfContents({
  sections,
  currentSectionIndex,
  onSelectSection,
}: RegulationTableOfContentsProps) {
  const windowWidth = Dimensions.get("window").width;
  const maxWidth = Math.min(windowWidth * 0.7, 300);

  return (
    <View
      style={[
        styles.container,
        { maxWidth },
      ]}
    >
      <Text style={styles.header}>Mục lục</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {sections.map((section, index) => (
          <Pressable
            key={section.sectionIndex}
            style={[
              styles.tocItem,
              currentSectionIndex === index && styles.tocItemActive,
            ]}
            onPress={() => onSelectSection(index)}
          >
            <Text
              style={[
                styles.tocItemText,
                currentSectionIndex === index && styles.tocItemTextActive,
              ]}
              numberOfLines={2}
            >
              {section.title}
            </Text>
            {currentSectionIndex === index && (
              <View style={styles.indicator} />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    maxHeight: "100%",
  },
  header: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  scrollView: {
    flex: 1,
  },
  tocItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  tocItemActive: {
    backgroundColor: theme.colors.primaryLight,
  },
  tocItemText: {
    fontSize: 12,
    color: theme.colors.muted,
    flex: 1,
    lineHeight: 16,
  },
  tocItemTextActive: {
    fontWeight: "600",
    color: theme.colors.primary,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
});
