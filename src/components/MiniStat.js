import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";

export default function MiniStat({ value, label, color = theme.colors.primary }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        padding: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "900", color }}>{value}</Text>
      <Text style={{ marginTop: 6, color: "#6B7280", textAlign: "center" }}>
        {label}
      </Text>
    </View>
  );
}
