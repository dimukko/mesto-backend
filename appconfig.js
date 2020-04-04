// Настройки приложения
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/mestodb';
const JWT_SECRET = process.env.JWT_SECRET || 'ABRAKAdDDaaabRAA';
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'develop';

module.exports = {
  MONGODB_URL,
  JWT_SECRET,
  PORT,
  NODE_ENV,
};
