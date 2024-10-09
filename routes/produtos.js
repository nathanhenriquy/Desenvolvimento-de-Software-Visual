// ./routes/produtos.js

// ========= VARIAVEIS EM PORTUGUES POIS ESQUECI QUE ESTAVAMOS FAZENDO PADRAO EM INGLES, APENAS PRODUTOS ESTA ASSIM ==========

var express = require('express');
var router = express.Router();

//carregando service e controller de produtos
const ProdutosService = require('../services/produtosService');
const ProdutosController = require('../controllers/produtosController');

//carregando o banco de dados
const db = require('../models');

//construir os objetos a partir das classes
const produtosService= new ProdutosService(db.Produtos);
const produtosController = new ProdutosController(produtosService);

// rota para registrar novo produto
router.post('/novoproduto', async (req,res)=>{
    produtosController.createProdutos(req,res);
});

//rota para retornar todos os produtos
router.get('/allprodutos',async(req,res)=>{
    produtosController.findAllProdutos(req,res);
})

//rota para dar update em um produto
router.put('/updateprodutos/:id',async(req,res)=>{ // pesquisei e usa o :id para identificar o produto a ser atualizado .
    produtosController.updateProdutos(req,res);
})

//rota para deletar um produto
router.delete('/deleteprodutos/:id',async(req,res)=>{ // pesquisei e usa o :id para identificar o produto a ser deletado .
    produtosController.deleteProdutos(req,res);
})

module.exports = router;