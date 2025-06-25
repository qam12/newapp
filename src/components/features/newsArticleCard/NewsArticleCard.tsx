import React from "react";
import { Card } from "antd";

const { Meta } = Card;

interface ArticleCardProps {
  title: string;
  imageUrl: string;
}

const NewsArticleCard: React.FC<ArticleCardProps> = ({ title, imageUrl }) => {
  return (
    <Card
      hoverable
      cover={<img alt={title} src={imageUrl} className="h-48 object-cover" />}
      className="bg-white max-w-sm rounded-lg overflow-hidden shadow-sm"
    >
      <Meta title={<span className="text-gray-800">{title}</span>} />
    </Card>
  );
};

export default NewsArticleCard;
