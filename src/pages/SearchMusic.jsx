import React, { useState } from 'react';
import axios from 'axios';
import { Input, Card, Row, Col } from 'antd';

const { Search } = Input;

const LASTFM_API_KEY = '32dab453b4d88bc3d5177cfeeaa68aaf';

export const SearchMusic = () => {
  const [results, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const onSearch = async (value) => {
    try {
      const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'track.search',
          track: value,
          api_key: LASTFM_API_KEY,
          format: 'json'
        }
      });
      console.log("SUCCESS", response.data);

      if (response.data.results && response.data.results.trackmatches && response.data.results.trackmatches.track) {
        setSearchResults(response.data.results.trackmatches.track);
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
        placeholder="Введите название трека"
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
              <Col key={result.mbid} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ marginBottom: 16 }}
                  cover={
                    result.image && result.image[2] && result.image[2]['#text'] ? (
                      <img alt={result.name} src={result.image[2]['#text']} style={{ height: '200px', objectFit: 'cover' }} />
                    ) : null
                  }
                >
                  <Card.Meta 
                    title={result.name} 
                    description={result.artist} 
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
