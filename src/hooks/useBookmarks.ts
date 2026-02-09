import { useState, useCallback } from "react";
import type { Bookmark, BookmarkType } from "../types";

// In-memory fallback. TODO: Replace with AsyncStorage when available
// import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = "emlm_bookmarks";

function getStoredBookmarks(): Bookmark[] {
  // TODO: AsyncStorage.getItem(STORAGE_KEY).then(JSON.parse)
  return [];
}

function setStoredBookmarks(bookmarks: Bookmark[]) {
  // TODO: AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(getStoredBookmarks);

  const addBookmark = useCallback(
    (type: BookmarkType, id: string, title: string) => {
      const key = `${type}:${id}`;
      setBookmarks((prev) => {
        if (prev.some((b) => b.key === key)) return prev;
        const next = [...prev, { key, type, id, title }];
        setStoredBookmarks(next);
        return next;
      });
    },
    []
  );

  const removeBookmark = useCallback((key: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.key !== key);
      setStoredBookmarks(next);
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

  return { bookmarks, addBookmark, removeBookmark, toggleBookmark, hasBookmark };
}
