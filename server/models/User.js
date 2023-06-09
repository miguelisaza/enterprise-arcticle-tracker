const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
	role: {
    type: DataTypes.ENUM('Admin', 'Standard'),
    allowNull: false,
    defaultValue: 'Standard',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// add a validPassword method to user prototype to validate hashed password
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hash the password before saving a new user
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});


module.exports = User;