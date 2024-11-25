const { Album, Artista } = require('../models/index');


exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.render('home', { albums });
  } catch (error) {
    res.status(500).send('Erro ao buscar álbuns.');
  }
};

exports.getAlbumDetails = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).send('Álbum não encontrado.');
    res.render('detalhesAlbum', { album });
  } catch (error) {
    res.status(500).send('Erro ao buscar detalhes do álbum.');
  }
};

exports.addAlbumForm = (req, res) => {
  res.render('addAlbum');
};

exports.createAlbum = async (req, res) => {
  try {
    const { title, release_year, cover_url } = req.body;

    // Certifique-se de que os campos obrigatórios estão preenchidos
    if (!title || !release_year) {
      return res.status(400).send('Título e Ano de Lançamento são obrigatórios.');
    }

    // Criação do álbum
    await Album.create({ title, release_year, cover_url });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar álbum.');
  }
};

