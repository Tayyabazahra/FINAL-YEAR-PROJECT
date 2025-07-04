import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { useColorScheme as useTailwindColorScheme } from "nativewind";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const { setColorScheme } = useTailwindColorScheme();
  const [theme, setThemeState] = useState<ThemeType>("system");

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    const isDarkMode =
      theme === "system" ? systemColorScheme === "dark" : theme === "dark";

    setColorScheme(isDarkMode ? "dark" : "light");
  }, [theme, systemColorScheme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setThemeState(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const isDark =
    theme === "system" ? systemColorScheme === "dark" : theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
