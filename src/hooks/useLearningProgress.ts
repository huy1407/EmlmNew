import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LEARNING_PROGRESS_KEY = "@emlm/learning_progress_v1";

export interface LearningProgress {
  completedLessons: string[];
}

async function getStoredProgress(): Promise<LearningProgress> {
  try {
    const stored = await AsyncStorage.getItem(LEARNING_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : { completedLessons: [] };
  } catch {
    return { completedLessons: [] };
  }
}

async function setStoredProgress(progress: LearningProgress) {
  try {
    await AsyncStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>({ completedLessons: [] });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const stored = await getStoredProgress();
      setProgress(stored);
      setIsHydrated(true);
    })();
  }, []);

  const markLessonComplete = useCallback((lessonKey: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonKey)) return prev;
      const next = {
        completedLessons: [...prev.completedLessons, lessonKey],
      };
      setStoredProgress(next);
      return next;
    });
  }, []);

  const toggleLessonComplete = useCallback((lessonKey: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedLessons.includes(lessonKey);
      const next = {
        completedLessons: isCompleted
          ? prev.completedLessons.filter((key) => key !== lessonKey)
          : [...prev.completedLessons, lessonKey],
      };
      setStoredProgress(next);
      return next;
    });
  }, []);

  const isLessonComplete = useCallback(
    (lessonKey: string) => {
      return progress.completedLessons.includes(lessonKey);
    },
    [progress]
  );

  const getProgressPercentage = useCallback((totalLessons: number) => {
    if (totalLessons === 0) return 0;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  }, [progress.completedLessons]);

  return {
    progress,
    markLessonComplete,
    toggleLessonComplete,
    isLessonComplete,
    getProgressPercentage,
    isHydrated,
  };
}
