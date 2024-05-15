import React, { useState } from 'react';
import { Input, Card, Row, Col } from 'antd';
import axios from 'axios';

const { Search } = Input;
const { Meta } = Card;

export const RickAndMorty= () => {
  const [results, setResults] = useState([]);

  const onSearch = async (value) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${value}`);
      console.log("SUCCESS", response.data);
      setResults(response.data.results);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  return (
    <>
      <Search
        placeholder="Введите имя персонажа"
        allowClear
        enterButton="Поиск"
        onSearch={onSearch}
      />
      <Row gutter={[16, 16]}>
        {results.map((character) => (
          <Col key={character.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
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
              <p>Создан: {character.created}</p>
              {/* Добавьте другие параметры по вашему выбору */}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

