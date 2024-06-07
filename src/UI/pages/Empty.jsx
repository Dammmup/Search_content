import { Link } from "react-router-dom";
import { Space, ConfigProvider, Button } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';

const colors1 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) => colors.map((color) => new TinyColor(color).darken(5).toString());

export const Empty = () => {
  return (
    <>
   
    <div className="wrapper cartPage">
    <div className="header">

      </div>
      <div className="wrappper">
        <div className="elme">
      <h1><b>Корзина пуста :С </b></h1></div>
      <div className="elme"><h3>Вероятней всего, вы не заказывали ещё ничего.
Для того, чтобы заказать что-то, перейди на главную страницу.</h3></div>

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
    </div>
    </>
  );
};
