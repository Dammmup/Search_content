import { Layout } from "antd"
import Buttons from "./UI/components/SearchBar"
import Cube from "./UI/components/Cube"
import React from 'react';
import { Footer } from "antd/es/layout/layout";
import './UI/pages/styles/Profile.css'; // Импортируем стили

export const MainPage = () => {
 
 const randomPositionAndColor = () => ({
    top: `${Math.random() * 80 + 10}vh`, 
    left: `${Math.random() * 80 + 10}vw`, 
    transform: `rotate(${Math.random() * 360}deg)`,
    backgroundColor: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
  });

  const randomCubes = () => Math.floor(Math.random() + 5);

  return (
    <>
      <header>
        <Buttons />
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100vh' }}  >
        <div>
          {[...Array(randomCubes())].map((_, index) => (
            <Cube key={index} style={{ ...randomPositionAndColor(), width: '100px', height: '100px' }} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '-45vh' }} className="profile-container">
          <h2 className='text'>Welcome to my project: Media content search service!</h2>
          <h3>In this project I demonstrate the use of public APIs, their combination and various interactions.</h3>
          <h3>For this project the following libraries were used: Redux, axios, ant design, react-router</h3>
          <h1>To start using this project, select one of the 5 buttons located above the text</h1>
        </div>
        <div>
          {[...Array(randomCubes())].map((_, index) => (
            <Cube key={index} style={{ ...randomPositionAndColor(), width: '100px', height: '100px' }} />
          ))}
        </div>
      </div>
      <Footer className="profile-footer">
          <h5 className="footer-title">Find us</h5>
          <div className="footer-contacts">
            <p>+7(747)8313398</p>
            <p>damir.-@mail.ru</p>
          </div>
        </Footer>
    </>
  );
};
