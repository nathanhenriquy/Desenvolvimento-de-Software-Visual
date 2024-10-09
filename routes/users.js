var express = require('express');
var router = express.Router();
const auth = require('../auth'); // carregar os objetos do auth.js

//implementar as dependencias para o funcionamento da classe User

const db = require('../models') //carregando o banco de dados

//carregando service e controller da user
const UserService = require ('../services/userService')
const UserController = require('../controllers/userController')

//construir os objetos a partir das classes
const userService = new UserService(db.User);
const userController = new UserController(userService);



/* GET users listing. */
router.get('/', function(req, res, next) { //requisição, resposta, e o próximo passo
  res.send('Módulo de usuários rodando.');
});

//rota para login

router.post('/login', async(req,res)=>{
  userController.login(req,res);
});

// rota para registrar novo usuario
router.post('/novouser', async(req, res)=>{
  userController.createUser(req,res);
});

//rota para retornar todos os usuários
router.get('/allusers', auth.verifyToken, async(req,res)=>{
  userController.findAllUsers(req,res);
});

//Retornar um usuario pelo Id
router.get('/getUserById', async (req,res)=>{
  userController.findUserById(req,res);

});



module.exports = router;
