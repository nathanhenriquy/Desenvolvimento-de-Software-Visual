// ./routes/cart.js

var express = require('express');
var router = express.Router();
const auth = require('../auth');

//carregando service e controller de produtos
const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

//carregando o banco de dados
const db = require('../models');

//construir os objetos a partir das classes
const cartService= new CartService(db.Cart, db.CartItem, db.Produtos);
const cartController = new CartController(cartService);

// rota para adicionar produto ao carrinho
router.post('/add', auth.verifyToken, async (req, res) => {
    cartController.addProduto(req, res);    
});

// rota para remover produto do carrinho
router.delete('/removeproduto/:IdProduto', auth.verifyToken, async (req, res) => {
    cartController.removeProduto(req, res);    
});

// rota para ver todos os produto do carrinho
router.get('/viewprodutos', auth.verifyToken, async (req, res) => {
    cartController.viewProdutos(req, res);    
});

module.exports = router;