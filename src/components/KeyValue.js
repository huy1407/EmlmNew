import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";

export default function KeyValue({
  label,
  value,
  valueColor,
  valueBold,
  valueSize,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
      }}
    >
      <Text style={{ color: "#374151" }}>{label}</Text>
      <Text
        style={{
          color: valueColor || theme.colors.text,
          fontWeight: valueBold ? "900" : "800",
          fontSize: valueSize || 14,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
