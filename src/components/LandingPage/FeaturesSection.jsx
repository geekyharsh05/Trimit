/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { LinkIcon, InfoIcon, ShareIcon } from "lucide-react";
import FeatureCard from "../FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-muted rounded-xl border-2 border-indigo-600 shadow-indigo-xl">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-xl">
            Key Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Powerful URL Shortening
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Our URL shortener offers a range of features to help you manage and
            track your links, including custom URLs, advanced analytics, and
            social sharing.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto grid max-w-5xl items-center gap-6 py-8 lg:grid-cols-3 lg:gap-12" // Adjusted py-8 for reduced vertical padding
        >
          <FeatureCard
            icon={<LinkIcon className="h-12 w-12" />}
            title="Custom URLs"
          >
            Create custom, branded URLs that are easy to remember and share.
          </FeatureCard>
          <FeatureCard
            icon={<InfoIcon className="h-12 w-12" />}
            title="Advanced Analytics"
          >
            Track your link performance with detailed analytics and reporting.
          </FeatureCard>
          <FeatureCard
            icon={<ShareIcon className="h-12 w-12" />}
            title="Social Sharing"
          >
            Easily share your shortened links on social media and other
            platforms.
          </FeatureCard>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
