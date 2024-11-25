const sequelize = require('../db/connection');
const Album = require('./albumModel');
const Artista = require('./artistaModel');
const Genero = require('./generoModel');
const Track = require('./trackModel');

// Configurar associações
Artista.hasMany(Album, { foreignKey: 'artist_id', as: 'albums' });
Album.belongsTo(Artista, { foreignKey: 'artist_id', as: 'artist' });

Genero.hasMany(Album, { foreignKey: 'genre_id', as: 'albums' });
Album.belongsTo(Genero, { foreignKey: 'genre_id', as: 'genre' });

Album.hasMany(Track, { foreignKey: 'album_id', as: 'tracks' });
Track.belongsTo(Album, { foreignKey: 'album_id', as: 'album' });

module.exports = {
  sequelize, // Exporta a instância do Sequelize
  Album,
  Artista,
  Genero,
  Track,
};
