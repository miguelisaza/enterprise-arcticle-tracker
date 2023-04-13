const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enterprise = sequelize.define('Enterprise', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NIT: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = Enterprise;