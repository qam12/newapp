import React, { useState } from "react";
import { Input, Button, Badge } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { TopicType } from "../../../domain/types/types";


const navigationItems = Object.values(TopicType);

const NavigationMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(navigationItems[0]);

  return (
    <nav className="flex justify-center space-x-4 py-4 text-sm overflow-x-auto scrollbar-hide">
      {navigationItems?.map((item) => {
        const isActive = activeCategory === item;

        return (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`
              rounded px-3 py-2 whitespace-nowrap transition-colors
              ${isActive 
                ? "bg-black text-white" 
                : "text-gray-800 hover:bg-black hover:text-white"}
            `}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;