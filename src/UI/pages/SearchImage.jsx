import React, { useState } from 'react';
import axios from 'axios';
import { Input, Card, Row, Col, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import './styles/SearchImage.css'; // Импортируем CSS для анимации

const { Search } = Input;

export const SearchImage = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isFlying, setIsFlying] = useState(null); // Для управления анимацией

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=3CQ-Y7JZ_hSuDcAC4OsLJm5hbIJ4u5WFlcLQ9f3rYok`);
      setImages(response.data.results);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLike = (imageId) => {
    setIsFlying(imageId); // Установить id изображения для анимации
    setTimeout(() => {
      setIsFlying(null);
      // Здесь можно добавить код для добавления изображения в корзину
    }, 1000); // Длительность анимации должна совпадать с CSS
  };

  return (
    <div>
      <Search
        placeholder="Введите запрос"
        enterButton="Поиск"
        size="large"
        value={query}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <Row gutter={[16, 16]}>
        {images.map((image) => (
          <Col key={image.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className={`image-card ${isFlying === image.id ? 'fly-to-cart' : ''}`}
              hoverable
              style={{ marginBottom: 16 }}
              cover={<img alt={image.alt_description} src={image.urls.small} style={{ height: '200px', objectFit: 'cover' }} />}
            >
              <Card.Meta title={image.alt_description} />
              <Button
                icon={<HeartOutlined />}
                onClick={() => handleLike(image.id)}
                style={{ display: 'block', marginTop: '10px' }}
              >
                Лайк
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
