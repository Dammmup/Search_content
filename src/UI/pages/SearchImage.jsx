// src/UI/pages/SearchImage.js
import React, { useState } from 'react';
import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, likeImage } from '../../BL/slices/imageSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import './styles/Profile.css'; // Импортируем стили

const { Search } = Input;

export const SearchImage = () => {
  const dispatch = useDispatch();
  const { images, status, error,likedImages } = useSelector((state) => state.images);
  const [query, setQuery] = useState('');

  const onSearch = (value) => {
    setQuery(value);
    dispatch(fetchImages(value));
  };

  const handleLike = (image) => {
    dispatch(likeImage(image));
};
  return (
    <div>
      <Buttons />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Search
          placeholder="Введите запрос"
          enterButton="Поиск"
          style={{ width: 300 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={onSearch}
        />
      </div>
      <div className="profile-container">
      <div className="results-container" style={{ marginTop: '20px' }}>
        {status === 'loading' ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Spin size="large" />
          </Flex>
        ) : error ? (
          <Alert message={error} type="error" />
        ) : images.length > 0 ? (
          <Row gutter={[16, 16]}>
            {images.map((result) => (
              <Col key={result.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className={`image-card ${images.some((likedImage) => likeImage.id === result.id) ? 'liked' : ''} `}
                  hoverable
                  style={{ marginBottom: 16 }}
                  cover={
                    <img
                      alt={result.alt_description}
                      src={result.urls.small}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta title={result.alt_description} />
                  <Button
                    type="text"
                    icon={
                      result.is_favorite 
                        ?
                        <HeartFilled style={{ color: 'red' }} />
                        :
                        <HeartOutlined />
                    }
                    onClick={() => handleLike(result)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div></div>
        )}
      </div>
      </div>
      <Footer className="profile-footer">
          <h5 className="footer-title">Find us</h5>
          <div className="footer-contacts">
            <p>+7(747)8313398</p>
            <p>damir.-@mail.ru</p>
          </div>
        </Footer>
    </div>
  );

  

};
