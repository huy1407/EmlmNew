/** eMLM - Utility functions */
import { Share } from "react-native";
import type { RegulationDoc, RegulationSection } from "../types";

const SHARING_DISCLAIMER = "(eMLM) Ứng dụng cộng đồng. Thông tin chỉ mang tính tham khảo.";

/**
 * Format ISO date string to readable format
 */
export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

/**
 * Share content with disclaimer footer appended
 */
export async function shareWithDisclaimer(
  title: string,
  message: string,
  url?: string
): Promise<void> {
  const fullMessage = url
    ? `${message}\n\n${url}\n\n${SHARING_DISCLAIMER}`
    : `${message}\n\n${SHARING_DISCLAIMER}`;
  try {
    await Share.share({
      title,
      message: fullMessage,
      url: url || undefined,
    });
  } catch (err) {
    console.warn("Share error:", err);
  }
}

/**
 * Compute percentage: a / (a + b) * 100, avoid division by zero
 */
export function computePct(a: number, b: number): { aPct: number; bPct: number } {
  const total = a + b;
  if (total === 0) return { aPct: 0, bPct: 0 };
  return {
    aPct: Math.round((a / total) * 100),
    bPct: Math.round((b / total) * 100),
  };
}

/**
 * Search regulations including section-level results
 */
export interface RegulationSearchResult {
  regulation: RegulationDoc;
  matchType: "title" | "summary" | "section";
  sectionIndex?: number;
  section?: RegulationSection;
}

export function searchRegulations(
  regulations: RegulationDoc[],
  query: string
): RegulationSearchResult[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const results: RegulationSearchResult[] = [];

  for (const regulation of regulations) {
    // Check title and summary
    if (regulation.title.toLowerCase().includes(q)) {
      results.push({
        regulation,
        matchType: "title",
      });
      continue;
    }

    if (regulation.summary.toLowerCase().includes(q)) {
      results.push({
        regulation,
        matchType: "summary",
      });
      continue;
    }

    // Check sections
    if (regulation.sections) {
      for (let i = 0; i < regulation.sections.length; i++) {
        const section = regulation.sections[i];
        if (
          section.title.toLowerCase().includes(q) ||
          section.content.toLowerCase().includes(q)
        ) {
          results.push({
            regulation,
            matchType: "section",
            sectionIndex: i,
            section,
          });
        }
      }
    }
  }

  return results;
}
