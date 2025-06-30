import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "../constants/routes";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
} from "../modules/public/auth";
import { DashborardLayout } from "../layout";
import { Dashboard, Detection, Doctors, History } from "../modules/private";
import { Settings } from "../modules/private/settings";
import {
  AccountSettings,
  ProfileSettings,
  ThemeSettings,
} from "../modules/private/settings/components";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { LanguageSettings } from "../modules/private/settings/components/language";
import { LandingPage } from "../modules/public/landingPage";

export const AppRouter = () => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    // Set the initial theme based on localStorage value
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail.language;
      setCurrentLanguage(newLanguage);
      // You can add any additional language change logic here
      // For example, updating document.documentElement.lang
      document.documentElement.lang = newLanguage;
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

        {/* Landing Page  */}
        <Route path={ROUTES.LANDING} element={<LandingPage />} />

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashborardLayout />
            </ProtectedRoute>
          }
        >
          <Route index replace element={<Navigate to={ROUTES.HOME} />} />
          <Route path={ROUTES.HOME} element={<Dashboard />} />
          <Route path={ROUTES.DETECT} element={<Detection />} />
          <Route path={ROUTES.DOCTORS} element={<Doctors />} />
          <Route path={ROUTES.HISTORY} element={<History />} />
          <Route path={"settings"} element={<Settings />} />
          <Route path={"settings/theme"} element={<ThemeSettings />} />
          <Route path={"settings/password"} element={<AccountSettings />} />
          <Route path={"settings/profile"} element={<ProfileSettings />} />
          <Route path={"settings/language"} element={<LanguageSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
