const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Album = sequelize.define('Album', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cover_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Artistas', // Nome da tabela de artistas
      key: 'id',
    },
    allowNull: true,
  },
});

module.exports = Album;
