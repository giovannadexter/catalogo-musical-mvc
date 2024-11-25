const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { sequelize, Album, Artista, Genero, Track } = require('./models');

// Inicializar o app
const app = express();
// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Processa dados enviados via formulário
app.use(express.json()); // Processa dados enviados como JSON


app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos

const albumRoutes = require('./routes/albumRoutes');
app.use('/albums', albumRoutes);

const artistaRoutes = require('./routes/artistaRoutes');
app.use('/artists', artistaRoutes);

const pesquisaRoutes = require('./routes/pesquisaRoutes');
app.use('/search', pesquisaRoutes);

(async () => {
  try {
    // Sincroniza o banco de dados
    await sequelize.sync({ alter: true }); // Use { force: true } apenas para recriar tabelas (apaga os dados existentes)
    console.log('Banco sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar o banco:', error);
  }
})();

app.get('/', async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: [
        {
          model: Artista,
          as: 'artist', // Certifique-se de que este alias corresponda ao definido no relacionamento
          attributes: ['name'], // Carregue apenas os atributos necessários, como `name`
        },
      ],
    });
    res.render('home', { albums });
  } catch (error) {
    console.error('Erro ao carregar a página inicial:', error);
    res.status(500).send('Erro ao carregar a página inicial.');
  }
});


// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

