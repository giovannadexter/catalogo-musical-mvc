const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Genero = sequelize.define('Genero', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Genero.associate = models => {
  Genero.hasMany(Album, { foreignKey: 'genre_id', as: 'albums' });
};

module.exports = Genero;
