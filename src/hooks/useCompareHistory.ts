import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COMPARE_HISTORY_KEY = "@emlm/compare_history_v1";
const MAX_HISTORY = 20;

export interface CompareHistoryItem {
  companyIds: string[];
  timestamp: string;
}

async function getStoredHistory(): Promise<CompareHistoryItem[]> {
  try {
    const stored = await AsyncStorage.getItem(COMPARE_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

async function setStoredHistory(history: CompareHistoryItem[]) {
  try {
    await AsyncStorage.setItem(COMPARE_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function useCompareHistory() {
  const [history, setHistory] = useState<CompareHistoryItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const stored = await getStoredHistory();
      setHistory(stored);
      setIsHydrated(true);
    })();
  }, []);

  const addComparison = useCallback((companyIds: string[]) => {
    setHistory((prev) => {
      const item: CompareHistoryItem = {
        companyIds,
        timestamp: new Date().toISOString(),
      };
      const next = [item, ...prev].slice(0, MAX_HISTORY);
      setStoredHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setStoredHistory([]);
  }, []);

  return { history, addComparison, clearHistory, isHydrated };
}
