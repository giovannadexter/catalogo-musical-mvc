const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { Album } = require('./models/index');
// Importar rotas
const albumRoutes = require('./routes/albumRoutes');
const artistaRoutes = require('./routes/artistaRoutes'); // Corrigir importação
const pesquisaRoutes = require('./routes/pesquisaRoutes');

const app = express();

// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/albums', albumRoutes);
app.use('/artists', artistaRoutes); // Agora definido corretamente
app.use('/search', pesquisaRoutes);

// Rota inicial (home)
app.get('/', async (req, res) => {
  try {
    const albums = await Album.findAll(); // Busca todos os álbuns do banco
    res.render('home', { albums }); // Passa os álbuns para a view
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

