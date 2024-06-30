export const accounts = [
  { username: 'user', password: 'password', name: 'User', createdAt: "2012-12-12" },
  { username: 'Damir', password: 'lolzik2281337', name: 'Damir', createdAt: "1987-12-23" },
];

export const getAccounts = () => {
  const savedAccounts = localStorage.getItem('accounts');
  return savedAccounts ? JSON.parse(savedAccounts) : accounts;
};

export const saveAccounts = (newAccounts) => {
  localStorage.setItem('accounts', JSON.stringify(newAccounts));
};

export const addUser = (newAccount) => {
  const existingAccounts = getAccounts();
  newAccount.createdAt = new Date().toISOString(); // Добавление даты создания в ISO формате
  existingAccounts.push(newAccount);
  saveAccounts(existingAccounts);
};

export const getCurrentUser = () => {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) return null;

  const accounts = getAccounts();
  return accounts.find(account => account.token === userToken);
};

export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('username');
};