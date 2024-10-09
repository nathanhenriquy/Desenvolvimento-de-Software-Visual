// models/cartItem.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Cart = require('./cart')(sequelize); // importação do carrinho
    const Produtos = require('./produtos')(sequelize); // importação dos produtos

    const CartItem = sequelize.define('CartItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        valor: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    CartItem.belongsTo(Cart, {
        constraint: true,
        foreignKey: 'IdCart', // relação do item pertencer ao carrinho 
        onDelete: 'CASCADE'
    });

    CartItem.belongsTo(Produtos, {
        constraint: true,
        foreignKey: 'IdProduto'  //relação para achar o produto
    });

    return CartItem;
};