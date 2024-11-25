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
    const artist = await Artista.findByPk(req.params.id, {
        include: ['albums'] // Inclui os álbuns associados
    });
    if (!artist) {
        return res.status(404).send('Artista não encontrado');
    }
    res.render('detalhesArtista', { artist });
} catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor');
}
};

exports.addArtistForm = async (req, res) => {
  try {
    // Busca os álbuns existentes para o dropdown
    const albums = await Album.findAll();
    res.render('addArtista', { albums });
  } catch (error) {
    console.error('Erro ao carregar o formulário de adicionar artista:', error);
    res.status(500).send('Erro ao carregar o formulário de adicionar artista.');
  }
};

exports.createArtist = async (req, res) => {
  try {
    console.log('Dados recebidos no formulário:', req.body); // Log para depuração
    const { name, genre, album_id } = req.body;

    // Validação de campos obrigatórios
    if (!name || !genre) {
      console.log('Dados inválidos para criar artista');
      return res.status(400).send('Nome e Gênero são obrigatórios.');
    }

    // Verifica se o artista já existe pelo nome
    const existingArtist = await Artista.findOne({ where: { name } });
    if (existingArtist) {
      console.log('Artista já existe com o nome:', name);
      return res.status(400).send('Já existe um artista com esse nome.');
    }

    // Cria o artista se ele não existir
    const artist = await Artista.create({ name, genre });
    console.log('Artista criado com sucesso!');

    // Associa o artista ao álbum, se fornecido
    if (album_id) {
      const album = await Album.findByPk(album_id);
      if (album) {
        await album.update({ artist_id: artist.id });
        console.log('Artista associado ao álbum:', album.title);
      }
    }

    res.redirect('/');
  } catch (error) {
    console.error('Erro ao adicionar artista:', error);

    // Lida com erro de unicidade caso o banco de dados tenha a constraint
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Já existe um artista com esse nome.');
    }

    res.status(500).send('Erro ao adicionar artista.');
  }
 
};


exports.editArtist = async (req, res) => {
  try {
    const artist = await Artista.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).send('Artista não encontrado.');
    }
    res.render('editArtista', { artist });
  } catch (error) {
    console.error('Erro ao buscar artista para edição:', error);
    res.status(500).send('Erro ao buscar artista para edição.');
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const { name, genre } = req.body;
    const artist = await Artista.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).send('Artista não encontrado.');
    }
    await artist.update({ name, genre });
    res.redirect(`/artists/${artist.id}`);
  } catch (error) {
    console.error('Erro ao atualizar artista:', error);
    res.status(500).send('Erro ao atualizar artista.');
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artista.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).send('Artista não encontrado.');
    }
    await artist.destroy();
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao deletar artista:', error);
    res.status(500).send('Erro ao deletar artista.');
  }
};

