import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useArticleSearch } from "../../../hooks/useArticleSearch";

const SearchInput: React.FC = () => {
  const { handleSearch } = useArticleSearch();

  return (
    <div className="flex items-center gap-4">
      <div className="w-72 md:w-96 flex items-center bg-white overflow-hidden rounded">
        <Input
          prefix={<SearchOutlined className="text-black" />}
          placeholder="Search news"
          onChange={(e) => handleSearch(e.target.value)}
          variant="filled"
          bordered={false}
          className="w-full h-full text-base"
        />
      </div>
    </div>
  );
};

export default SearchInput;
