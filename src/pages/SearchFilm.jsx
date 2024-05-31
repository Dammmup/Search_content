import { Input, Card, Row, Col } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

const { Search } = Input;

export const SearchFilm = () => {
  const [results, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const onSearch = async (value) => {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/search?query=${value}`, {
        headers: {
          'X-API-KEY': 'TVNGA92-EXWMKR4-N35G404-MPWWSHX'
        }
      });
      console.log("SUCCESS", response.data);

      if (response.data && Array.isArray(response.data.docs)) {
        setSearchResults(response.data.docs);
        setError(null);
      } else {
        setSearchResults([]);
        setError('No results found');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      setError('Error fetching data');
    }
  };

  return (
    <>
      <Search
        placeholder="Введите название"
        allowClear
        enterButton="Поиск"
        style={{ width: 300 }}
        onSearch={onSearch}
      />
      <div className="results-container" style={{ marginTop: '20px' }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {results.length > 0 ? (
          <Row gutter={[16, 16]}>
            {results.map((result) => (
              <Col key={result.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ marginBottom: 16 }}
                  cover={
                    result.poster && result.poster.url ? (
                      <img alt={result.name} src={result.poster.url} style={{ height: '300px', objectFit: 'cover' }} />
                    ) : null
                  }
                >
                  <Card.Meta 
                    title={result.name} 
                    description={
                      <>
                        {result.year && <p><strong>Год:</strong> {result.year}</p>}
                        {result.description && <p><strong>Описание:</strong> {result.description}</p>}
                        {result.rating && result.rating.kp && <p><strong>Рейтинг КиноПоиск:</strong> {result.rating.kp}</p>}
                        {result.rating && result.rating.imdb && <p><strong>Рейтинг IMDb:</strong> {result.rating.imdb}</p>}
                      </>
                    } 
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          !error && <div>No results found</div>
        )}
      </div>
    </>
  );
};
