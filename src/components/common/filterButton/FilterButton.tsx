import React from "react";
import { Button, Badge } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { FilterButtonProps } from "../../../domain/types/types";

const FilterButton: React.FC<FilterButtonProps> = ({
  activeFilterCount,
  onClick,
}) => {
  const button = (
    <Button
      type="text"
      icon={<FilterOutlined />}
      onClick={onClick}
      className="border border-gray-400 text-black hover:border-black hover:text-black transition-colors"
    >
      Filters
    </Button>
  );

  return activeFilterCount > 0 ? (
    <Badge count={activeFilterCount} offset={[-4, 4]}>
      {button}
    </Badge>
  ) : (
    button
  );
};

export default FilterButton;
