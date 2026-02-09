/**
 * eMLM - Community Information App about Multi-Level Marketing (MLM)
 * No login, no admin. Static data. Neutral wording.
 */
import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import SafeView from "./src/components/SafeView";
import TabBar from "./src/components/TabBar";
import BackButton from "./src/components/BackButton";

import HomeScreen from "./src/screens/HomeScreen";
import IntroScreen from "./src/screens/IntroScreen";
import KnowledgeListScreen from "./src/screens/KnowledgeListScreen";
import KnowledgeDetailScreen from "./src/screens/KnowledgeDetailScreen";
import RegulationListScreen from "./src/screens/RegulationListScreen";
import RegulationDetailScreen from "./src/screens/RegulationDetailScreen";
import CompanyListScreen from "./src/screens/CompanyListScreen";
import CompanyDetailScreen from "./src/screens/CompanyDetailScreen";
import QAListScreen from "./src/screens/QAListScreen";
import QADetailScreen from "./src/screens/QADetailScreen";
import AskQuestionScreen from "./src/screens/AskQuestionScreen";
import AlertListScreen from "./src/screens/AlertListScreen";
import AlertDetailScreen from "./src/screens/AlertDetailScreen";
import NewsListScreen from "./src/screens/NewsListScreen";
import NewsDetailScreen from "./src/screens/NewsDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import BookmarksScreen from "./src/screens/BookmarksScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import LegalScreen from "./src/screens/LegalScreen";

import {
  KNOWLEDGE_ARTICLES,
  REGULATION_DOCS,
  COMPANIES,
  QA_ITEMS,
  ALERT_POSTS,
  NEWS_ITEMS,
} from "./src/data";
import { useBookmarks } from "./src/hooks/useBookmarks";
import { useCompanySignals } from "./src/hooks/useCompanySignals";
import type { Route, RouteName } from "./src/types";

const TABS = [
  { key: "home", label: "Trang chủ" },
  { key: "search", label: "Tìm kiếm" },
  { key: "bookmarks", label: "Đã lưu" },
  { key: "settings", label: "Cài đặt" },
];

const TAB_ROUTES: RouteName[] = ["home", "search", "bookmarks", "settings"];

const PRIVACY_CONTENT = `Chính sách bảo mật

• Không yêu cầu đăng nhập
• Không thu thập dữ liệu cá nhân
• Chỉ lưu bookmark cục bộ trên thiết bị (nếu có)

Ứng dụng cộng đồng. Thông tin chỉ mang tính tham khảo.`;

const TERMS_CONTENT = `Điều khoản sử dụng

eMLM là ứng dụng cộng đồng cung cấp thông tin tham khảo về kinh doanh đa cấp. Nội dung không thay thế tư vấn pháp lý hoặc chuyên môn chính thức.

Ứng dụng cộng đồng. Thông tin chỉ mang tính tham khảo.`;

const GUIDELINES_CONTENT = `Nguyên tắc cộng đồng

• Tôn trọng, không vu khống
• Thông tin trung tính, tránh cáo buộc trực tiếp
• Khuyến nghị tìm hiểu thêm từ nhiều nguồn

Ứng dụng cộng đồng. Thông tin chỉ mang tính tham khảo.`;

const ABOUT_CONTENT = `eMLM - Ứng dụng cộng đồng về MLM

Phiên bản 1.0.0

Mục tiêu: Cung cấp thông tin tham khảo về kinh doanh đa cấp, giúp người dùng tìm hiểu và đưa ra quyết định có thông tin.

Ứng dụng cộng đồng. Thông tin chỉ mang tính tham khảo.`;

