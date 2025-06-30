import { Link } from "react-router-dom";
import ROUTES from "../../../../../../constants/routes";
import { Logo } from "../../../../../../assets/svgAssets";
import { motion } from "framer-motion";

export const LogoLink = ({ isExpanded = true }) => {
  return (
    <Link to={ROUTES.HOME}>
      <motion.span
        className="text-primary-text"
        animate={{
          width: isExpanded ? "auto" : "32px",
          margin: isExpanded ? "0" : "0 auto",
        }}
        transition={{ duration: 0.2 }}
      >
        <Logo />
      </motion.span>
    </Link>
  );
};
