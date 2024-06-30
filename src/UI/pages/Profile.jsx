/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, List, Button, Modal, Row, Col, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../../BL/userdb';
import Buttons from '../components/SearchBar';
import './styles/Profile.css';
import { BotomFooter } from '../components/BotomFooter';
import dinosaur2 from '../../assets/dinosaur2.png';

const { Title, Text } = Typography;
const { Countdown } = Statistic;


export const Profile = () => {
  const navigate = useNavigate();

  const films = useSelector((state) => state.films.films || []);
  const images = useSelector((state) => state.images.images || []);
  const tracks = useSelector((state) => state.music.tracks || []);
  const characters = useSelector((state) => state.rickAndMorty.characters || []);
  const facts = useSelector((state) => state.numbersFact.facts || []);

  const currentUser = getCurrentUser();
  const username = localStorage.getItem('username') || (currentUser ? currentUser.username : 'Guest');

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [countMedia, setCountMedia] = useState(0);
  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60 * 60 * 1 * 0.125 + 1000 * 30); // Время окончания сессии (пример)

  const accelerateTime = () => {
    // Функция для ускорения времени
    setDeadline(Date.now() + 1000 * 10); // Ускорение на 1 минуту (пример)
  };
  // Функция для подсчета избранных элементов
  const countFavorites = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.filter((item) => item.is_favorite).length;
  };

  // Использование useMemo для вычисления общего количества избранных элементов
  const totalFavorites = useMemo(() => {
    return (
      countFavorites(films) +
      countFavorites(images) +
      countFavorites(tracks) +
      countFavorites(characters) +
      countFavorites(facts)
    );
  }, [films, images, tracks, characters, facts]);



  useEffect(() => {
    setCountMedia(totalFavorites);
  }, [totalFavorites]);

  const handleLogout = () => {
    setIsLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    logout(); // Функция очистки данных сессии
    setIsLogoutModalVisible(false);
    localStorage.removeItem('username'); // Очистка username из localStorage
    navigate('/'); // Перенаправление на главную страницу
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  const onFinish = () => {
    // Действия при завершении времени сессии
    logout();
    localStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    if (!username) {
      navigate('/'); // Перенаправление на главную страницу, если нет username
    }
  }, [username, navigate]);

  const goals = useMemo(() => {
    const baseGoals = currentUser ? currentUser.goals || [] : [];
    if (!baseGoals.includes("Like 10 cards")) {
      return [...baseGoals, "Like 10 cards"];
    }
    return baseGoals;
  }, [currentUser]);

  const isGoalAchieved = countMedia >= 10;

  const updatedGoals = useMemo(() => {
    if (isGoalAchieved) {
      return goals.filter((goal) => goal !== "Like 10 cards");
    }
    return goals;
  }, [goals, isGoalAchieved]);

  const achievements = useMemo(() => {
    const baseAchievements = currentUser ? currentUser.achievements || [] : [];
    if (isGoalAchieved && !baseAchievements.includes("Like 10 cards")) {
      return [...baseAchievements, "Like 10 cards"];
    }
    return baseAchievements;
  }, [currentUser, isGoalAchieved]);

  return (
    <>
      <Buttons />
      <div className="profile-container">
        <Title className="profile-title">Welcome, {username || 'Guest'}</Title>
        <Title level={2} className="profile-search-count">
          Today's count of searching cards: {countMedia}
        </Title>

        <div className="profile-section" style={{ display: 'flex', justifyContent: 'center' }}>
        <Title level={2} className="profile-subtitle">
          Account Created: {currentUser ? new Date(currentUser.createdAt).toLocaleDateString() : 'Unknown'}
        </Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Countdown title="Time before out of session" value={deadline} onFinish={onFinish} />
        </div>
        <Button onClick={accelerateTime} style={{ marginLeft: '10px' }}>
            Accelerate Time
          </Button>
        <div className="profile-section">
          <Text strong className="profile-subtitle">
            Goals:
          </Text>
          <List
            size="small"
            dataSource={updatedGoals}
            renderItem={(goal) => (
              <List.Item>
                {goal === "Like 10 cards" ? (
                  <Row align="middle">
                    <Col>
                      <img
                        src={dinosaur2}
                        alt="dinosaur"
                        className={isGoalAchieved ? "achievement-dinosaur" : "goal-dinosaur"}
                      />
                    </Col>
                    <Col>
                      <Text>{goal}</Text>
                    </Col>
                  </Row>
                ) : (
                  <Text>{goal}</Text>
                )}
              </List.Item>
            )}
          />
        </div>

        <div className="profile-section">
          <Text strong className="profile-subtitle">
            Achievements:
          </Text>
          <List
            size="small"
            dataSource={achievements}
            renderItem={(achievement) => (
              <List.Item>
                {achievement === "Like 10 cards" ? (
                  <Row align="middle">
                    <Col>
                      <img src={dinosaur2} alt="dinosaur" className="achievement-dinosaur" />
                    </Col>
                    <Col>
                      <Text>{achievement}</Text>
                    </Col>
                  </Row>
                ) : (
                  <Text>{achievement}</Text>
                )}
              </List.Item>
            )}
          />
        </div>

       
      </div>
      <BotomFooter />
      <Button type="primary" onClick={handleLogout} className="logout-button">
        Logout
      </Button>

      <Modal
        title="Confirm Logout"
        visible={isLogoutModalVisible}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default Profile;