import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import { RenderHtml } from "react-native-render-html";
import type { RegulationSection } from "../types";
import { theme } from "../styles/theme";

interface RegulationSectionContentProps {
  section: RegulationSection;
  fontSize: number;
}

export default function RegulationSectionContent({
  section,
  fontSize,
}: RegulationSectionContentProps) {
  const windowWidth = Dimensions.get("window").width;
  
  const handleLinkPress = (url: string) => {
    Alert.alert(
      "Mở liên kết bên ngoài",
      "Bạn sắp rời khỏi ứng dụng để xem tài liệu tham khảo.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Mở",
          onPress: () => Linking.openURL(url),
        },
      ]
    );
  };

  const tagsStyles = {
    body: {
      fontSize: fontSize,
      lineHeight: fontSize * 1.6,
      color: theme.colors.text,
    },
    p: {
      marginVertical: 8,
      fontSize: fontSize,
      lineHeight: fontSize * 1.6,
      color: theme.colors.text,
    },
    br: {
      marginVertical: 4,
    },
    a: {
      color: theme.colors.primary,
    },
  };

  const isHtml = section.content.includes("<");

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionName}>{section.sectionName}</Text>
        <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>
          {section.title}
        </Text>
      </View>

      <ScrollView style={styles.contentScroll}>
        {isHtml ? (
          <RenderHtml
            contentWidth={windowWidth - 32}
            html={section.content}
            tagsStyles={tagsStyles}
            onLinkPress={(evt, url) => handleLinkPress(url)}
          />
        ) : (
          <Text style={[styles.plainText, { fontSize }]}>
            {section.content}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionName: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 24,
  },
  contentScroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  plainText: {
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
});
