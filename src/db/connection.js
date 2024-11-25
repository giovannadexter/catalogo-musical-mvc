const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/catalog.sqlite', // Caminho do arquivo SQLite
  logging: false, // Para evitar logs desnecessários
});

sequelize.sync({ force: true }) // Isso apaga os dados existentes e recria as tabelas
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });


module.exports = sequelize;
