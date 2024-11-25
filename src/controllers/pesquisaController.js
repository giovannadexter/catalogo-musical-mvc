const { Album, Artista } = require('../models/index'); // Correto


exports.search = async (req, res) => {
  try {
    const { title, genre, artist } = req.query;

    let whereCondition = {};
    if (title) whereCondition.title = title;
    if (genre) whereCondition.genre = genre;

    const albums = await Album.findAll({
      where: whereCondition,
      include: {
        model: Artista,
        where: artist ? { name: artist } : {},
        required: false,
      },
    });

    res.render('pesquisa', { albums });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro na pesquisa.');
  }
};

