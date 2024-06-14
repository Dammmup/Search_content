import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilms } from '../../BL/slices/filmSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/SearchFilm.css';
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

const { Search } = Input;

export const SearchFilm = () => {
  const dispatch = useDispatch();
  const { films, status, error } = useSelector((state) => state.films);
  const [likedFilms, setLikedFilms] = useState({});
  const [isFlying, setIsFlying] = useState(null); 

  const onSearch = (value) => {
    dispatch(fetchFilms(value));
  };

  const handleLike = (filmId) => {
    setIsFlying(filmId); console.log(filmId)
    setTimeout(() => {
      setIsFlying(null);
    }, 1000); 
  
    setLikedFilms((prev) => ({
      ...prev,
      [filmId]: !prev[filmId]
    }));
  }

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
            {films.map((result) => (
              <Col key={result.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className={`film-card ${likedFilms[result.id] ? 'liked' : ''}  ${isFlying === result.id ? 'fly-to-cart' : ''}`}
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
                  <Button
                    icon={likedFilms[result.id] ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => handleLike(result.id)}
                    style={{ display: 'block', marginTop: '10px' }}
                  >
                    {likedFilms[result.id] ? 'Liked' : 'Лайк'}
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
    </>
  );

  

};
