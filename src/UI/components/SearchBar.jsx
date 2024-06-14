import React, { useState } from 'react';
import { Space, Button, ConfigProvider, Empty } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { TinyColor } from '@ctrl/tinycolor';
import AuthModal from './AuthModal'; // Импортируем компонент
import { liked } from '../../BL/likedmedia';
import './searchbar.css';
import logo from './logo.png';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) => colors.map((color) => new TinyColor(color).darken(5).toString());

const Buttons = () => {
  const [showCategories, setShowCategories] = useState(true);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false); // Состояние для видимости модального окна
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние для авторизации пользователя

  const handleFavoritesClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalVisible(true);
    } else {
      setShowCategories(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAuthModalVisible(false); 
  };

  const handleCancel = () => {
    setIsAuthModalVisible(false);
  };

  return (
    <div className='posiciya'>
      <div className="elme">
        <img src={logo} alt="" style={{ width: 150 }} />
      </div>

      <Space>
        {showCategories    &&(
          <Space>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Link to="/movies">
                <Button type="primary" size="large">
                  Фильмы
                </Button>
              </Link>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Link to="/music">
                <Button type="primary" size="large">
                  Музыка
                </Button>
              </Link>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Link to="/image">
                <Button type="primary" size="large">
                  Картинки
                </Button>
              </Link>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Link to="/ram">
                <Button type="primary" size="large">
                  Рик и Морти
                </Button>
              </Link>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Link to="/numbers">
                <Button type="primary" size="large">
                  Интересная дата
                </Button>
              </Link>
            </ConfigProvider>
          </Space>
        )}
      </Space>

      <Button type="primary" shape="round" icon={<HeartOutlined />} onClick={handleFavoritesClick} ><Link to="/favorites"/></Button> 


        <Button type="primary" shape="round" icon={<UserOutlined />} onClick={handleFavoritesClick}><Link to="/profile"/></Button>
     

      <AuthModal
        visible={isAuthModalVisible}
        onLogin={handleLogin}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Buttons;
