const { Album, Artista, Genero, Track } = require('../models/index');

exports.addAlbumForm = (req, res) => {
  res.render('addAlbum'); // Renderiza a página de adicionar álbum
};

exports.createAlbum = async (req, res) => {
  try {
    console.log('Dados recebidos no formulário:', req.body);

    const { title, release_year, artist, tracks, cover_url, genre } = req.body;

    if (!title || !release_year || !artist || !tracks) {
      console.log('Dados inválidos para criar álbum');
      return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
    }

    // Criar ou associar Artista
    let artista = await Artista.findOne({ where: { name: artist } });
    if (!artista) {
      artista = await Artista.create({ name: artist, genre });
    }

    // Criar ou associar Gênero
    let genero = null;
    if (genre) {
      genero = await Genero.findOne({ where: { name: genre } });
      if (!genero) {
        genero = await Genero.create({ name: genre });
      }
    }

    // Criar o Álbum
    const album = await Album.create({
      title,
      release_year,
      cover_url,
      artist_id: artista.id,
      genre_id: genero ? genero.id : null,
    });

    // Criar Faixas
    const trackList = tracks.split(',').map(track => track.trim());
    for (const track of trackList) {
      await Track.create({ name: track, album_id: album.id });
    }

    console.log('Álbum criado com sucesso:', album);
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao adicionar álbum:', error);
    res.status(500).send('Erro ao adicionar álbum.');
  }
};

exports.getAlbumDetails = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Artista,
          as: 'artist',
        },
        {
          model: Track,
          as: 'tracks', // Inclua a associação das faixas
        },
      ],
    });

    if (!album) {
      return res.status(404).send('Álbum não encontrado.');
    }

    res.render('detalhesAlbum', { album });
  } catch (error) {
    console.error('Erro ao buscar detalhes do álbum:', error);
    res.status(500).send('Erro ao buscar detalhes do álbum.');
  }
};







exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.render('home', { albums });
  } catch (error) {
    console.error('Erro ao buscar álbuns:', error);
    res.status(500).send('Erro ao buscar álbuns.');
  }
};
