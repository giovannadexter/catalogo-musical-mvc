const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

// Exibe o formulário para adicionar um artista
router.get('/add', artistaController.addArtistForm);

// Processa a adição de um novo artista
router.post('/add', artistaController.createArtist);

router.get('/:id', artistaController.getArtistDetails);

router.get('/:id/edit', artistaController.editArtist);
router.post('/:id/edit', artistaController.updateArtist);

// Rota para deletar artista
router.get('/:id/delete', artistaController.deleteArtist);


module.exports = router;
