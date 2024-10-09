// models/produtos.js

// ========= VARIAVEIS EM PORTUGUES POIS ESQUECI QUE ESTAVAMOS FAZENDO PADRAO EM INGLES, APENAS PRODUTOS ESTA ASSIM ==========

const Sequelize = require ('sequelize');
module.exports = (sequelize) => {
    const Produtos = sequelize.define ('Produtos',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false       
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao:{
            type: Sequelize.STRING,
            allowNull: false
        },
        preco:{
            type: Sequelize.DECIMAL(10, 2), // formatação para mostrar dois numeros após a virgula, pois estava arredondando no SQL
            allowNull: false
        },
        estoque:{
            type: Sequelize.INTEGER,
            allowNull: false
        }

    });
    return Produtos;

};