var express = require('express');
var router = express.Router();
const auth = require('../auth'); // carregar os objetos do auth.js

const db = require('../models');

// Carregar Service e Controller
const FornecedorService = require('../services/fornecedorService');
const FornecedorController = require('../controllers/fornecedorController');

// Construir objetos a partir das classes
const fornecedorService = new FornecedorService(db.Fornecedor);
const fornecedorController = new FornecedorController(fornecedorService);


// Rota para criar um novo fornecedor
router.post('/novoFornecedor', auth.verifyToken, async (req, res) => {
    fornecedorController.createFornecedor(req, res);
});

// Rota para retornar todos os fornecedores
router.get('/allFornecedores', auth.verifyToken, async (req, res) => {
    fornecedorController.findAllFornecedores(req, res);
});

module.exports = router;