const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumDetails);
router.get('/add', albumController.addAlbumForm);
router.post('/add', albumController.createAlbum);

module.exports = router;
