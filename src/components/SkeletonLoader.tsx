import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface SkeletonLoaderProps {
  count?: number;
}

export default function SkeletonLoader({ count = 5 }: SkeletonLoaderProps) {
  return (
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={[styles.skeletonLine, styles.skeletonTitle]} />
            <View style={[styles.skeletonLine, styles.skeletonSubtitle]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: theme.radius.md,
  },
  skeletonImage: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.md,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonLine: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonTitle: {
    width: "80%",
    height: 12,
  },
  skeletonSubtitle: {
    width: "60%",
    height: 10,
  },
});
