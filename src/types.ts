/** eMLM - Community Information App - Type Definitions */

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  updatedAt: string;
}

export interface RegulationSection {
  sectionName: string;
  sectionIndex: number;
  title: string;
  content: string;
}

export interface RegulationDoc {
  id: string;
  title: string;
  summary: string;
  content: string;
  sourceUrl?: string;
  updatedAt: string;
  sections?: RegulationSection[];
  shortName?: string;
}

export interface Company {
  id: string;
  name: string;
  shortDesc: string;
  description?: string;
  licenseStatus?: "licensed" | "unknown";
  foundedYear?: number;
  headquarters?: string;
  websiteUrl?: string;
  tags: string[];
  productCategories?: string[];
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
  content: string;
  sourceUrl?: string;
  publishedAt: string;
  imageUrl?: string;
  modify?: string;
  category_ids?: string;
  files_url?: string;
}

export interface CompanyMLM {
  id?: string;
  ten: string; // Company name
  sodangkydoanhnghiep?: string; // Registration number
  sodangkyhoatdong?: string; // Business license number
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

export interface RecentlyViewedItem {
  type: BookmarkType;
  id: string;
  title: string;
  viewedAt: string;
}

export type RouteName =
  | "home"
  | "intro"
  | "knowledge-list"
  | "knowledge-detail"
  | "regulation-list"
  | "regulation-detail"
  | "regulation-qa"
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
  | "risk-assessment"
  | "learning-path"
  | "company-select"
  | "company-compare"
  | "privacy"
  | "terms"
  | "guidelines"
  | "about";

export interface Route {
  name: RouteName;
  params?: Record<string, unknown>;
}
