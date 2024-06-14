// src/components/AuthModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Input, Alert } from 'antd';

const AuthModal = ({ visible, onLogin, onCancel }) => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = (values) => {
    // Простая проверка для демонстрации
    if (values.username === 'user' && values.password === 'password') {
      onLogin();
    } else {
      setError('Неправильные имя пользователя или пароль');
    }
  };

  return (
    <Modal
      title={isLogin ? 'Вход' : 'Регистрация'}
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      {error && <Alert message={error} type="error" showIcon />}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Button type="link" onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: '10px' }}>
            {isLogin ? 'Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal;
