import React, { useState } from 'react';
import { Input, Card, Row, Col } from 'antd';
import axios from 'axios';

const { Search } = Input;
const { Meta } = Card;

export const SearchBook = () => {
  const [results, setResults] = useState([]);

  const onSearch = async (value) => {
    try {
      const response = await axios.get(`https://bookmate.ru/node-api/p-graphql/?query=${value}`);
      console.log("SUCCESS", response.data);
      setResults(response.data.data.search.books);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  return (
    <>
      <Search
        placeholder="Введите название книги"
        allowClear
        enterButton="Поиск"
        onSearch={onSearch}
      />
      <Row gutter={[16, 16]}>
        {results.map((book) => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              style={{ width: 200 }}
            >
              <Meta title={book.title} />
              <p>Автор: {book.authors.map(author => author.name).join(', ')}</p>
              <p>Дата выхода: {book.publishedAt}</p>
              <p>Популярность: {book.popularity}</p>
              {/* Добавьте другие параметры по вашему выбору */}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
