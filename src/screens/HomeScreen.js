import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import FeatureCard from "../components/FeatureCard";
import useResponsiveColumns from "../components/useResponsiveColumns";
import { theme } from "../styles/theme";

export default function HomeScreen({ navigateTo }) {
  const columns = useResponsiveColumns(768);

  const features = [
    {
      title: "Khai báo DN Đa cấp",
      desc: "Thu thập và đánh giá thông tin",
      screen: "company-form",
      color: theme.colors.primary,
      icon: "business-outline",
    },
    {
      title: "Danh sách DN",
      desc: "Xem các doanh nghiệp đã khai báo",
      screen: "company-list",
      color: theme.colors.green,
      icon: "document-text-outline",
    },
    {
      title: "Case Study",
      desc: "Học từ tình huống thực tế",
      screen: "case-study",
      color: theme.colors.purple,
      icon: "book-outline",
    },
    {
      title: "Mô phỏng Thu nhập",
      desc: "Tính toán lợi nhuận thực tế",
      screen: "calculator",
      color: theme.colors.orange,
      icon: "calculator-outline",
    },
  ];

  const gap = 12;
  const cardWidth = columns === 2 ? "48.5%" : "100%";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>eMLM Plus</Text>
        <Text style={styles.heroSub}>Công cụ đánh giá doanh nghiệp đa cấp</Text>
      </View>

      <View style={[styles.grid, { gap }]}>
        {features.map((f, idx) => (
          <View key={idx} style={{ width: cardWidth }}>
            <FeatureCard
              title={f.title}
              desc={f.desc}
              icon={f.icon}
              color={f.color}
              onPress={() => navigateTo(f.screen)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 28, gap: 10 },
  heroCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    padding: 20,
    ...theme.shadow,
  },
  heroTitle: { fontSize: 28, fontWeight: "900", color: theme.colors.text },
  heroSub: { marginTop: 6, color: theme.colors.muted },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
