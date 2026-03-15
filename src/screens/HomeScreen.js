import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export default function HomeScreen({ navigateTo }) {
  const features = [
    {
      title: "Giới thiệu",
      screen: "about",
      icon: "information-outline",
    },
    {
      title: "Pháp luật bán hàng đa cấp",
      screen: "legal-document",
      icon: "scale-balance",
    },
    {
      title: "Doanh nghiệp bán hàng đa cấp",
      screen: "company-list",
      icon: "organization",
    },
    {
      title: "Hỏi & đáp",
      screen: "qa",
      icon: "help-circle-outline",
    },
    {
      title: "Lưu ý",
      screen: "distributor-notes",
      icon: "alert-circle-outline",
    },
    {
      title: "Tin tức",
      screen: "news",
      icon: "newspaper",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.headerTitle}>eMLM</Text>

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={require("../../public/mlm-illustration.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Feature Grid */}
      <View style={styles.grid}>
        {features.map((f, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.featureCard}
            onPress={() => navigateTo(f.screen)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={f.icon}
              size={48}
              color="white"
              style={styles.featureIcon}
            />
            <Text style={styles.featureTitle}>{f.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: theme.colors.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  heroContainer: {
    marginHorizontal: 12,
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    height: 160,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
  },
  featureCard: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    lineHeight: 18,
  },
});
