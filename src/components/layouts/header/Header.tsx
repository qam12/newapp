import React from "react";
import Logo from "../logo/Logo";
import SearchInput from "../searchInput/SearchInput";
import FilterControls from "../filterControls/filterControls";
import { CategoryEnum } from "../../../domain/types/types";

const Header: React.FC = () => {
  return (
    <header className="bg-white top-0 z-50 backdrop-blur-lg bg-opacity-90  shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
            <Logo/>
            <SearchInput />
            <FilterControls/>
        </div>
      </div>
    </header>
  );
};

export default Header;
