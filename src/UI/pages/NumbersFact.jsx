import React, { useState } from 'react';
import { Button, Card, Input, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMathFact, fetchTriviaFact, fetchDateFact, likeFact } from '../../BL/slices/numbersFactSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Buttons from '../components/SearchBar';
import { MonthDayPicker } from '../components/MonthDayPicker';
import { Footer } from 'antd/es/layout/layout';
import './styles/Profile.css'; // Импортируем стили

export const NumbersFact = () => {
  const dispatch = useDispatch();
  const { facts, status, error } = useSelector((state) => state.numbersFact);
  const [mathNumber, setMathNumber] = useState('');
  const [triviaNumber, setTriviaNumber] = useState('');

  const handleDateChange = (date) => {
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
    console.log('liked in React');
    dispatch(likeFact(fact));
  };

  const currentFact = facts.length ? facts[facts.length - 1] : null;

  return (
    <div>
      <Buttons />
      <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }} >
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
        <div className="profile-container">
          {status === 'loading' ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message={error} type="error" />
          ) : currentFact ? (
            <Card
              className={`fact-card ${currentFact.is_favorite ? 'liked' : ''}`}
              style={{ marginTop: '20px' }}
            >
              <p>{currentFact.text}</p>
              <Button
                type="text"
                icon={
                  currentFact.is_favorite ?
                    <HeartFilled style={{ color: 'red' }} /> :
                    <HeartOutlined />
                }
                onClick={() => handleLike(currentFact)}
              />
            </Card>
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
    </div>
  );
};
