import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface CompanyCompareCardProps {
  onPress: () => void;
}

export default function CompanyCompareCard({ onPress }: CompanyCompareCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>So sánh doanh nghiệp</Text>
      <Text style={styles.description}>
        Chọn 2-3 doanh nghiệp để xem so sánh chi tiết
      </Text>
      <View style={styles.footer}>
        <Text style={styles.buttonText}>Bắt đầu so sánh →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#15803D",
    lineHeight: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.primary,
  },
});
