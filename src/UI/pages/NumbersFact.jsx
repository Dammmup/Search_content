import React, { useState } from 'react';
import { Button, Card, Input, Alert, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMathFact, fetchTriviaFact, fetchDateFact, likeFact, unlikeFact } from '../../BL/slices/numbersFactSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './styles/NumbersFact.css';
import Buttons from '../components/SearchBar';
import { MonthDayPicker } from '../components/MonthDayPicker';

export const NumbersFact = () => {
  const dispatch = useDispatch();
  const { fact, status, error, likedFacts } = useSelector((state) => state.numbersFact);
  const [date, setDate] = useState(null);
  const [mathNumber, setMathNumber] = useState('');
  const [triviaNumber, setTriviaNumber] = useState('');
  const [isFlying, setIsFlying] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    if (date) {
      dispatch(fetchDateFact(date.format('M/D')));
    }
  };

  const handleMathInputChange = (e) => {
    setMathNumber(e.target.value);
    setTriviaNumber(''); // Очистить другое поле
  };

  const handleTriviaInputChange = (e) => {
    setTriviaNumber(e.target.value);
    setMathNumber(''); // Очистить другое поле
  };

  const handleSearch = () => {
    if (mathNumber) {
      dispatch(fetchMathFact(mathNumber));
    } else if (triviaNumber) {
      dispatch(fetchTriviaFact(triviaNumber));
    }
  };

  const handleLike = (fact) => {
    setIsFlying(fact.id);
    setTimeout(() => {
      setIsFlying(null);
    }, 1000);

    if (likedFacts.some((likedFact) => likedFact.id === fact.id)) {
      dispatch(unlikeFact(fact));
    } else {
      dispatch(likeFact(fact));
    }
  };

  return (
    <div>
      <Buttons />
      <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
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
        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
          <MonthDayPicker onChange={handleDateChange} />
        </div>
      </div>
      <div className="results-container" style={{ marginTop: '20px' }}>
        {status === 'loading' ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert message={error} type="error" />
        ) : fact ? (
          <Card 
            className={`fact-card ${likedFacts.some((likedFact) => likedFact.id === fact.id) ? 'liked' : ''}`}
            style={{ marginTop: '20px' }}
          >
            <p>{fact.text}</p>
            <Button
              type="text"
              icon={
                likedFacts.some((likedFact) => likedFact.id === fact.id) ? (
                  <HeartFilled style={{ color: 'red' }} />
                ) : (
                  <HeartOutlined />
                )
              }
              onClick={() => handleLike(fact)}
              className={isFlying === fact.id ? 'flying-heart' : ''}
            />
          </Card>
        ) : (
          <div></div>
        )}
      </div>
      <footer>
        <h5 style={{ textAlign: 'center' }}>Find us</h5>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p> +7(747)8313398 </p>
          <p> damir.-@mail.ru </p>
        </div>
      </footer>
    </div>
  );
};
