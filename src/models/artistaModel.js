const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Artista = sequelize.define('Artista', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
  },
});

// Associações do Artista
Artista.associate = models => {
  Artista.hasMany(models.Album, { foreignKey: 'artist_id', as: 'albums' });
};

module.exports = Artista;
