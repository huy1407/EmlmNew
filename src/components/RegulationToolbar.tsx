import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { theme } from "../styles/theme";

interface RegulationToolbarProps {
  fontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onShare: () => void;
  onToggleTOC: () => void;
  showTOC?: boolean;
}

export default function RegulationToolbar({
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onShare,
  onToggleTOC,
  showTOC,
}: RegulationToolbarProps) {
  const canIncrease = fontSize < 24;
  const canDecrease = fontSize > 12;

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Pressable
          style={[
            styles.button,
            !canDecrease && styles.buttonDisabled,
          ]}
          onPress={onDecreaseFontSize}
          disabled={!canDecrease}
        >
          <Text
            style={[
              styles.buttonText,
              !canDecrease && styles.buttonTextDisabled,
            ]}
          >
            A−
          </Text>
        </Pressable>

        <Text style={styles.fontSizeDisplay}>{fontSize}px</Text>

        <Pressable
          style={[
            styles.button,
            !canIncrease && styles.buttonDisabled,
          ]}
          onPress={onIncreaseFontSize}
          disabled={!canIncrease}
        >
          <Text
            style={[
              styles.buttonText,
              !canIncrease && styles.buttonTextDisabled,
            ]}
          >
            A+
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable style={styles.button} onPress={onToggleTOC}>
          <Text style={styles.buttonText}>
            {showTOC ? "Ẩn" : "Mục"} MC
          </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={onShare}>
          <Text style={styles.buttonText}>Chia sẻ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    minWidth: 36,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  buttonTextDisabled: {
    opacity: 0.6,
  },
  fontSizeDisplay: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.colors.muted,
    minWidth: 32,
    textAlign: "center",
  },
});
