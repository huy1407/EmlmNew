import type { BookmarkType } from "../types";

export interface LearningLesson {
  type: BookmarkType;
  id: string;
  titleOverride?: string;
}

export interface LearningDay {
  day: number;
  lessons: LearningLesson[];
}

export const LEARNING_PATH: LearningDay[] = [
  {
    day: 1,
    lessons: [
      { type: "knowledge", id: "k1", titleOverride: "Hiểu về MLM cơ bản" },
      { type: "regulation", id: "r1" },
    ],
  },
  {
    day: 2,
    lessons: [
      { type: "knowledge", id: "k2", titleOverride: "Dấu hiệu rủi ro MLM" },
      { type: "qa", id: "q1", titleOverride: "Hỏi & Đáp: Đăng ký MLM" },
    ],
  },
  {
    day: 3,
    lessons: [
      { type: "knowledge", id: "k3" },
      { type: "alert", id: "a1" },
    ],
  },
  {
    day: 4,
    lessons: [
      { type: "knowledge", id: "k4" },
      { type: "qa", id: "q4" },
      { type: "regulation", id: "r2" },
    ],
  },
  {
    day: 5,
    lessons: [
      { type: "knowledge", id: "k5" },
      { type: "alert", id: "a6" },
      { type: "qa", id: "q3" },
    ],
  },
  {
    day: 6,
    lessons: [
      { type: "knowledge", id: "k6" },
      { type: "alert", id: "a4" },
      { type: "news", id: "n5" },
    ],
  },
  {
    day: 7,
    lessons: [
      { type: "qa", id: "q10" },
      { type: "alert", id: "a2" },
      { type: "news", id: "n6" },
      { type: "regulation", id: "r4" },
    ],
  },
];
