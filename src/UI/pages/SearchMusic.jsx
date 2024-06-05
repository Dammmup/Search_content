import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Card, Row, Col } from 'antd';

const { Search } = Input;

const CLIENT_ID = 'b3819ae69ef647abb1d892c56315085e';
const CLIENT_SECRET = '085247e350df45de93e700d04cd34231';

const getSpotifyToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
};

export const SearchMusic = () => {
  const [results, setSearchResults] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getSpotifyToken();
        setToken(token);
      } catch (error) {
        console.error('Error fetching Spotify token:', error);
        setError('Error fetching Spotify token');
      }
    };
    fetchToken();
  }, []);

  const onSearch = async (value) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          q: value,
          type: 'track'
        }
      });
      console.log('SUCCESS', response.data);

      if (response.data.tracks && response.data.tracks.items) {
        setSearchResults(response.data.tracks.items);
        setError(null);
      } else {
        setSearchResults([]);
        setError('No results found');
      }
    } catch (error) {
      console.error('Error fetching data from Spotify:', error);
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
              <Col key={result.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ marginBottom: 16 }}
                  cover={
                    result.album.images && result.album.images[0] ? (
                      <img alt={result.name} src={result.album.images[0].url} style={{ height: '200px', objectFit: 'cover' }} />
                    ) : null
                  }
                >
                  <Card.Meta 
                    title={result.name} 
                    description={result.artists.map(artist => artist.name).join(', ')} 
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
