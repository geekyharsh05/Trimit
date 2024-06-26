/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="flex flex-col items-center justify-center space-y-4 text-center"
  >
    {icon}
    <div className="space-y-1">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  </motion.div>
);

export default FeatureCard;
