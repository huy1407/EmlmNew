import React from "react";
import { TextInput } from "react-native";
import { theme } from "../styles/theme";

export default function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  minHeight,
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      multiline={multiline}
      style={{
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: theme.radius.md,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
        minHeight: multiline ? minHeight || 90 : undefined,
        textAlignVertical: multiline ? "top" : "auto",
      }}
    />
  );
}
