import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState(`Cryptocurrency`);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 7 : 13,
  });
  const { data } = useGetCryptosQuery(100);

  const demoImage =
    "https://www.citypng.com/public/uploads/preview/-51614362984cgn3he2gom.png";

  if (isFetching) return `Loading...`;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value?.map((article, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {article.name}
                </Title>
                <img
                  src={article?.image?.thumbnail?.contentUrl || demoImage}
                  alt="iamge of news article"
                  style={{ maxWidth: `200px`, maxHeight: `100px` }}
                />
              </div>
              <p>
                {article.description > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      article.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news article"
                  />
                  <Text className="provider-name">
                    {article.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(article.datePublished).startOf(`ss`).fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
