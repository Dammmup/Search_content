import React, { useState } from 'react';
import { Input, Card, Row, Col, Button } from 'antd';
import axios from 'axios';
import { HeartOutlined } from '@ant-design/icons';
import './styles/RickAndMorty.css'; // Импортируем CSS для анимации
import Buttons from '../components/SearchBar';

const { Search } = Input;
const { Meta } = Card;

export const RickAndMorty = () => {
  const [results, setResults] = useState([]);
  const [isFlying, setIsFlying] = useState(null); // Для управления анимацией

  const onSearch = async (value) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${value}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const handleLike = (characterId) => {
    setIsFlying(characterId); // Установить id персонажа для анимации
    setTimeout(() => {
      setIsFlying(null);
      // Здесь можно добавить код для добавления персонажа в корзину
    }, 1000); // Длительность анимации должна совпадать с CSS
  };

  return (
    <>
    <Buttons/>
    <div style={{textAlign:'center',marginTop: '10px'}}>
      <Search
        placeholder="Введите имя персонажа"
        allowClear
        enterButton="Поиск"
        onSearch={onSearch}
        style={{ width: 300,textAlign:'center' }}
      /></div>
      <Row gutter={[16, 16]}>
        {results.map((character) => (
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
                icon={<HeartOutlined />}
                onClick={() => handleLike(character.id)}
                style={{ display: 'block', marginTop: '10px' }}
              >
                Лайк
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
