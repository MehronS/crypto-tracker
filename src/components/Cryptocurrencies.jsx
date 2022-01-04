import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchValue, setSearchValue] = useState(``);

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptoList, searchValue]);

  if (isFetching) return `Loading...`;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="cryptos-card-container">
        {cryptos?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={coin.iconUrl}
                    alt="crypto"
                  />
                }
                hoverable
              >
                <p>Price: {`$${millify(coin.price)}`}</p>
                <p>Market Cap: {`$${millify(coin.marketCap)}`}</p>
                <p>Daily Change: {`$${millify(coin.change)}%`}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
