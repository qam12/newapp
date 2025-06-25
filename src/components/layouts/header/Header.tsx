import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white text-white sticky top-0 z-50 backdrop-blur-lg bg-opacity-90 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="text-3xl font-bold text-black font-serif"
          >
            News App
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
