import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Bookmark, BookmarkType } from "../types";

const STORAGE_KEY = "@emlm/bookmarks_v1";

function getStoredBookmarks(): Bookmark[] {
  return [];
}

async function getStoredBookmarksAsync(): Promise<Bookmark[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

async function setStoredBookmarksAsync(bookmarks: Bookmark[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // ignore
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(getStoredBookmarks);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const stored = await getStoredBookmarksAsync();
      setBookmarks(stored);
      setIsHydrated(true);
    })();
  }, []);

  const addBookmark = useCallback(
    (type: BookmarkType, id: string, title: string) => {
      const key = `${type}:${id}`;
      setBookmarks((prev) => {
        if (prev.some((b) => b.key === key)) return prev;
        const next = [...prev, { key, type, id, title }];
        setStoredBookmarksAsync(next);
        return next;
      });
    },
    []
  );

  const removeBookmark = useCallback((key: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.key !== key);
      setStoredBookmarksAsync(next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback(
    (type: BookmarkType, id: string, title: string): boolean => {
      const key = `${type}:${id}`;
      const exists = bookmarks.some((b) => b.key === key);
      if (exists) {
        removeBookmark(key);
        return false;
      } else {
        addBookmark(type, id, title);
        return true;
      }
    },
    [bookmarks, addBookmark, removeBookmark]
  );

  const hasBookmark = useCallback(
    (type: BookmarkType, id: string) => {
      return bookmarks.some((b) => b.key === `${type}:${id}`);
    },
    [bookmarks]
  );

  return { bookmarks, addBookmark, removeBookmark, toggleBookmark, hasBookmark, isHydrated };
}
