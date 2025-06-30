import { motion } from "framer-motion";

export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full  overflow-hidden">
      <div className="w-full bg-neutral-50 py-3 px-4 h-6">
        {/* <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse"></div> */}
      </div>

      <div className="w-full ">
        {[...Array(rows)].map((_, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex w-full p-4 space-x-4 border-b border-neutral-200"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {[...Array(columns)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-7 w-full bg-neutral-200 rounded animate-pulse"
              ></div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
