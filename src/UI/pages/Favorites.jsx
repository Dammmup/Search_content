import React from 'react';
import { Space, ConfigProvider, Button } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { Link } from 'react-router-dom';
import { VideoCameraOutlined,CustomerServiceOutlined,FileImageOutlined,TrophyFilled  } from '@ant-design/icons';
import './styles/Favorites.css'
import Buttons from '../components/SearchBar';
const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) => colors.map((color) => new TinyColor(color).darken(5).toString());

export const Favorites=()=>{
    return(<>
    <Buttons/>
    <div className='lol'>
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
    ><Link to="/">
      <Button type="primary" size="large">
        Вернуться назад
      </Button> </Link>
    </ConfigProvider>
    </div>
    <div className='kek'>
    <Space className='chep'>
    
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors3.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors3).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors3).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large" icon={<VideoCameraOutlined />}/>
         
    </ConfigProvider>
   
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(90deg,  ${colors1.join(', ')})`,
            colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors1).join(', ')})`,
            colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors1).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large" icon={<CustomerServiceOutlined />}>
    
      </Button>
    </ConfigProvider>


    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors2.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors2).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors2).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large" icon={<FileImageOutlined />}>

      </Button>
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
      <Button type="primary" size="large">
       <img src="data:image/png;base64,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" style={{width:30}}/>
      </Button>
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
      <Button type="primary" size="large" icon={<TrophyFilled />}>

      </Button>
    </ConfigProvider>

  </Space>
  </div>
  </>)
}