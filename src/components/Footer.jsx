import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10 border-t border-gray-700">
      <div className="container mx-auto py-10 px-5 text-center">
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
