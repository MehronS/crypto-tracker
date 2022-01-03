import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();

  const allStats = data?.data?.stats;

  if (isFetching) return `Loading...`;

  console.log(data);
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={allStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={allStats.totalExchanges} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={allStats.totalMarketCap} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 Hour Volume"
            value={allStats.total24hVolume}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={allStats.totalMarkets} />
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
