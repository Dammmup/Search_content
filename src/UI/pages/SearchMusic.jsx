// src/UI/pages/SearchMusic.js
import React, { useState } from 'react';
import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMusic } from '../../BL/slices/musicSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/SearchMusic.css'; // Импортируем CSS для анимации
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

const { Search } = Input;

export const SearchMusic = () => {
  const dispatch = useDispatch();
  const { tracks, status, error } = useSelector((state) => state.music);
  const [likedTracks, setLikedTracks] = useState({});
  const [isFlying, setIsFlying] = useState(null); // Для управления анимацией

  const onSearch = (value) => {
    dispatch(fetchMusic(value));
  };

  const handleLike = (trackId) => {
    setLikedTracks((prev) => ({
      ...prev,
      [trackId]: !prev[trackId],
    }));
    setIsFlying(trackId); // Устанавливаем id трека для анимации
    setTimeout(() => {
      setIsFlying(null);
    }, 1000); // Сбрасываем анимацию через 1 секунду
  };

  return (
    <>
      <Buttons />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Search
          placeholder="Введите название трека"
          allowClear
          enterButton="Поиск"
          style={{ width: 300 }}
          onSearch={onSearch}
        />
      </div>
      <div className="results-container" style={{ marginTop: '20px' }}>
        {status === 'loading' ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Spin size="large" />
          </Flex>
        ) : error ? (
          <Alert message={error} type="error" />
        ) : tracks.length > 0 ? (
          <Row gutter={[16, 16]}>
            {tracks.map((result) => (
              <Col key={result.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className={`track-card ${likedTracks[result.id] ? 'liked' : ''} ${isFlying === result.id ? 'fly-to-cart' : ''}`}
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
                  <Button
                    icon={likedTracks[result.id] ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => handleLike(result.id)}
                    style={{ display: 'block', marginTop: '10px' }}
                  >
                    {likedTracks[result.id] ? 'Liked' : 'Лайк'}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
