const { Artista } = require('../models/index');


const { Album } = require('../models/index'); // Importar de models/index.js

Artista.hasMany(Album, { foreignKey: 'artist_id' });


exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artista.findAll();
    res.render('home', { artists });
  } catch (error) {
    res.status(500).send('Erro ao buscar artistas.');
  }
};

exports.getArtistDetails = async (req, res) => {
  try {
    const artist = await Artista.findByPk(req.params.id);
    if (!artist) return res.status(404).send('Artista não encontrado.');
    res.render('detalhesArtista', { artist });
  } catch (error) {
    res.status(500).send('Erro ao buscar detalhes do artista.');
  }
};

exports.addArtistForm = async (req, res) => {
  try {
    const albums = await Album.findAll(); // Busca os álbuns existentes
    res.render('addArtista', { albums }); // Renderiza a view com os álbuns
  } catch (error) {
    console.error('Erro ao carregar o formulário de adicionar artista:', error);
    res.status(500).send('Erro ao carregar o formulário de adicionar artista.');
  }
};

exports.createArtist = async (req, res) => {
  try {
    const { name, genre, album_id } = req.body;

    if (!name || !genre) {
      return res.status(400).send('Nome e Gênero são obrigatórios.');
    }

    // Criação do artista
    const artist = await Artista.create({ name, genre });

    // Associação opcional a um álbum
    if (album_id) {
      const album = await Album.findByPk(album_id);
      if (album) {
        await artist.addAlbum(album); // Associa o artista ao álbum
      }
    }

    res.redirect('/');
  } catch (error) {
    console.error('Erro ao adicionar artista:', error);
    res.status(500).send('Erro ao adicionar artista.');
  }
};

