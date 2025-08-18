const { DataTypes } = require('sequelize');
const sequelize = require('./db');


const ForgotPasswordRequest = sequelize.define('forgotPasswordRequest', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
});


const User = require('./user');
ForgotPasswordRequest.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

module.exports = ForgotPasswordRequest;
