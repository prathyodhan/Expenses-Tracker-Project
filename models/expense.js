const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Expense = sequelize.define('Expense', {
  amount: DataTypes.INTEGER,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
});

module.exports = Expense;
