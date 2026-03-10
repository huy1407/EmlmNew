import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Linking, StyleSheet, Alert, Dimensions } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import RegulationToolbar from "../components/RegulationToolbar";
import RegulationTableOfContents from "../components/RegulationTableOfContents";
import RegulationSectionContent from "../components/RegulationSectionContent";
import { shareWithDisclaimer } from "../utils";
import type { RegulationDoc, Route } from "../types";
import { theme } from "../styles/theme";

const REGULATION_DISCLAIMER = "Nội dung không thay thế tư vấn pháp lý chính thức.";

interface RegulationDetailScreenProps {
  doc: RegulationDoc | undefined;
  onBack: () => void;
  onViewDetail?: () => void;
  onNavigate?: (route: Route) => void;
}

export default function RegulationDetailScreen({
  doc,
  onBack,
  onViewDetail,
  onNavigate,
}: RegulationDetailScreenProps) {
  const [fontSize, setFontSize] = useState(15);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showTOC, setShowTOC] = useState(false);

  useEffect(() => {
    onViewDetail?.();
  }, [doc?.id, onViewDetail]);

  if (!doc) return null;

  const hasSections = doc.sections && doc.sections.length > 0;
  const sections = doc.sections || [];
  const currentSection = sections[currentSectionIndex];

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 1, 24));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 1, 12));
  };

  const handleShare = () => {
    if (hasSections && currentSection) {
      shareWithDisclaimer(
        `${doc.title} - ${currentSection.title}`,
        currentSection.content.substring(0, 200),
        doc.sourceUrl
      );
    } else {
      shareWithDisclaimer(doc.title, doc.summary, doc.sourceUrl);
    }
  };

  const handleSelectSection = (index: number) => {
    setCurrentSectionIndex(index);
    setShowTOC(false);
  };

  const handleToggleTOC = () => {
    setShowTOC(!showTOC);
  };

  if (hasSections) {
    return (
      <View style={styles.container}>
        <DisclaimerBanner text={REGULATION_DISCLAIMER} />
        <RegulationToolbar
          fontSize={fontSize}
          onIncreaseFontSize={handleIncreaseFontSize}
          onDecreaseFontSize={handleDecreaseFontSize}
          onShare={handleShare}
          onToggleTOC={handleToggleTOC}
          showTOC={showTOC}
        />
        <View style={styles.contentArea}>
          {showTOC && (
            <RegulationTableOfContents
              sections={sections}
              currentSectionIndex={currentSectionIndex}
              onSelectSection={handleSelectSection}
            />
          )}
          {currentSection && (
            <RegulationSectionContent
              section={currentSection}
              fontSize={fontSize}
            />
          )}
        </View>
        <View style={styles.floatingActions}>
          <Pressable
            style={styles.floatingBtn}
            onPress={() =>
              onNavigate?.({ name: "regulation-qa", params: { id: doc.id } })
            }
          >
            <Text style={styles.floatingBtnText}>❓ Hỏi & Đáp</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Fallback for regulations without sections
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <DisclaimerBanner text={REGULATION_DISCLAIMER} />
        <Text style={styles.title}>{doc.title}</Text>
        <Text style={styles.summary}>{doc.summary}</Text>

        {/* Full content displayed natively */}
        <Text style={styles.contentLabel}>Nội dung:</Text>
        <Text style={[styles.contentText, { fontSize }]}>{doc.content}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable style={styles.btn} onPress={handleShare}>
            <Text style={styles.btnText}>Chia sẻ</Text>
          </Pressable>
          {onNavigate && (
            <Pressable
              style={styles.btn}
              onPress={() =>
                onNavigate({ name: "regulation-qa", params: { id: doc.id } })
              }
            >
              <Text style={styles.btnText}>❓ Hỏi & Đáp</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentArea: {
    flex: 1,
    flexDirection: "row",
  },
  content: { padding: 16, paddingBottom: 32 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
  },
  summary: {
    fontSize: 16,
    color: theme.colors.muted,
    lineHeight: 24,
    marginBottom: 16,
  },
  contentLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 8,
  },
  contentText: {
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  btnText: { fontSize: 14, fontWeight: "600", color: "#fff" },
  floatingActions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  floatingBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },
  floatingBtnText: { fontSize: 15, fontWeight: "600", color: "#fff" },
});
