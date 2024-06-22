import React, { useState } from 'react';
import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMusic,likeTrack,unlikeTrack } from '../../BL/slices/musicSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/SearchMusic.css'; 
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

const { Search } = Input;

export const SearchMusic = () => {
  const dispatch = useDispatch();
  const { tracks, status, error,likedTracks } = useSelector((state) => state.music);
  const [isFlying, setIsFlying] = useState(null); 

  const onSearch = (value) => {
    dispatch(fetchMusic(value));
  };

  const handleLike = (track) => {
  
    setIsFlying(track); 
    setTimeout(() => {
      setIsFlying(null);
    }, 1000); 
    if (likedTracks.some((likedTrack) => likedTrack.id === track.id)) {
      dispatch(unlikeTrack(track));
    } else {
      dispatch(likeTrack(track));
    }
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
                  className={`track-card ${likedTracks.some((likedTrack) => likeTrack.id === result.id) ? 'liked' : ''}`}
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
                    type="text"
                    icon={
                      likedTracks.some((likedTrack) => likedTrack.id === result.id) ? (
                        <HeartFilled style={{ color: 'red' }} />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    onClick={() => handleLike(result)}
                    className={isFlying === result.id ? 'flying-heart' : ''}
                  />
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
