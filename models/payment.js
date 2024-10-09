// models/payment.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        IdUser: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        valorTotal: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        metodoPagamento: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Payment;
};
