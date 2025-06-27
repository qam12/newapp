import React from "react";
import { Row, Col, Button, Spin, Typography, Empty } from "antd";
import NewArticleCard from '../newsArticleCard/NewsArticleCard'; 
import { useArticles } from "../../../hooks/useArticles"; 
import { CategoryEnum, NewsCardListingProps } from "../../../domain/types/types";
import CardSkeletonLoading from "../../common/cardSkeletonLoading/CardSkeletonLoading";

const { Text } = Typography;

const NewsCardListing: React.FC<NewsCardListingProps> = ({ category }) => {
  const {
    articles,
    loading,
    categoryLoading,
    loadMore,
    hasMore,
    error,
  } = useArticles(category);

  if (categoryLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <CardSkeletonLoading/>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex justify-center items-center p-4">
        <Text type="danger">Error loading articles: {error}</Text>
      </div>
    );
  }

  if (!loading && articles.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No articles found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Row gutter={[16, 16]}>
        {articles?.map((article) => (
          <Col key={article.id} xs={24} sm={12} md={8} lg={6}>
            <NewArticleCard key={article?.id} {...article} />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button
            type="default"
            onClick={loadMore}
            disabled={loading}
            loading={loading}
            className="bg-black text-white border-black"
            >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsCardListing;