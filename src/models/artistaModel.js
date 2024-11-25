const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Artista = sequelize.define('Artista', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Artista;
