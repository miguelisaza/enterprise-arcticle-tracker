const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enterprise = require('./Enterprise');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NIT: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Enterprise,
      key: 'NIT',
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Article.belongsTo(Enterprise, { foreignKey: 'NIT' });
Enterprise.hasMany(Article, { foreignKey: 'NIT' });

module.exports = Article;