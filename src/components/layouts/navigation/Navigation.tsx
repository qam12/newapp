import React from "react";
import { CategoryEnum, NavigationMenuProps } from "../../../domain/types/types";
import { transformMenuText } from "../../../utils/helpers";
import { useAppSelector } from "../../../store/hooks";

const navigationItems = Object.values(CategoryEnum);

const NavigationMenu: React.FC<NavigationMenuProps> = ({ onChangeMenu }) => {
  const activeCategory = useAppSelector((state) => state.articles.category);

  const handleCategoryChange = (item: CategoryEnum): void => {
    onChangeMenu(item);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-lg bg-opacity-90 flex justify-center space-x-4 py-4 text-sm overflow-x-auto scrollbar-hide border-b">
      {navigationItems?.map((item) => {
        const isActive = activeCategory === item;

        return (
          <button
            key={item}
            onClick={() => handleCategoryChange(item)}
            className={`
              rounded px-3 py-2 whitespace-nowrap transition-colors
              ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-800 hover:bg-black hover:text-white"
              }
            `}
          >
            {transformMenuText(item)}
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
