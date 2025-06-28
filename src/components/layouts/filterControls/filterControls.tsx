import React, { useState } from "react";
import FilterButton from "../../common/filterButton/FilterButton";
import FilterDrawerComponent from "../../common/filterDrawerComponent/FilterDrawerComponent";

const FilterControls: React.FC = () => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <>
      <FilterButton
        activeFilterCount={activeFilterCount}
        onClick={() => setIsFilterDrawerOpen(true)}
      />
      <FilterDrawerComponent
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onApplyFilter={(count) => {
          setActiveFilterCount(count);
        }}
      />
    </>
  );
};

export default FilterControls;
