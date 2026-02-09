import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface BackButtonProps {
  onPress: () => void;
  title?: string;
}

export default function BackButton({ onPress, title = "Quay lại" }: BackButtonProps) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>← {title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.primary,
  },
});
