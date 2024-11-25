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
  },
});

Album.associate = models => {
  Album.belongsTo(Artista, { foreignKey: 'artist_id', as: 'artist' });
  Album.belongsTo(Genero, { foreignKey: 'genre_id', as: 'genre' });
  Album.hasMany(Track, { foreignKey: 'album_id', as: 'tracks' });

};

module.exports = Album;
