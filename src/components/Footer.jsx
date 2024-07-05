import { Link } from "react-router-dom";
import Github from "./Icons/Github";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10 border-t border-gray-700">
      <div className="container mx-auto py-7 px-5 text-center">
        <div className="flex items-center justify-center mb-3 p-t">
          <button
            onClick={() =>
              window.open("https://github.com/geekyharsh05/Trimit", "_blank")
            }
            type="button"
            className="flex items-center justify-center gap-x-2 rounded-full border border-slate-600 py-3 px-6 text-slate-100 transition transform hover:scale-105 hover:shadow-lg sm:w-auto font-extralight"
          >
            <Github className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="hidden sm:inline">Contribute Now!</span>
            <span className="inline sm:hidden">Contribute</span>
          </button>
        </div>
        <p>
          Made with ❤️ by{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-400">
            Trim It
          </Link>
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Trim It. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
