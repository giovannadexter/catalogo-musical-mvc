const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Genero = sequelize.define('Genero', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Genero;
