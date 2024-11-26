const { Album, Artista, Genero, Track } = require('../models/index');
const { Op, Sequelize } = require('sequelize');

exports.search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      console.log('Query vazia');
      return res.render('searchResults', { results: [], query: '' });
    }

    console.log('Realizando pesquisa com query:', query);

    // Realiza a pesquisa
    const results = await Album.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } }, // Filtro por título do álbum
          Sequelize.literal(`EXISTS (SELECT 1 FROM Artista WHERE Artista.id = Album.artist_id AND Artista.name LIKE '%${query}%')`), // Filtro por artista
          Sequelize.literal(`EXISTS (SELECT 1 FROM Generos WHERE Generos.id = Album.genre_id AND Generos.name LIKE '%${query}%')`), // Filtro por gênero
        ],
      },
      include: [
        {
          model: Artista,
          as: 'artist',
          required: false, // Inclui informações do artista
        },
        {
          model: Genero,
          as: 'genre',
          required: false, // Inclui informações do gênero
        },
        {
          model: Track,
          as: 'tracks',
          required: false, // Inclui informações das faixas
        },
      ],
    });

    console.log('Resultados encontrados:', results);

    // Renderiza os resultados
    res.render('searchResults', { results, query });
  } catch (error) {
    console.error('Erro ao realizar pesquisa:', error);
    res.status(500).send('Erro ao realizar pesquisa.');
  }
};