// routes/payment.js

var express = require('express');
var router = express.Router();
const auth = require('../auth');

// Carregando os services e controllers de pagamento e carrinho
const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');

// Carregando o banco de dados
const db = require('../models');

// Construir os objetos a partir das classes
const paymentService = new PaymentService(db.Payment, db.Cart, db.CartItem,db.Produtos);
const paymentController = new PaymentController(paymentService);

// Rota para pagamento via crédito
router.post('/credito', auth.verifyToken, async (req, res) => {
    paymentController.pagarCredito(req, res);
});

// Rota para pagamento via PIX
router.post('/pix', auth.verifyToken, async (req, res) => {
    paymentController.pagarPix(req, res);
});

// Rota para visualizar transação
router.get('/transacoes', auth.verifyToken, async (req, res) => {
    paymentController.viewAllTransacoes(req, res);
});

module.exports = router;
