const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Track = sequelize.define('Track', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  album_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Albums', // Nome da tabela
      key: 'id',
    },
  },
});

Track.associate = models => {
  Track.belongsTo(Album, { foreignKey: 'album_id', as: 'album' });

};
module.exports = Track;
