import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface ListItemRowProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
}

export default function ListItemRow({
  title,
  subtitle,
  onPress,
}: ListItemRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: theme.radius.md,
    ...theme.shadow,
  },
  pressed: {
    opacity: 0.85,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.muted,
    marginTop: 4,
  },
  arrow: {
    fontSize: 24,
    color: theme.colors.muted,
    marginLeft: 8,
  },
});
