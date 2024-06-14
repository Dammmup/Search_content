// src/UI/pages/NumbersFact.js
import React, { useState } from 'react';
import { Button, Card, DatePicker, Input, Alert, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMathFact, fetchTriviaFact, fetchDateFact } from '../../BL/slices/numbersFactSlice';

import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/NumbersFact.css'; 
import Buttons from '../components/SearchBar';
import { Flex } from 'antd';

export const NumbersFact = () => {
  const dispatch = useDispatch();
  const { fact, status, error } = useSelector((state) => state.numbersFact);
  const [date, setDate] = useState(null);
  const [mathNumber, setMathNumber] = useState('');
  const [triviaNumber, setTriviaNumber] = useState('');
  const [liked, setLiked] = useState(false);

  const handleDateChange = (date) => {
    setDate(date);
    if (date) {
      dispatch(fetchDateFact(date.format('M/D')));
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

  const handleSearch = () => {
    if (mathNumber) {
      dispatch(fetchMathFact(mathNumber));
    } else if (triviaNumber) {
      dispatch(fetchTriviaFact(triviaNumber));
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <Buttons />
      <div style={{ marginBottom: '10px', display:'flex',flexDirection:'column',alignContent:'center',justifyContent:'space-between',alignItems:'center'}}>
        <Input
          type="number"
          placeholder="Введите число для Math"
          value={mathNumber}
          onChange={handleMathInputChange}
          onPressEnter={handleSearch}
          style={{ marginBottom: '10px', width: 300 }}
        />
        <Input
          type="number"
          placeholder="Введите число для Trivia"
          value={triviaNumber}
          onChange={handleTriviaInputChange}
          onPressEnter={handleSearch}
          style={{ width: 300 }}
        />
        <div style={{ marginBottom: '10px', marginTop:'10px' }}>
          <DatePicker onChange={handleDateChange} disabledDate={(current) => current && current > moment().endOf('day')} />
        </div>
      </div>
      <div className="results-container" style={{ marginTop: '20px' }}>
        {status === 'loading' ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Spin size="large" />
          </Flex>
        ) : error ? (
          <Alert message={error} type="error" />
        ) : fact ? (
          <Card className={`fact-card ${liked ? 'fly-to-cart' : ''}`} style={{ marginTop: '20px' }}>
            <p>{fact}</p>
            <Button
              icon={liked ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleLike}
              style={{ display: 'block', marginTop: '10px' }}
            >
              {liked ? 'Liked' : 'Лайк'}
            </Button>
          </Card>
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
