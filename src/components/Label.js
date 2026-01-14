import React from "react";
import { Text } from "react-native";

export default function Label({ children }) {
  return (
    <Text
      style={{
        marginTop: 10,
        marginBottom: 6,
        fontWeight: "800",
        color: "#374151",
      }}
    >
      {children}
    </Text>
  );
}
