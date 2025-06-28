import React, { useState } from "react";
import { Card, Typography } from "antd";
import {
  HighlightOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import placholderImage from "../../../assets/placeholder.png";
import { ArticleCardProps } from "../../../domain/types/types";

const { Meta } = Card;

const NewsArticleCard: React.FC<ArticleCardProps> = ({
  title,
  imageUrl,
  source,
  author,
  publishTime,
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <Card
      hoverable
      cover={
        <img
          alt={title}
          src={imgSrc || placholderImage}
          onError={() => setImgSrc(placholderImage)}
          className="h-48 w-full object-cover"
        />
      }
      className="bg-white rounded-lg overflow-hidden shadow-sm"
    >
      <Meta title={title} />
      <div className="mt-3 space-y-2">
        {source && (
          <div className="flex items-center w-full">
            <FileTextOutlined className="mr-2" />
            <Typography.Text className="truncate w-full text-gray-500" title={source}>
              {source}
            </Typography.Text>
          </div>
        )}
        {author && (
          <div className="flex items-center w-full">
            <HighlightOutlined className="mr-2" />
            <Typography.Text className="truncate w-full text-gray-500" title={author}>
              {author}
            </Typography.Text>
          </div>
        )}
        {publishTime && (
          <div className="flex items-center w-full">
            <ClockCircleOutlined className="mr-2" />
            <Typography.Text className="truncate w-full text-gray-500" title={publishTime}>
              {publishTime}
            </Typography.Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NewsArticleCard;
