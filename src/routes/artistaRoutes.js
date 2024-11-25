const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

// Exibe o formulário para adicionar um artista
router.get('/add', artistaController.addArtistForm);

// Processa a adição de um novo artista
router.post('/add', artistaController.createArtist);

router.get('/:id', artistaController.getArtistDetails);

module.exports = router;
