/* eslint-disable react/prop-types */
import { LogInIcon } from "lucide-react";

const GlowButton = ({ onClick, children }) => {
  return (
    <>
      <style>{`
        @keyframes glowing {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
        .glow-on-hover:before {
          content: '';
          background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
          position: absolute;
          top: -2px;
          left: -2px;
          background-size: 400%;
          z-index: -1;
          filter: blur(5px);
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          animation: glowing 20s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          border-radius: 0.5rem;
        }
        .glow-on-hover:active {
          color: #000;
        }
        .glow-on-hover:active:after {
          background: transparent;
        }
        .glow-on-hover:hover:before {
          opacity: 1;
        }
        .glow-on-hover:after {
          z-index: -1;
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: #1a202c;
          left: 0;
          top: 0;
          border-radius: 0.5rem;
        }
      `}</style>
      <button
        className="relative z-0 inline-flex items-center justify-center w-36 h-10 px-3 bg-gray-800 text-white rounded-lg glow-on-hover"
        style={{
          position: "relative",
          zIndex: 0,
          width: "150px",
          height: "40px",
          border: "none",
          outline: "none",
          color: "#fff",
          background: "#1a202c",
          cursor: "pointer",
          borderRadius: "8px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 12px",
        }}
        onClick={onClick}
      >
        <div className="flex items-center justify-center font-semibold">
          <LogInIcon className="mr-2 h-4 w-4 text-white" />
          {children}
        </div>
      </button>
    </>
  );
};

export default GlowButton;
