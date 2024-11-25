const { Album, Artista, Genero, Track } = require('../models/index');
const { Op } = require('sequelize');

exports.search = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            console.log('Query vazia');
            return res.render('searchResults', { results: [], query: '' });
        }

        console.log('Realizando pesquisa com query:', query);

        // Pesquisar por álbuns e artistas
        const results = await Album.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } }, // Pesquisa no título do álbum
                ],
            },
            include: [
                {
                    model: Artista,
                    as: 'artist',
                    where: {
                        name: { [Op.like]: `%${query}%` }, // Pesquisa no nome do artista
                    },
                    required: false, // Inclui álbuns sem artista correspondente ao query
                },
                { model: Genero, as: 'genre' },
                { model: Track, as: 'tracks' },
            ],
        });

        if (results.length === 0) {
            // Se nenhum álbum for encontrado, procurar diretamente pelos artistas
            const artist = await Artista.findOne({
                where: { name: { [Op.like]: `%${query}%` } },
                include: [
                    {
                        model: Album,
                        as: 'albums',
                        include: [
                            { model: Genero, as: 'genre' },
                            { model: Track, as: 'tracks' },
                        ],
                    },
                ],
            });

            if (artist) {
                return res.render('searchResults', { results: artist.albums, query });
            }
        }

        console.log('Resultados encontrados:', results);
        res.render('searchResults', { results, query });
    } catch (error) {
        console.error('Erro ao realizar pesquisa:', error);
        res.status(500).send('Erro ao realizar pesquisa.');
    }
};
