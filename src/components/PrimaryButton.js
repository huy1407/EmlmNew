import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { theme } from "../styles/theme";

export default function PrimaryButton({ title, onPress, leftIcon }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        marginTop: 14,
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        borderRadius: theme.radius.md,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {leftIcon}
      <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
