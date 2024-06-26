// src/UI/pages/RickAndMorty.js
import React, { useState } from 'react';
import { Input, Card, Row, Col, Button, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters,likeCharacter } from '../../BL/slices/rickAndMortySlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import './styles/Profile.css'; // Импортируем стили

const { Search } = Input;
const { Meta } = Card;

export const RickAndMorty = () => {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector((state) => state.rickAndMorty);

  const onSearch = (value) => {
    dispatch(fetchCharacters(value));
  };

  const handleLike = (character) => {
      dispatch(likeCharacter(character));
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
          style={{ width: 300}}
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
        ) : characters.length > 0 ? (
          <Row gutter={[16, 16]}>
            {characters.map((character) => (
              <Col key={character.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  className={`character-card ${characters.some((likedCharacter) => likedCharacter.id === character.id) ? 'liked' : ''}`}
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
                    type="text"
                    icon={
                      character.is_favorite 
                        ?
                        <HeartFilled style={{ color: 'red' }} />
                        :
                        <HeartOutlined />
                    }
                    onClick={() => handleLike(character)}
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
    </>
  );


};
