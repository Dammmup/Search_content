// src/UI/pages/SearchImage.js
import React, { useState } from 'react';
import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../BL/slices/imageSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/SearchImage.css'; // Импортируем CSS для анимации
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

const { Search } = Input;

export const SearchImage = () => {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.images);
  const [query, setQuery] = useState('');
  const [likedImages, setLikedImages] = useState({});
  const [isFlying, setIsFlying] = useState(null); // Для управления анимацией

  const onSearch = (value) => {
    setQuery(value);
    dispatch(fetchImages(value));
  };

  const handleLike = (imageId) => {
    setLikedImages((prev) => ({
      ...prev,
      [imageId]: !prev[imageId],
    }));
    setIsFlying(imageId); // Устанавливаем id изображения для анимации
    setTimeout(() => {
      setIsFlying(null);
    }, 1000); // Сбрасываем анимацию через 1 секунду
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
      <div className="results-container" style={{ marginTop: '20px' }}>
        {status === 'loading' ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Spin size="large" />
          </Flex>
        ) : error ? (
          <Alert message={error} type="error" />
        ) : images.length > 0 ? (
          <Row gutter={[16, 16]}>
            {images.map((image) => (
              <Col key={image.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className={`image-card ${likedImages[image.id] ? 'liked' : ''} ${isFlying === image.id ? 'fly-to-cart' : ''}`}
                  hoverable
                  style={{ marginBottom: 16 }}
                  cover={
                    <img
                      alt={image.alt_description}
                      src={image.urls.small}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta title={image.alt_description} />
                  <Button
                    icon={likedImages[image.id] ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => handleLike(image.id)}
                    style={{ display: 'block', marginTop: '10px' }}
                  >
                    {likedImages[image.id] ? 'Liked' : 'Лайк'}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div></div>
        )}
      </div>
      <footer >
<h5 style={{textAlign:'center'}}>Find us</h5>
<div style={{display:'flex',justifyContent:'space-around'}}>
<p> +7(747)8313398  </p>
<p> damir.-@mail.ru </p>
</div>
</footer>
    </div>
  );

  

};
