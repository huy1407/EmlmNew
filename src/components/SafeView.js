import React from "react";
import { SafeAreaView, Platform, StatusBar, View } from "react-native";
import { theme } from "../styles/theme";

/**
 * SafeView
 * - Wrap your screen with safe area (iOS) + status bar padding (Android)
 * - Keeps a consistent background color
 */
export default function SafeView({ children, style }) {
  const topPadding =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View
        style={[
          { flex: 1, backgroundColor: theme.colors.bg, paddingTop: topPadding },
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
