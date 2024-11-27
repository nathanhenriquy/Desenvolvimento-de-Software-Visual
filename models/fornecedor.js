// models/fornecedor.js

const Sequelize = require ('sequelize');
module.exports = (sequelize) => {
    const Fornecedor = sequelize.define ('Fornecedor',{
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
        cnpj:{
            type: Sequelize.STRING,
            allowNull: false
        },
        endereco:{
            type: Sequelize.STRING,
            allowNull: false
        },
        categoriaProduto:{
            type: Sequelize.STRING,
            allowNull: false
        },
        observacao:{
            type: Sequelize.STRING,
            allowNull: false
        },
        
     

    });
    return Produtos;

};