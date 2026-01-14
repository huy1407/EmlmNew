import React from "react";
import { View, Text } from "react-native";

export default function Section({ title, dotColor, children }) {
  return (
    <View style={{ marginTop: 14 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            marginRight: 8,
            backgroundColor: dotColor,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "900", color: "#374151" }}>
          {title}
        </Text>
      </View>
      <View style={{ marginLeft: 14, marginTop: 6 }}>{children}</View>
    </View>
  );
}
