import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { IntlProvider } from "react-intl";
import en from "./translations/en.json";
import ur from "./translations/ur.json";

const queryClient = new QueryClient();

const messages = {
  en: en,
  ur: ur,
};

export const Root = () => {
  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem("language") || "en"
  );

  // Set initial language and direction on mount
  useEffect(() => {
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === "ur" ? "rtl" : "ltr";
  }, [currentLocale]);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail.language;
      setCurrentLocale(newLanguage);
      localStorage.setItem("language", newLanguage);
      document.documentElement.lang = newLanguage;
      document.documentElement.dir = newLanguage === "ur" ? "rtl" : "ltr";
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  return (
    <StrictMode>
      <IntlProvider messages={messages[currentLocale]} locale={currentLocale}>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster richColors position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </IntlProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
