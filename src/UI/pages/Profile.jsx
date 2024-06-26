import Title from "antd/es/typography/Title";
import React, { useState } from "react"; // Импортируем useState
import { useSelector } from 'react-redux';
import { Typography, Layout, List, Button, Modal } from 'antd'; // Импортируем Modal из Ant Design
import './styles/Profile.css'; // Импортируем стили
import Buttons from "../components/SearchBar";
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для перенаправления

const { Footer } = Layout;

export const Profile = () => {
  const { likedFilms } = useSelector((state) => state.films || {});
  const { likedImages } = useSelector((state) => state.images || {});
  const { likedTracks } = useSelector((state) => state.music || {});
  const { likedCharacters } = useSelector((state) => state.characters || {});
  const { likedFacts } = useSelector((state) => state.facts || {});
  const { createdAt, goals, achievements } = useSelector((state) => state.user || {});
  const navigate = useNavigate(); // Инициализируем useNavigate

  const likedItems = React.useMemo(
    () => [
      ...(likedFilms || []), 
      ...(likedImages || []), 
      ...(likedTracks || []), 
      ...(likedCharacters || []), 
      ...(likedFacts || [])
    ],
    [likedFilms, likedImages, likedTracks, likedCharacters, likedFacts]
  );

  const username = localStorage.getItem('username'); 

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // Создаем состояние для отслеживания видимости модального окна выхода

  const handleLogout = () => {
    setIsLogoutModalVisible(true); // Показываем модальное окно при нажатии на кнопку выхода
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('username'); // Удаляем имя пользователя из localStorage
    setIsLogoutModalVisible(false); // Скрываем модальное окно
    navigate('/'); // Перенаправляем пользователя на страницу входа
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false); // Скрываем модальное окно при отмене
  };

  return (
    <>
      <Buttons/>
      <div className="profile-container">
        <Title className="profile-title">Welcome dear {username}</Title>
        <Typography.Title level={2} className="profile-search-count">
          Today the count of your search was {likedItems.length}
        </Typography.Title>
        <div className="profile-section">
          <Typography.Title level={2} className="profile-subtitle">
            Account Created:
          </Typography.Title>
        </div>

        <div className="profile-section">
          <Typography.Text strong className="profile-subtitle">Goals:</Typography.Text>
          <List
            size="small"
            dataSource={goals || []}
            renderItem={(goal) => <List.Item>{goal}</List.Item>}
          />
        </div>

        <div className="profile-section">
          <Typography.Text strong className="profile-subtitle">Achievements:</Typography.Text>
          <List
            size="small"
            dataSource={achievements || []}
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
      
      {/* Модальное окно для подтверждения выхода */}
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
