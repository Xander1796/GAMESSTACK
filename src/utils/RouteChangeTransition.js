import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";

const RouteChangeTransition = ({ children }) => {
  const uniqueId = uuid();

  return (
    <motion.div
      key={uniqueId}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 5 }}
    >
      {children}
    </motion.div>
  );
};

export default RouteChangeTransition;
