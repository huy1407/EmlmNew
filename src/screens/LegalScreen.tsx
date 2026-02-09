import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { theme } from "../styles/theme";

interface LegalScreenProps {
  title: string;
  content: string;
}

export default function LegalScreen({ title, content }: LegalScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{content}</Text>
      <Text style={styles.contact}>
        Liên hệ: [Placeholder - Developer contact]
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 16,
  },
  body: {
    fontSize: 15,
    color: theme.colors.muted,
    lineHeight: 24,
    marginBottom: 24,
  },
  contact: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "500",
  },
});
