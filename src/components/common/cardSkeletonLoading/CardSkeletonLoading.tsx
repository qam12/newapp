import React from "react";
import { Card, Skeleton } from "antd";
import { NewsArticleCardSkeletonProps } from "../../../domain/types/types";


const CardSkeletonLoading: React.FC<NewsArticleCardSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {Array.from({ length: count }, (_, idx) => (
        <Card
          key={idx}
          className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col justify-between"
        >
          <div className="h-48 w-full bg-gray-200 rounded-t animate-pulse" />

          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <Skeleton.Button active size="small" style={{ width: 100 }} />
              <Skeleton.Button active size="small" style={{ width: 100 }} />
            </div>

            <Skeleton.Button active size="small" style={{ width: 100 }} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardSkeletonLoading;
