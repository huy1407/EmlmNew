import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export default function BackButton({ onPress, label = "Quay lại" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
    >
      <Ionicons name="chevron-back" size={18} color={theme.colors.primary} />
      <Text style={{ color: theme.colors.primary, fontWeight: "800" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
