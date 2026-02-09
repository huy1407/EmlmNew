import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface DisclaimerBannerProps {
  text?: string;
}

const DEFAULT_TEXT = "Ứng dụng cộng đồng. Thông tin chỉ mang tính tham khảo.";

export default function DisclaimerBanner({
  text = DEFAULT_TEXT,
}: DisclaimerBannerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.yellowBg,
    borderWidth: 1,
    borderColor: theme.colors.yellowBorder,
    borderRadius: theme.radius.md,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  text: {
    fontSize: 13,
    color: theme.colors.muted,
    textAlign: "center",
  },
});
