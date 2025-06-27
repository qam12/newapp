import React, { useCallback } from "react";
import { Button, Drawer, Space } from "antd";
import { FilterSelect } from "../filterSelect/FilterSelect";
import { useFeedFilter } from "../../../hooks/useFeedFilter";
import { useAppDispatch } from "../../../store/hooks";
import { setFilters, updateCategory } from "../../../store/slices/articleSlice";
import { CategoryEnum, FilterDrawerProps } from "../../../domain/types/types";
import { filterSections } from "../../../constant/FilterSchema";
import { hasActiveFilters } from "../../../utils/helpers";

const FilterDrawerComponent: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  onApplyFilter,
}) => {
  const dispatch = useAppDispatch();

  const { filters, updateFilter, clearFilters, getFilter, getFilterCount } =
    useFeedFilter(filterSections);

  const handleApply = useCallback(() => {
    const filtersData = {
      sources: getFilter("sources"),
      categories: getFilter("categories"),
      authors: getFilter("authors"),
    };

    if (hasActiveFilters(filtersData)) {
      dispatch(setFilters(filtersData));
      dispatch(updateCategory(CategoryEnum.MY_FEED));
      onApplyFilter?.(getFilterCount());
      onClose();
    }
  }, [dispatch, getFilter, onApplyFilter, getFilterCount, onClose]);

  const handleReset = useCallback(() => {
    clearFilters();
    dispatch(updateCategory(CategoryEnum.NEWS));
    onApplyFilter?.(0);
    onClose();
  }, [clearFilters, onApplyFilter, onClose, dispatch]);

  const renderFilterSections = () =>
    filterSections?.map((section) => (
      <FilterSelect
        key={section?.key}
        title={section?.title}
        options={section?.options}
        value={getFilter(section?.key)}
        onChange={(values) => updateFilter(section?.key, values)}
      />
    ));

  return (
    <Drawer
      title="Customize Feed"
      placement="right"
      open={open}
      onClose={onClose}
      destroyOnClose
      closable
      styles={{ content: { backgroundColor: "#ffffff" } }}
    >
      <Space direction="vertical" className="w-full" size="large">
        {renderFilterSections()}
      </Space>

      <div className="flex justify-between mt-8 space-x-4">
        <Button
          onClick={handleReset}
          className="w-1/2 text-gray-400 hover:text-black transition-colors"
        >
          Reset
        </Button>
        <Button
          type="primary"
          className="w-1/2 bg-black text-white hover:bg-neutral-800 px-8"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </Drawer>
  );
};

export default React.memo(FilterDrawerComponent);
