import { SidebarExpand } from "../../../../assets/svgAssets";
import { Links } from "./components";
import { LogoLink } from "./components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 272 : 82 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className=" py-3 px-4 bg-surface-2 flex flex-col gap-4 "
    >
      <div
        className="cursor-pointer text-primary-text flex items-center justify-center"
        onClick={toggleSidebar}
      >
        <SidebarExpand />
      </div>

      <div className="py-4 flex items-center justify-center w-full">
        <LogoLink isExpanded={isExpanded} />
      </div>

      <Links isExpanded={isExpanded} />
    </motion.aside>
  );
};
