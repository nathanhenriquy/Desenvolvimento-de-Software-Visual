//auth.js 
const { request } = require('express');
const jwt = require('jsonwebtoken');
const secret = '123'; //Ponto de vulrenabilidade porque a chave secreta nao é acessivel 
// recomenda-se gravar em variaveis de ambiente do sistema operacional 

//metodo para gerar o token jwt
async function  generateToken(user){
    const id = user.id;
    const email = user.email; //Quais dados serão entregues para a geração de token
    const token = jwt.sign({id,email}, secret, {expiresIn: '1h'}); // quais dados serão precisos para login, a palavra secreta, e tempo para expirar token
    return token;
}


// metodo para verificar a validade do token jwt
async function verifyToken(req,res,next){
    //Extrair o cabeçalho(header) que contem o token jwt
    const authheader = req.headers['authorization']
    
    if(!authheader){
        return res.status(401).json({message:'Token não Informado'});
    };

    //extrair o token jwt
    //const token = authheader; // N vai funcionar
    const token = authheader.split(' ')[1]; //Split separa pelo espaço para ignorar a palavra beter

    if(!token){
        return res.status(401).json({message:'Token não Informado'});
    }

    //verificar a validade abaixo
    jwt.verify(token, secret, (err, decoded)=>{// deu erro vai para err, e se deu certo vai para decoded
        if(err){
            //caso ocorra erro
            return res.status(401).json({message:'Token Invalido'})
        }

        req.user = decoded; //linha opcionaç
        next();

    });
}


module.exports = {generateToken, verifyToken};