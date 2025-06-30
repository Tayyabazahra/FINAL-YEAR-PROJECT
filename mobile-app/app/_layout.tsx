import React from "react";
import { Stack } from "expo-router";
import { View, ActivityIndicator, I18nManager } from "react-native";
import "./globals.css";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

// Prevent the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function AppContent() {
  const { language, messages } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Handle RTL layout
  useEffect(() => {
    const isRTL = language === "ur";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      // Reload the app to apply RTL changes
      // Note: In a real app, you might want to show a dialog asking the user to restart
      // the app for the changes to take effect
    }
  }, [language]);

  // Load fonts
  const [fontsLoaded] = useFonts({
    JostLight: require("@/assets/fonts/jost/static/Jost-Light.ttf"),
    Jost: require("@/assets/fonts/jost/static/Jost-Regular.ttf"),
    JostMedium: require("@/assets/fonts/jost/static/Jost-Medium.ttf"),
    JostBold: require("@/assets/fonts/jost/static/Jost-Bold.ttf"),
    JakartaLight: require("@/assets/fonts/plus-jakarta-sans/static/PlusJakartaSans-Light.ttf"),
    Jakarta: require("@/assets/fonts/plus-jakarta-sans/static/PlusJakartaSans-Regular.ttf"),
    JakartaMedium: require("@/assets/fonts/plus-jakarta-sans/static/PlusJakartaSans-Medium.ttf"),
    JakartaSemibold: require("@/assets/fonts/plus-jakarta-sans/static/PlusJakartaSans-SemiBold.ttf"),
    JakartaBold: require("@/assets/fonts/plus-jakarta-sans/static/PlusJakartaSans-Bold.ttf"),
  });

  // Check authentication on startup
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        setIsAuthenticated(!!token); // Set to true if token exists
      } catch (error) {
        console.error("Error retrieving token:", error);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !loadingAuth) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loadingAuth]);

  // Show splash screen until fonts & auth check complete
  if (!fontsLoaded || loadingAuth) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <ActivityIndicator size="large" color="#84cc16" />
      </View>
    );
  }

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
              <>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
              </>
            ) : (
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            )}
          </Stack>
        </View>
        <Toast />
      </QueryClientProvider>
    </IntlProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
