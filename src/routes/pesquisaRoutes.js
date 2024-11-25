const express = require('express');
const router = express.Router();
const pesquisaController = require('../controllers/pesquisaController');

router.get('/', pesquisaController.search);

module.exports = router;
