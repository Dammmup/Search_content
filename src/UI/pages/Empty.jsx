import { Link } from "react-router-dom";
import { Space, ConfigProvider, Button, Typography, Layout } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import Buttons from "../components/SearchBar";

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const colors1 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) => colors.map((color) => new TinyColor(color).darken(5).toString());

export const Empty = () => {
  return (
    <>
      <Buttons />
      <Layout className="cartPage" style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
          <Title level={2}>Корзина пуста :С</Title>
        </Header>
        <Content style={{ padding: '0 50px', textAlign: 'center' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={4}>Вероятней всего, вы не заказывали ещё ничего.</Title>
            <Text>Для того, чтобы заказать что-то, перейди на главную страницу.</Text>
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
              <Link to="/">
                <Button type="primary" size="large">
                  Вернуться назад
                </Button>
              </Link>
            </ConfigProvider>
          </Space>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Title level={5}>Find us</Title>
          <Space direction="horizontal" size="large">
            <Text>+7(747)8313398</Text>
            <Text>damir.-@mail.ru</Text>
          </Space>
        </Footer>
      </Layout>
    </>
  );
};
