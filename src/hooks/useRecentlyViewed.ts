import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BookmarkType } from "../types";

const STORAGE_KEY = "@emlm/recent_v1";
const MAX_ITEMS = 20;

export interface RecentlyViewedItem {
  type: BookmarkType;
  id: string;
  title: string;
  viewedAt: string; // ISO timestamp
}

async function getStoredRecent(): Promise<RecentlyViewedItem[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

async function setStoredRecent(items: RecentlyViewedItem[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<RecentlyViewedItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const stored = await getStoredRecent();
      setRecent(stored);
      setIsHydrated(true);
    })();
  }, []);

  const addRecentlyViewed = useCallback(
    (type: BookmarkType, id: string, title: string) => {
      setRecent((prev) => {
        // Remove if already exists (to avoid duplicates)
        const filtered = prev.filter((item) => !(item.type === type && item.id === id));
        // Add to front
        const updated = [
          { type, id, title, viewedAt: new Date().toISOString() },
          ...filtered,
        ].slice(0, MAX_ITEMS);
        setStoredRecent(updated);
        return updated;
      });
    },
    []
  );

  const clearRecentlyViewed = useCallback(async () => {
    setRecent([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { recent, addRecentlyViewed, clearRecentlyViewed, isHydrated };
}
