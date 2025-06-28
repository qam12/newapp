import React from "react";
import Logo from "../logo/Logo";
import SearchInput from "../searchInput/SearchInput";
import FilterControls from "../filterControls/filterControls";

const Header: React.FC = () => {
  return (
    <header className="bg-white top-0 z-50 backdrop-blur-lg bg-opacity-90 shadow-md">
      <div className="container mx-auto px-4">
        <div className="py-4 flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div className="w-full flex justify-center md:justify-start">
            <Logo />
          </div>
          <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-end md:w-auto">
            <SearchInput />
            <FilterControls />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
