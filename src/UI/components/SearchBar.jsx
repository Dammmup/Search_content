import React, { useState, useEffect } from 'react';
import { Space, Button, ConfigProvider } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { TinyColor } from '@ctrl/tinycolor';
import AuthModal from './AuthModal';
import './styles/searchbar.css';
import logo from './logo.png';
import { useSelector } from 'react-redux';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) => colors.map((color) => new TinyColor(color).darken(5).toString());

const Buttons = () => {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  const navigate = useNavigate();
  const { films, images, tracks, characters, facts } = useSelector((state) => ({
    films: Array.isArray(state.films) ? state.films.filter(film => film.is_favorite === true) : [],
    images: Array.isArray(state.images) ? state.images.filter(image => image.is_favorite === true) : [],
    tracks: Array.isArray(state.music) ? state.music.filter(track => track.is_favorite === true) : [],
    characters: Array.isArray(state.characters) ? state.characters.filter(character => character.is_favorite === true) : [],
    facts: Array.isArray(state.facts) ? state.facts.filter(fact => fact.is_favorite === true) : [],
  }));


  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsAuthenticated(true);
    }
    const modalShown = localStorage.getItem('modalShown');
    if (modalShown === 'true') {
      setIsAuthModalVisible(false);
    } else {
      setIsAuthModalVisible(true);
      localStorage.setItem('modalShown', 'true');
    }
  }, []);

  const handleFavoritesClick = () => {
    if (isAuthenticated) {
      setRedirectPath('/favorites');
      setIsAuthModalVisible(true);
    } else {
      if (films.length > 0 || images.length > 0 || tracks.length > 0 || characters.length > 0 || facts.length > 0) {
        navigate('/favorites');
      } else {
        navigate('/empty');
      }
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setRedirectPath('/profile');
      setIsAuthModalVisible(true);
    } else {
      navigate('/profile');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAuthModalVisible(false);
    localStorage.setItem('modalShown', 'true');
    if (redirectPath) {
      navigate(redirectPath === '/favorites' && (films.length === 0 && images.length === 0 && tracks.length === 0 && characters.length === 0 && facts.length === 0) ? '/empty' : redirectPath);
      setRedirectPath(null); // Сбрасываем путь после перенаправления
    }
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
                  colorPrimary: `linear-gradient(90deg, ${colors2.join(', ')})`,
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
                  colorPrimary: `linear-gradient(116deg, ${colors3.join(', ')})`,
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
      </Space>

      <Button type="primary" shape="round" icon={<HeartOutlined />} onClick={handleFavoritesClick} />
      <Button type="primary" shape="round" icon={<UserOutlined />} onClick={handleProfileClick} />

      <AuthModal
        visible={isAuthModalVisible}
        onLogin={handleLogin}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Buttons;
