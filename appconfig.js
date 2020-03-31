// Настройки приложения
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/mestodb';
const JWT_KEY = process.env.JWT_KEY || 'ABRAKAdDDaaabRAA';
const PORT = process.env.PORT || 3000;

module.exports = {
  MONGODB_URL,
  JWT_KEY,
  PORT,
};
