// src/UI/pages/RickAndMorty.js
import React, { useState } from 'react';
import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../BL/slices/rickAndMortySlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/RickAndMorty.css'; 
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

const { Search } = Input;
const { Meta } = Card;

export const RickAndMorty = () => {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector((state) => state.rickAndMorty);
  const [isFlying, setIsFlying] = useState(null);
  const [liked, setLiked] = useState({});

  const onSearch = (value) => {
    dispatch(fetchCharacters(value));
  };

  const handleLike = (characterId) => {
    setLiked((prev) => ({
      ...prev,
      [characterId]: !prev[characterId],
    }));
    setIsFlying(characterId);
    setTimeout(() => {
      setIsFlying(null);
    }, 1000);
  };

  return (
    <>
      <Buttons />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Search
          placeholder="Введите имя персонажа"
          allowClear
          enterButton="Поиск"
          onSearch={onSearch}
          style={{ width: 300, textAlign: 'center' }}
        />
      </div>
      <div className="results-container" style={{ marginTop: '20px' }}>
        {status === 'loading' ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Spin size="large" />
          </Flex>
        ) : error ? (
          <Alert message={error} type="error" />
        ) : characters.length > 0 ? (
          <Row gutter={[16, 16]}>
            {characters.map((character) => (
              <Col key={character.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  className={`character-card ${isFlying === character.id ? 'fly-to-cart' : ''}`}
                  hoverable
                  style={{ width: 200 }}
                  cover={<img alt={character.name} src={character.image} />}
                >
                  <Meta title={character.name} />
                  <p>Статус: {character.status}</p>
                  <p>Вид: {character.species}</p>
                  <p>Пол: {character.gender}</p>
                  <p>Место происхождения: {character.origin.name}</p>
                  <p>Местоположение: {character.location.name}</p>
                  <Button
                    icon={liked[character.id] ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => handleLike(character.id)}
                    style={{ display: 'block', marginTop: '10px' }}
                  >
                    {liked[character.id] ? 'Liked' : 'Лайк'}
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
