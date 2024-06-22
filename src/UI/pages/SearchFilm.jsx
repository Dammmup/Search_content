import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilms, likeFilm, unlikeFilm } from '../../BL/slices/filmSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/SearchFilm.css';
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

const { Search } = Input;

export const SearchFilm = () => {
  const dispatch = useDispatch();
  const { films, status, error, likedFilms } = useSelector((state) => state.films);
  const [isFlying, setIsFlying] = useState(null);

  const onSearch = (value) => {
    dispatch(fetchFilms(value));
  };

  const handleLike = (film) => {
    setIsFlying(film.id);
    setTimeout(() => {
      setIsFlying(null);
    }, 1000);

    if (likedFilms.some((likedFilm) => likedFilm.id === film.id)) {
      dispatch(unlikeFilm(film));
    } else {
      dispatch(likeFilm(film));
    }
  };

  const isValidFilm = (film) => {
    return film.name && film.poster && film.poster.url;
  };

  return (
    <>
      <Buttons />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Search
          placeholder="Введите название"
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
        ) : films.length > 0 ? (
          <Row gutter={[16, 16]}>
            {films.filter(isValidFilm).map((result) => (
              <Col key={result.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className={`film-card ${likedFilms.some((likedFilm) => likedFilm.id === result.id) ? 'liked' : ''}`}
                  hoverable
                  style={{ marginBottom: 16 }}
                  cover={
                    <img alt={result.name} src={result.poster.url} style={{ height: '300px', objectFit: 'cover' }} />
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
                  <Button
                    type="text"
                    icon={
                      likedFilms.some((likedFilm) => likedFilm.id === result.id) ? (
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
          <p style={{ textAlign: 'center' }}>Нет результатов</p>
        )}
      </div>
    </>
  );
};
