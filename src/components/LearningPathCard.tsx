import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface LearningPathCardProps {
  progress: number;
  onPress: () => void;
}

export default function LearningPathCard({ progress, onPress }: LearningPathCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>Lộ trình học 7 ngày</Text>
        <Text style={styles.progress}>{progress}%</Text>
      </View>
      <Text style={styles.description}>
        Khám phá thông tin MLM qua từng bài học
      </Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E40AF",
  },
  progress: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  description: {
    fontSize: 12,
    color: "#1E3A8A",
    lineHeight: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#DBEAFE",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
  },
});
