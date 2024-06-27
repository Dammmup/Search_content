import Title from "antd/es/typography/Title";
import React, { useState, useMemo } from "react";
import { useSelector } from 'react-redux';
import { Typography, Layout, List, Button, Modal } from 'antd';
import './styles/Profile.css';
import Buttons from "../components/SearchBar";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../BL/userdb';

const { Footer } = Layout;

export const Profile = () => {
  const navigate = useNavigate();

  // Получаем данные из глобального состояния
  const { films, images, tracks, characters, facts, user } = useSelector(state => ({
    films: state.films || [],
    images: state.images || [],
    tracks: state.music || [],
    characters: state.characters || [],
    facts: state.facts || [],
    user: state.user || {},
  }));

  const username = localStorage.getItem('username');

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  // Подсчет "избранных" элементов
  const countFavorites = (items) => {

    if (!Array.isArray(items)) return 0; // Убедимся, что items - массив
    return items.filter(item => item.is_favorite).length;
  };

  const totalFavorites = useMemo(() => (
    countFavorites(films) +
    countFavorites(images) +
    countFavorites(tracks) +
    countFavorites(characters) +
    countFavorites(facts)

  ), [films, images, tracks, characters, facts]);

  const handleLogout = () => {
    setIsLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutModalVisible(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <>
      <Buttons />
      <div className="profile-container">
        <Title className="profile-title">Welcome dear {username}</Title>
        <Typography.Title level={2} className="profile-search-count">
          Today the count of your search was {totalFavorites}
        </Typography.Title>
        <div className="profile-section">
          <Typography.Title level={2} className="profile-subtitle">
            Account Created: {user.createdAt || 'Unknown'}
          </Typography.Title>
        </div>
        <div className="profile-section">
          <Typography.Text strong className="profile-subtitle">Goals:</Typography.Text>
          <List
            size="small"
            dataSource={user.goals || []}
            renderItem={(goal) => <List.Item>{goal}</List.Item>}
          />
        </div>
        <div className="profile-section">
          <Typography.Text strong className="profile-subtitle">Achievements:</Typography.Text>
          <List
            size="small"
            dataSource={user.achievements || []}
            renderItem={(achievement) => <List.Item>{achievement}</List.Item>}
          />
        </div>
        <Footer className="profile-footer">
          <h5 className="footer-title">Find us</h5>
          <div className="footer-contacts">
            <p>+7(747)8313398</p>
            <p>damir.-@mail.ru</p>
          </div>
        </Footer>
      </div>
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
