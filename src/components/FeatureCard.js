import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export default function FeatureCard({ title, desc, icon, color, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <Ionicons name={icon} size={26} color="#fff" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>

      <View style={styles.linkRow}>
        <Text style={styles.link}>Xem chi tiết</Text>
        <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2FF",
    ...theme.shadow,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "900", color: theme.colors.text },
  desc: { marginTop: 4, color: theme.colors.muted },
  linkRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  link: { color: theme.colors.primary, fontWeight: "800", marginRight: 4 },
});
