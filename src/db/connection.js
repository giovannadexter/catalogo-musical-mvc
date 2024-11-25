const { Sequelize } = require('sequelize');

// Configuração da conexão com o SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/catalogo.sqlite', // Certifique-se de que o caminho para o arquivo SQLite está correto
  logging: false, // Opcional: desabilita logs das queries no console
});

module.exports = sequelize; // Exporta a instância do Sequelize
