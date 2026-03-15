import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

interface FeatureCardWithIconProps {
  title: string;
  icon: string;
  onPress: () => void;
}

export default function FeatureCardWithIcon({ title, icon, onPress }: FeatureCardWithIconProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={48}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    padding: 16,
    minHeight: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    lineHeight: 18,
  },
});
