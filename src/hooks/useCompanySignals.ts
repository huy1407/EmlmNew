import { useState, useCallback } from "react";
import type { Company } from "../types";

// Persist counts locally if possible. In-memory fallback for session.
// TODO: Use AsyncStorage to persist across sessions
const signalsStore: Record<string, { t: number; r: number }> = {};

function getSignals(companyId: string, base: Company["communitySignals"]) {
  const stored = signalsStore[companyId];
  if (stored) {
    return {
      transparentCount: base.transparentCount + stored.t,
      researchCount: base.researchCount + stored.r,
    };
  }
  return base;
}

export function useCompanySignals(companies: Company[]) {
  const [localCounts, setLocalCounts] = useState<Record<string, { t: number; r: number }>>({});

  const getCompanySignals = useCallback(
    (company: Company) => {
      const stored = signalsStore[company.id] || localCounts[company.id] || { t: 0, r: 0 };
      return {
        transparentCount: company.communitySignals.transparentCount + stored.t,
        researchCount: company.communitySignals.researchCount + stored.r,
      };
    },
    [localCounts]
  );

  const voteTransparent = useCallback((companyId: string) => {
    const key = companyId;
    signalsStore[key] = signalsStore[key] || { t: 0, r: 0 };
    signalsStore[key].t += 1;
    setLocalCounts((prev) => ({
      ...prev,
      [key]: { ...signalsStore[key] },
    }));
  }, []);

  const voteResearch = useCallback((companyId: string) => {
    const key = companyId;
    signalsStore[key] = signalsStore[key] || { t: 0, r: 0 };
    signalsStore[key].r += 1;
    setLocalCounts((prev) => ({
      ...prev,
      [key]: { ...signalsStore[key] },
    }));
  }, []);

  return { getCompanySignals, voteTransparent, voteResearch };
}
