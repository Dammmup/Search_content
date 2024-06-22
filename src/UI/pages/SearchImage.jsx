// src/UI/pages/SearchImage.js
import React, { useState } from 'react';
import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, likeImage, unlikeImage } from '../../BL/slices/imageSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/SearchImage.css'; // Импортируем CSS для анимации
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

const { Search } = Input;

export const SearchImage = () => {
  const dispatch = useDispatch();
  const { images, status, error,likedImages } = useSelector((state) => state.images);
  const [query, setQuery] = useState('');
  const [isFlying, setIsFlying] = useState(null); // Для управления анимацией

  const onSearch = (value) => {
    setQuery(value);
    dispatch(fetchImages(value));
  };



  const handleLike = (image) => {
    setIsFlying(image);
    setTimeout(() => {
      setIsFlying(null);
    }, 1000);

    if (likedImages.some((likedimage) => likedimage.id === image.id)) {
      dispatch(unlikeImage(image));
    } else {
      dispatch(likeImage(image));
    }
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
            {images.map((result) => (
              <Col key={result.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className={`image-card ${likedImages.some((likedImage) => likeImage.id === result.id) ? 'liked' : ''} ${isFlying === result.id ? 'fly-to-cart' : ''}`}
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
                      likedImages.some((likedImage) => likedImage.id === result.id) ? (
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
