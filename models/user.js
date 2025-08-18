const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  total_expense: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  isPremiumUser: {                       
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
