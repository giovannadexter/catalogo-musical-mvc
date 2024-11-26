const { Album, Artista, Genero, Track } = require('../models/index');

exports.addAlbumForm = (req, res) => {
  res.render('addAlbum'); // Renderiza a página de adicionar álbum
};

exports.createAlbum = async (req, res) => {
  try {
    console.log('Dados recebidos no formulário:', req.body);

    const { title, release_year, artist, tracks, cover_url, genre } = req.body;

    if (!title || !release_year || !tracks) {
      console.log('Dados inválidos para criar álbum');
      return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
    }

    let artista = null;
    if (artist && artist.trim() !== '') {
      artista = await Artista.findOne({ where: { name: artist } });
      if (!artista) {
        artista = await Artista.create({ name: artist });
      }
    }

    // Criar ou associar Gênero
    let genero = null;
    if (genre && genre.trim() !== '') {
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
      artist_id: artista ? artista.id : null,
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
          model: Genero,
          as: 'genre',
        },
        {
          model: Track,
          as: 'tracks',
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

exports.editAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [
        { model: Track, as: 'tracks' }, // Inclui as faixas associadas
        { model: Genero, as: 'genre' },
      ],
    });

    if (!album) {
      return res.status(404).send('Álbum não encontrado.');
    }

    res.render('editAlbum', { album });
  } catch (error) {
    console.error('Erro ao buscar álbum para edição:', error);
    res.status(500).send('Erro ao buscar álbum para edição.');
  }
};


exports.updateAlbum = async (req, res) => {
  try {
    const { title, release_year, genre, tracks } = req.body;
    const album = await Album.findByPk(req.params.id, {
      include: [{ model: Track, as: 'tracks' }],
    });

    if (!album) {
      return res.status(404).send('Álbum não encontrado.');
    }

    // Atualiza as informações do álbum
    await album.update({ title, release_year });

    // Atualiza o gênero
    if (genre && genre.trim() !== '') {
      let genero = await Genero.findOne({ where: { name: genre } });
      if (!genero) {
        genero = await Genero.create({ name: genre });
      }
      album.genre_id = genero.id;
      await album.save();
    } else {
      album.genre_id = null; // Deixa nulo se o campo estiver vazio
      await album.save();
    }

    // Atualiza ou exclui as faixas
    if (tracks) {
      for (const trackData of Object.values(tracks)) {
        if (trackData.delete === 'true') {
          // Exclui a faixa se marcada para exclusão
          await Track.destroy({ where: { id: trackData.id } });
        } else {
          // Atualiza o nome da faixa
          const track = await Track.findByPk(trackData.id);
          if (track) {
            await track.update({ name: trackData.name });
          }
        }
      }
    }

    res.redirect(`/albums/${album.id}`);
  } catch (error) {
    console.error('Erro ao atualizar álbum:', error);
    res.status(500).send('Erro ao atualizar álbum.');
  }
};


exports.deleteAlbum = async (req, res) => {
  try {
    // Encontra o álbum pelo ID
    const album = await Album.findByPk(req.params.id, {
      include: [{ model: Track, as: 'tracks' }] // Inclui as faixas associadas
    });

    // Verifica se o álbum foi encontrado
    if (!album) {
      return res.status(404).send('Álbum não encontrado.');
    }

    // Deleta as faixas associadas primeiro
    if (album.tracks && album.tracks.length > 0) {
      await Track.destroy({ where: { album_id: album.id } });
    }

    // Agora deleta o álbum
    await album.destroy();

    // Redireciona para a página inicial
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao deletar álbum:', error);
    res.status(500).send('Erro ao deletar álbum.');
  }
};
