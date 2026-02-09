import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { computePct } from "../utils";
import type { Company } from "../types";
import { theme } from "../styles/theme";

interface CompanyDetailScreenProps {
  company: Company | undefined;
  getSignals: (c: Company) => { transparentCount: number; researchCount: number };
  onVoteTransparent: (id: string) => void;
  onVoteResearch: (id: string) => void;
  onBack: () => void;
}

export default function CompanyDetailScreen({
  company,
  getSignals,
  onVoteTransparent,
  onVoteResearch,
}: CompanyDetailScreenProps) {
  if (!company) return null;

  const signals = getSignals(company);
  const { aPct: transparentPct, bPct: researchPct } = computePct(
    signals.transparentCount,
    signals.researchCount
  );

  const handleOpenWebsite = () => {
    if (company.websiteUrl) Linking.openURL(company.websiteUrl);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      <Text style={styles.title}>{company.name}</Text>
      <Text style={styles.desc}>{company.shortDesc}</Text>
      {company.tags.length > 0 && (
        <View style={styles.tags}>
          {company.tags.map((t) => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      )}
      {company.websiteUrl && (
        <Pressable style={styles.linkBtn} onPress={handleOpenWebsite}>
          <Text style={styles.linkText}>Mở website</Text>
        </Pressable>
      )}
      <View style={styles.signals}>
        <Text style={styles.signalsTitle}>Tín hiệu cộng đồng</Text>
        <View style={styles.buttons}>
          <Pressable
            style={styles.signalBtn}
            onPress={() => onVoteTransparent(company.id)}
          >
            <Text style={styles.signalBtnText}>👍 Minh bạch</Text>
            <Text style={styles.signalPct}>{transparentPct}%</Text>
          </Pressable>
          <Pressable
            style={styles.signalBtn}
            onPress={() => onVoteResearch(company.id)}
          >
            <Text style={styles.signalBtnText}>⚠️ Cần tìm hiểu</Text>
            <Text style={styles.signalPct}>{researchPct}%</Text>
          </Pressable>
        </View>
      </View>
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
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: theme.colors.muted,
    lineHeight: 24,
    marginBottom: 12,
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.border,
  },
  tagText: { fontSize: 13, color: theme.colors.muted },
  linkBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  linkText: { fontSize: 14, fontWeight: "600", color: "#fff" },
  signals: { marginTop: 8 },
  signalsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 12,
  },
  buttons: { flexDirection: "row", gap: 12 },
  signalBtn: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  signalBtnText: { fontSize: 14, fontWeight: "600", color: theme.colors.text },
  signalPct: { fontSize: 18, fontWeight: "700", color: theme.colors.primary, marginTop: 4 },
});
