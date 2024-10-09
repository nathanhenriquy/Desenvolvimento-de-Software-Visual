// models/cart.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    
    const User = require('./user')(sequelize); //importção do User

    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        valorTotal: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    });

    Cart.belongsTo(User, {
        constraint: true,
        foreignKey: 'IdUser',  // relação de user e cart
        onDelete: 'CASCADE'   // para o carrinho excluir caso User seja excluido
    });

    return Cart;
};