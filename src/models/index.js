const sequelize = require('../db/connection');
const Album = require('./albumModel');
const Artista = require('./artistaModel');

// Definir associações
Artista.hasMany(Album, { foreignKey: 'artist_id' });
Album.belongsTo(Artista, { foreignKey: 'artist_id' });

// Exportar modelos e conexão
module.exports = {
  sequelize,
  Album,
  Artista,
};
