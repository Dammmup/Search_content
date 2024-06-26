// userdb.js

// Дефолтные пользователи
export const accounts = [
  { username: 'user', password: 'password', name: 'User' },
  { username: 'Damir', password: 'lolzik2281337', name: 'Damir' },
];

// Добавляем функцию для получения пользователей из localStorage
export const getAccounts = () => {
  const savedAccounts = localStorage.getItem('accounts');
  return savedAccounts ? JSON.parse(savedAccounts) : accounts;
};

// Добавляем функцию для сохранения пользователей в localStorage
export const saveAccounts = (newAccounts) => {
  localStorage.setItem('accounts', JSON.stringify(newAccounts));
};

// Добавляем функцию для регистрации новых пользователей
export const addUser = (newAccount) => {
  const existingAccounts = getAccounts();
  existingAccounts.push(newAccount);
  saveAccounts(existingAccounts);
};
