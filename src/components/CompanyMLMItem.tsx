import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { CompanyMLM } from "../types";
import { theme } from "../styles/theme";

interface CompanyMLMItemProps {
  item: CompanyMLM;
  onPress?: () => void;
}

export default function CompanyMLMItem({
  item,
  onPress,
}: CompanyMLMItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {/* Company Name */}
        <View style={styles.nameRow}>
          <Ionicons
            name="business"
            size={24}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.name} numberOfLines={2}>
            {item.ten}
          </Text>
        </View>

        {/* Registration Number */}
        {item.sodangkydoanhnghiep && (
          <View style={styles.infoRow}>
            <Ionicons
              name="document-text"
              size={18}
              color={theme.colors.primary}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>GCN đăng ký doanh nghiệp/Đầu tư số:</Text>
              <Text style={styles.infoText}>{item.sodangkydoanhnghiep}</Text>
            </View>
          </View>
        )}

        {/* Business License Number */}
        {item.sodangkyhoatdong && (
          <View style={styles.infoRow}>
            <Ionicons
              name="document-text"
              size={18}
              color={theme.colors.primary}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>GCN đăng ký hoạt động BHDC:</Text>
              <Text style={styles.infoText}>{item.sodangkyhoatdong}</Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    marginHorizontal: 0,
    marginVertical: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.muted,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: theme.colors.muted,
  },
  content: {
    flexDirection: "column",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    marginLeft: 36,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.muted,
    fontWeight: "500",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.text,
  },
});
