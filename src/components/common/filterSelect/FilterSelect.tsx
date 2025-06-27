import React from "react";
import { Select, Typography } from "antd";
import { DropDownOptions, FilterSelectProps } from "../../../domain/types/types";

const { Text } = Typography;

export const FilterSelect: React.FC<FilterSelectProps> = React.memo(
  ({ title, options, value, onChange }) => (
    <div>
      <Text strong className="text-gray-300 mb-2 block">
        {title}
      </Text>
      <Select
        mode="multiple"
        style={{
          width: "100%",
        }}
        placeholder={"select option"}
        options={options}
        value={value}
        onChange={(values) => onChange(values as string[])}
        maxTagCount="responsive"
        className="custom-select"
      />
    </div>
  )
);