export default function App() {
  const [stack, setStack] = useState<Route[]>([{ name: "home" }]);
  const [pendingQuestions, setPendingQuestions] = useState<
    Array<{ question: string; topic: string }>
  >([]);

  const { bookmarks, toggleBookmark, removeBookmark, hasBookmark } =
    useBookmarks();
  const { getCompanySignals, voteTransparent, voteResearch } =
    useCompanySignals(COMPANIES);

  const route = stack[stack.length - 1];
  const isTabRoute = TAB_ROUTES.includes(route.name);

  const go = useCallback((name: RouteName, params?: Record<string, unknown>) => {
    setStack((s) => [...s, { name, params }]);
  }, []);

  const back = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const setTab = useCallback((key: string) => {
    setStack([{ name: key as RouteName }]);
  }, []);

  const handleAskQuestionSubmit = (question: string, topic: string) => {
    setPendingQuestions((prev) => [...prev, { question, topic }]);
  };

  const currentRoute = route;
  const showTabBar = isTabRoute;
  const showBackButton = !isTabRoute;

  const renderContent = () => {
    switch (currentRoute.name) {
      case "home":
        return <HomeScreen onNavigate={(r) => go(r.name, r.params)} />;
      case "intro":
        return <IntroScreen onBack={back} />;
      case "knowledge-list":
        return (
          <KnowledgeListScreen
            articles={KNOWLEDGE_ARTICLES}
            onNavigate={(r) => go(r.name, r.params)}
            onBack={back}
          />
        );
      case "knowledge-detail": {
        const id = (currentRoute.params?.id as string) || "";
        const article = KNOWLEDGE_ARTICLES.find((a) => a.id === id);
        return (
          <KnowledgeDetailScreen
            article={article}
            isBookmarked={hasBookmark("knowledge", id)}
            onToggleBookmark={() =>
              article && toggleBookmark("knowledge", id, article.title)
            }
            onBack={back}
          />
        );
      }
      case "regulation-list":
        return (
          <RegulationListScreen
            docs={REGULATION_DOCS}
            onNavigate={(r) => go(r.name, r.params)}
          />
        );
      case "regulation-detail": {
        const id = (currentRoute.params?.id as string) || "";
        const doc = REGULATION_DOCS.find((d) => d.id === id);
        return <RegulationDetailScreen doc={doc} onBack={back} />;
      }
      case "company-list":
        return (
          <CompanyListScreen
            companies={COMPANIES}
            onNavigate={(r) => go(r.name, r.params)}
          />
        );
      case "company-detail": {
        const id = (currentRoute.params?.id as string) || "";
        const company = COMPANIES.find((c) => c.id === id);
        return (
          <CompanyDetailScreen
            company={company}
            getSignals={getCompanySignals}
            onVoteTransparent={voteTransparent}
            onVoteResearch={voteResearch}
            onBack={back}
          />
        );
      }
      case "qa-list":
        return (
          <QAListScreen
            items={QA_ITEMS}
            onNavigate={(r) => go(r.name, r.params)}
          />
        );
      case "qa-detail": {
        const id = (currentRoute.params?.id as string) || "";
        const item = QA_ITEMS.find((q) => q.id === id);
        return (
          <QADetailScreen
            item={item}
            isBookmarked={hasBookmark("qa", id)}
            onToggleBookmark={() =>
              item && toggleBookmark("qa", id, item.question)
            }
            onBack={back}
          />
        );
      }
      case "ask-question":
        return (
          <AskQuestionScreen
            onSubmit={handleAskQuestionSubmit}
            onBack={back}
          />
        );
      case "alert-list":
        return (
          <AlertListScreen
            alerts={ALERT_POSTS}
            onNavigate={(r) => go(r.name, r.params)}
          />
        );
      case "alert-detail": {
        const id = (currentRoute.params?.id as string) || "";
        const alert = ALERT_POSTS.find((a) => a.id === id);
        return (
          <AlertDetailScreen
            alert={alert}
            isBookmarked={hasBookmark("alert", id)}
            onToggleBookmark={() =>
              alert && toggleBookmark("alert", id, alert.title)
            }
            onBack={back}
          />
        );
      }
      case "news-list":
        return (
          <NewsListScreen
            news={NEWS_ITEMS}
            onNavigate={(r) => go(r.name, r.params)}
          />
        );
      case "news-detail": {
        const id = (currentRoute.params?.id as string) || "";
        const newsItem = NEWS_ITEMS.find((n) => n.id === id);
        return <NewsDetailScreen item={newsItem} onBack={back} />;
      }
      case "search":
        return (
          <SearchScreen
            initialQuery={(currentRoute.params?.query as string) || ""}
            knowledge={KNOWLEDGE_ARTICLES}
            regulations={REGULATION_DOCS}
            companies={COMPANIES}
            qa={QA_ITEMS}
            alerts={ALERT_POSTS}
            news={NEWS_ITEMS}
            onNavigate={(r) => go(r.name, r.params)}
          />
        );
      case "bookmarks":
        return (
          <BookmarksScreen
            bookmarks={bookmarks}
            onRemove={removeBookmark}
            onNavigate={(r) => go(r.name, r.params)}
          />
        );
      case "settings":
        return <SettingsScreen onNavigate={(r) => go(r.name, r.params)} />;
      case "privacy":
        return (
          <LegalScreen title="Privacy Policy" content={PRIVACY_CONTENT} />
        );
      case "terms":
        return <LegalScreen title="Terms of Use" content={TERMS_CONTENT} />;
      case "guidelines":
        return (
          <LegalScreen
            title="Community Guidelines"
            content={GUIDELINES_CONTENT}
          />
        );
      case "about":
        return <LegalScreen title="About App" content={ABOUT_CONTENT} />;
      default:
        return <HomeScreen onNavigate={(r) => go(r.name, r.params)} />;
    }
  };

  const activeTab = TAB_ROUTES.includes(currentRoute.name)
    ? currentRoute.name
    : "home";

  return (
    <SafeView>
      <View style={styles.container}>
        {showBackButton && (
          <View style={styles.header}>
            <BackButton onPress={back} />
          </View>
        )}
        <View style={styles.content}>{renderContent()}</View>
        {showTabBar && (
          <TabBar
            tabs={TABS}
            active={activeTab}
            onSelect={(key) => setTab(key)}
          />
        )}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  content: { flex: 1 },
});
