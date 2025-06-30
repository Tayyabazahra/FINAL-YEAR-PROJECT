import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import en from "../locales/en.json";
import ur from "../locales/ur.json";

type LanguageType = "en" | "ur";
type MessagesType = {
  [key in LanguageType]: typeof en;
};

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  messages: MessagesType;
}

const messages: MessagesType = { en, ur };
const deviceLocale = Localization.locale.split("-")[0] as LanguageType;
const defaultLanguage: LanguageType = messages[deviceLocale]
  ? deviceLocale
  : "en";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>(defaultLanguage);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        setLanguageState(savedLanguage as LanguageType);
      }
    } catch (error) {
      console.error("Error loading language:", error);
    }
  };

  const setLanguage = async (newLanguage: LanguageType) => {
    try {
      await AsyncStorage.setItem("language", newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
