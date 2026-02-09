import React from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { theme } from "../styles/theme";

interface SafeViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function SafeView({ children, style }: SafeViewProps) {
  const topPadding =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.inner, { paddingTop: topPadding }, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  inner: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
});
