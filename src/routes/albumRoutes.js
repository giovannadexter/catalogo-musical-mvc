const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// Renderiza o formulário para adicionar um álbum
router.get('/add', albumController.addAlbumForm);

// Processa o envio do formulário para adicionar um álbum
router.post('/add', albumController.createAlbum);

// Exemplo adicional para visualizar todos os álbuns (se necessário)
router.get('/', albumController.getAllAlbums);

router.get('/:id', albumController.getAlbumDetails);


module.exports = router;
