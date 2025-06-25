import React from "react";
import { Row, Col } from "antd";
import NewArticleCard from '../newsArticleCard/NewsArticleCard'; 

const NewsCardListing: React.FC = () => {
  
  // Mock data
  const articles = [
    {
      title: "How to Build a Simple Ant Design Card",
      imageUrl: "https://picsum.photos/400/300",
    },
    {
      title: "Top 5 Tips for Tailwind Styling",
      imageUrl: "https://picsum.photos/400/301",
    },
    {
      title: "Mastering React State Management",
      imageUrl: "https://picsum.photos/400/302",
    },
    {
      title: "Modern Web Architecture Explained",
      imageUrl: "https://picsum.photos/400/303",
    },
    {
        title: "Top 5 Tips for Tailwind Styling",
        imageUrl: "https://picsum.photos/400/301",
      },
      {
        title: "Mastering React State Management",
        imageUrl: "https://picsum.photos/400/302",
      },
      {
        title: "Top 5 Tips for Tailwind Styling",
        imageUrl: "https://picsum.photos/400/301",
      },
      {
        title: "Mastering React State Management",
        imageUrl: "https://picsum.photos/400/302",
      },
      {
        title: "How to Build a Simple Ant Design Card",
        imageUrl: "https://picsum.photos/400/300",
      },
      {
        title: "Top 5 Tips for Tailwind Styling",
        imageUrl: "https://picsum.photos/400/301",
      },
  ];

  return (
    <div className="container mx-auto p-4">
      <Row gutter={[16, 16]}>
        {articles?.map((article, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <NewArticleCard title={article.title} imageUrl={article.imageUrl} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewsCardListing;
