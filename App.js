import React, { useEffect, useState } from "react";
import { View } from "react-native";

import SafeView from "./src/components/SafeView";

import HomeScreen from "./src/screens/HomeScreen";
import CompanyFormScreen from "./src/screens/CompanyFormScreen";
import CompanyListScreen from "./src/screens/CompanyListScreen";
import CaseStudyScreen from "./src/screens/CaseStudyScreen";
import CalculatorScreen from "./src/screens/CalculatorScreen";
import { theme } from "./src/styles/theme";
import { fetchCompanies, fetchCaseStudies, createCompany, deleteCompany } from "./src/api/client";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [companies, setCompanies] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);

  const navigateTo = (screen) => setCurrentScreen(screen);

  const loadCompanies = async () => {
    try {
      const items = await fetchCompanies();
      setCompanies(items);
    } catch (e) {
      console.warn("fetchCompanies error:", e?.message || e);
    }
  };

  const loadCaseStudies = async () => {
    try {
      const items = await fetchCaseStudies();
      setCaseStudies(items);
    } catch (e) {
      console.warn("fetchCaseStudies error:", e?.message || e);
    }
  };

  useEffect(() => {
    loadCompanies();
    loadCaseStudies();
  }, []);


  const addCompany = async (company) => {
    // Create on API, then refresh list
    await createCompany(company);
    await loadCompanies();
  };

  const addCaseStudy = (study) => {
    // Optional: keep local in case you want to add from UI later
    setCaseStudies((prev) => [...prev, { ...study, id: Date.now() }]);
  };

  return (
    <SafeView>
      <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
        {currentScreen === "home" && <HomeScreen navigateTo={navigateTo} />}

        {currentScreen === "company-form" && (
          <CompanyFormScreen navigateTo={navigateTo} addCompany={addCompany} />
        )}

        {currentScreen === "company-list" && (
          <CompanyListScreen navigateTo={navigateTo} companies={companies} onRefresh={loadCompanies} onDelete={async (id) => { await deleteCompany(id); await loadCompanies(); }} />
        )}

        {currentScreen === "case-study" && (
          <CaseStudyScreen
            navigateTo={navigateTo}
            caseStudies={caseStudies}
            addCaseStudy={addCaseStudy}
          />
        )}

        {currentScreen === "calculator" && (
          <CalculatorScreen navigateTo={navigateTo} />
        )}
      </View>
    </SafeView>
  );
}
