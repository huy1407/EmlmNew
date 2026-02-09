/** eMLM - Community Information App - Type Definitions */

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  updatedAt: string;
}

export interface RegulationDoc {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  shortDesc: string;
  websiteUrl?: string;
  tags: string[];
  communitySignals: {
    transparentCount: number;
    researchCount: number;
  };
}

export interface QAItem {
  id: string;
  topic: string;
  question: string;
  answer: string;
  updatedAt: string;
}

export interface AlertPost {
  id: string;
  title: string;
  description: string;
  sourceNote: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  publishedAt: string;
}

export type BookmarkType =
  | "knowledge"
  | "regulation"
  | "company"
  | "qa"
  | "alert"
  | "news";

export interface Bookmark {
  key: string;
  type: BookmarkType;
  id: string;
  title: string;
}

export type RouteName =
  | "home"
  | "intro"
  | "knowledge-list"
  | "knowledge-detail"
  | "regulation-list"
  | "regulation-detail"
  | "company-list"
  | "company-detail"
  | "qa-list"
  | "qa-detail"
  | "ask-question"
  | "alert-list"
  | "alert-detail"
  | "news-list"
  | "news-detail"
  | "search"
  | "bookmarks"
  | "settings"
  | "privacy"
  | "terms"
  | "guidelines"
  | "about";

export interface Route {
  name: RouteName;
  params?: Record<string, unknown>;
}
