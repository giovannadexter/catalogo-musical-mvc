const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');


const Track = sequelize.define('Track', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre: { // Nova coluna
    type: DataTypes.STRING,
    allowNull: true, // Ou false se for obrigatório
  },
});

Track.associate = models => {
  Track.belongsTo(Album, { foreignKey: 'album_id', as: 'album' });

};
module.exports = Track;
