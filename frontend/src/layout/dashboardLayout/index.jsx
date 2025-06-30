import { Outlet } from "react-router-dom";

import { Sidebar, Tabs } from "./components";

export const DashborardLayout = () => {
  const selectedLanguage = localStorage.getItem("language");
  return (
    <main
      className={`flex bg-surface-2  relative h-screen w-full  gap-6 ${
        selectedLanguage === "ur" ? "lg:pr-6" : "lg:pl-6"
      }`}
    >
      <div className="hidden lg:block pt-6">
        <Sidebar />
      </div>
      <div className="flex-1 relative">
        <Outlet />
        {/* <Link
          to={ROUTES.HOME}
          className="lg:hidden size-12 flex items-center z-10 justify-center shadow-sm dark:shadow-none bg-blue-500 text-white rounded-full fixed bottom-[63px] right-4 sm:bottom-[107px] sm:right-8"
        >
          <PlusIcon />
        </Link> */}
      </div>
      <div className="fixed right-0 left-0 bottom-0 w-full lg:hidden">
        <Tabs />
      </div>
    </main>
  );
};
