/* eslint-disable react/prop-types */
import "./GlowButton.css"; // Import your CSS file
import { LogInIcon } from "lucide-react";

const GlowButton = ({ onClick, children }) => {
  return (
    <button className="glow-on-hover" onClick={onClick}>
      <div className="flex items-center justify-center font-semibold">
        <LogInIcon className="mr-2 h-4 w-4 text-white" />
        {children}
      </div>
    </button>
  );
};

export default GlowButton;
