import React, { useState } from 'react';
import axios from 'axios';
import { Card, DatePicker, Input } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export const NumbersFact = () => {
  const [date, setDate] = useState(moment());
  const [mathNumber, setMathNumber] = useState('');
  const [triviaNumber, setTriviaNumber] = useState('');
  const [dateFact, setDateFact] = useState('');

  const handleDateChange = (date) => {
    setDate(date);
    fetchDateFact(date);
  };

  const handleMathInputChange = (e) => {
    setMathNumber(e.target.value);
    fetchMathFact(e.target.value);
  };

  const handleTriviaInputChange = (e) => {
    setTriviaNumber(e.target.value);
    fetchTriviaFact(e.target.value);
  };

  const fetchMathFact = async (number) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/math`);
      setDateFact('');
      setMathNumber(number);
      setTriviaNumber('');
      setDateFact(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const fetchTriviaFact = async (number) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${number}/trivia`);
      setDateFact('');
      setMathNumber('');
      setTriviaNumber(number);
      setDateFact(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const fetchDateFact = async (date) => {
    try {
      const response = await axios.get(`http://numbersapi.com/${date.format('MM/DD')}/date`);
      setMathNumber('');
      setTriviaNumber('');
      setDateFact(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Input
          type="number"
          placeholder="Введите число для Math"
          value={mathNumber}
          onChange={handleMathInputChange}
        />
        <Input
          type="number"
          placeholder="Введите число для Trivia"
          value={triviaNumber}
          onChange={handleTriviaInputChange}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <DatePicker onChange={handleDateChange} />
      </div>
      <Card style={{ marginTop: '20px' }}>
        <p>{dateFact}</p>
      </Card>
    </div>
  );
};

