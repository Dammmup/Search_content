import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, DatePicker, Input } from 'antd';
import moment from 'moment';
import { HeartOutlined } from '@ant-design/icons';
import './styles/NumbersFact.css'; 

export const NumbersFact = () => {
  const [date, setDate] = useState(null);
  const [mathNumber, setMathNumber] = useState('');
  const [triviaNumber, setTriviaNumber] = useState('');
  const [fact, setFact] = useState('');
  const [isFlying, setIsFlying] = useState(false);

  const handleDateChange = (date) => {
    setDate(date);
    if (date) {
      fetchDateFact(date);
    }
  };

  const handleMathInputChange = (e) => {
    setMathNumber(e.target.value);
    setTriviaNumber(''); // Clear the other field
  };

  const handleTriviaInputChange = (e) => {
    setTriviaNumber(e.target.value);
    setMathNumber(''); // Clear the other field
  };

  const fetchMathFact = async (number) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/math`);
      setFact(response.data);
    } catch (error) {
      console.error('Error fetching math fact:', error);
    }
  };

  const fetchTriviaFact = async (number) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/trivia`);
      setFact(response.data);
    } catch (error) {
      console.error('Error fetching trivia fact:', error);
    }
  };

  const fetchDateFact = async (date) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${date.format('M/D')}/date`);
      setFact(response.data);
    } catch (error) {
      console.error('Error fetching date fact:', error);
    }
  };

  const handleSearch = () => {
    if (mathNumber) {
      fetchMathFact(mathNumber);
    } else if (triviaNumber) {
      fetchTriviaFact(triviaNumber);
    }
  };

  const handleLike = () => {
    setIsFlying(true);
    setTimeout(() => {
      setIsFlying(false);
      // Здесь можно добавить код для добавления факта в корзину
    }, 1000); // Длительность анимации должна совпадать с CSS
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Input
          type="number"
          placeholder="Введите число для Math"
          value={mathNumber}
          onChange={handleMathInputChange}
          onPressEnter={handleSearch}
          style={{ marginBottom: '10px' }}
        />
        <Input
          type="number"
          placeholder="Введите число для Trivia"
          value={triviaNumber}
          onChange={handleTriviaInputChange}
          onPressEnter={handleSearch}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <DatePicker onChange={handleDateChange} disabledDate={(current) => current && current > moment().endOf('day')} />
      </div>
      {fact && (  // Conditional rendering of the fact card and like button
        <Card
          className={`fact-card ${isFlying ? 'fly-to-cart' : ''}`}
          style={{ marginTop: '20px' }}
        >
          <p>{fact}</p>
          <Button
            icon={<HeartOutlined />}
            onClick={handleLike}
            style={{ display: fact ? 'block' : 'none' }} // Like button is shown only if there is a fact
          >
            Лайк
          </Button>
        </Card>
      )}
    </div>
  );
};
