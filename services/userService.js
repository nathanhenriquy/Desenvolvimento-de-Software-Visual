// ./service/userService.js
const auth = require('../auth');
const bcrypt = require('bcrypt');
var round_salts = 10;

const db = require ('../models');

class UserService{
    constructor(UserModel){
        this.User = UserModel;

    }

    async create(email,data_nasc, password){

        try{
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts)); //Criptografia da senha, agora grava o hash da senha
            const newUser = await this.User.create({
                email:email,
                data_nasc:data_nasc,
                password:hashpassword
            });

            return newUser? newUser : null //if ternário

            /* 
            if(newUser){
                return newUser;
            } 
            else{
                return null;
            }
            */
        }
        catch(error){
            throw error;
        }

        
    }

    // metodo para retornar todos os usuarios
    async findAll(){
        try{
            const AllUsers = await this.User.findAll();
            return AllUsers ? AllUsers : null;
        }
        catch(error){
            throw error;
        }
    }


    //metodo para retornar o usuario pelo id
    async findById(id){
        try{
            const User = await this.User.findByPk(id);
            return User ? User : null;
        }
        catch(error){
            throw error;
        }
    }


    //metodo para login
    async login(email, password){
        try{
            const User = await this.User.findOne({
                where : {email}
                
            });
            //se o usuario existe,  ver se a senha esta ok
            if(User){

            //Comparar as senhas
            if(await bcrypt.compare(password, User.password)){ //esse password é a senha cripto
                //gerar o token do User
                const token = await auth.generateToken(User);
                User.dataValues.Token = token;
                User.dataValues.password = '';
            }
            else{
                throw new Error('Senha Invalida');
            }       
            

            }
            return User ? User : null;
        }
        catch(error){
            throw error;
        }


    }
}

module.exports = UserService;