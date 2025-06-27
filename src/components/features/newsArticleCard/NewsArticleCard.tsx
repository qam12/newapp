import React, { useState } from "react";
import { Card, Typography, Space } from "antd";
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
        <div className="flex justify-between mt-3">
          {source && (
            <Space>
              <FileTextOutlined />
              <Typography.Text className="text-gray-500">
                {source}
              </Typography.Text>
            </Space>
          )}
          {author && (
            <Space>
              <HighlightOutlined />
              <Typography.Text className="text-gray-500">
                {author}
              </Typography.Text>
            </Space>
          )}
        </div>

        {publishTime && (
          <Space>
            <ClockCircleOutlined />
            <Typography.Text className="text-gray-500">
              {publishTime}
            </Typography.Text>
          </Space>
        )}
      </div>
    </Card>
  );
};

export default NewsArticleCard;
