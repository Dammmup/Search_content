import React, { useState } from 'react';
import { Input, Space, Button, ConfigProvider } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { CategoryButtons } from './CategoryButtons';
import { Link } from 'react-router-dom';

import './searchbar.css';
import logo from './logo.png';


const SearchBar = () => {
  const [showCategories, setShowCategories] = useState(true); // Состояние для отображения/скрытия категорий
  const [showFavoritesButton, setShowFavoritesButton] = useState(true); // Состояние для отображения/скрытия кнопки "Избранное"



  const handleFavoritesClick = () => {
    setShowCategories(false); // При нажатии на кнопку "Избранное" скрываем категории
    setShowFavoritesButton(false); // Скрываем саму кнопку "Избранное"
  };

  return (
    <div className='posiciya'>
      <div className="elme"><img src={logo} alt="" style={{ width: 150 }} /></div>

     

      <Space>
        {showCategories && <CategoryButtons />} {/* Условное отображение категорий */}
      </Space>

      {showFavoritesButton && (
        <Link to="/favorites">
          <Button type="primary" shape="round" icon={<HeartOutlined />} onClick={handleFavoritesClick} />
        </Link>
      )}
    </div>
  );
};

export default SearchBar;
