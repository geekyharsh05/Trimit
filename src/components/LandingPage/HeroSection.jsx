/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

const HeroSection = ({ handleShorten, longUrl, setLongUrl }) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="space-y-2 ">
            <h1 className="my-6 text-4xl sm:text-5xl md:text-7xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-b dark:from-gray-200 dark:to-indigo-500 from-blue-600 to-purple-800 py-2 cursor-pointer ">
              Shorten Your Links, Expand Your Reach
            </h1>

            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto text-center">
              Our powerful URL shortener helps you create custom, branded links
              that are easy to share and track.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto">
            <form
              className="flex flex-col md:flex-row md:items-center md:space-x-4"
              onSubmit={handleShorten}
            >
              <div className="flex w-full rounded-2xl overflow-hidden border border-gray-300 focus-within:border-sky-400 focus-within:ring-1 focus-within:ring-sky-400">
                <Input
                  type="url"
                  placeholder="Enter Your URL"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="flex-1 py-3 px-4 md:py-2 md:px-3 border-none focus:outline-none"
                />
                <Button
                  type="submit"
                  className="py-3 px-4 bg-sky-400 text-black hover:bg-sky-600 hover:text-black border-none rounded-l-none flex items-center"
                  variant="outline"
                >
                  <Link className="mr-2" size={18} />
                  Shorten URL
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
