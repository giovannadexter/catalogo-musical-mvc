const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.get('/', artistaController.getAllArtists);
router.get('/:id', artistaController.getArtistDetails);
router.get('/add', artistaController.addArtistForm);
router.post('/add', artistaController.createArtist);

module.exports = router;
