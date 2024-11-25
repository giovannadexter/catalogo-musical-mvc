const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Artista = sequelize.define('Artista', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Define que o nome deve ser único
    validate: {
        notEmpty: {
            msg: 'O nome do artista não pode ser vazio.'
        }
    }
},
genre: {
    type: DataTypes.STRING,
    allowNull: false
}
});

// Associações do Artista
Artista.associate = models => {
  Artista.hasMany(models.Album, { foreignKey: 'artist_id', as: 'albums' });
};

module.exports = Artista;
