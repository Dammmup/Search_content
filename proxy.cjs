const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Проксируем запросы к Deezer API
app.use('/deezer', createProxyMiddleware({
  target: 'https://api.deezer.com',
  changeOrigin: true,
  pathRewrite: {
    '^/deezer': '',
  },
}));

// Слушаем порт 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}`);
});
