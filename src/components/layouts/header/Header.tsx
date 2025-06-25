import React from "react";
import Logo from "../logo/Logo";
import NavigationMenu from "../navigation/Navigation";
import SearchInput from "../searchInput/SearchInput";

const Header: React.FC = () => {
  return (
    <header className="bg-white sticky top-0 z-50 backdrop-blur-lg bg-opacity-90 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
          
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Logo />
          </div>
          
          {/* Navigation Menu */}
          <div className="flex justify-center mt-3 md:mt-0">
            <NavigationMenu />
          </div>
          
          {/* Search Bar */}
          <div className="flex justify-center mt-3 md:mt-0">
            <SearchInput />
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
