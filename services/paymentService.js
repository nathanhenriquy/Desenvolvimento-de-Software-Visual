// services/paymentService.js

const db = require('../models');

class PaymentService {
    constructor(PaymentModel, CartModel, CartItemModel, ProdutosModel) {
        this.Payment = PaymentModel;
        this.Cart = CartModel;
        this.CartItem = CartItemModel;
        this.Produtos = ProdutosModel;
    }

    // Atualizar estoque e destruir carrinho
    async updateEstoqueDestroyCart(IdCart) {
        try {
            const cartItems = await this.CartItem.findAll({ where: { IdCart } }); //encontra os itens

            for (const item of cartItems) {
                const produto = await this.Produtos.findByPk(item.IdProduto); //encntra o produto correspondente ao carrinho
                if (produto) {
                    produto.estoque -= item.quantidade;
                    await produto.save(); // salva nova quantidade no estoque
                }
            }

            await this.CartItem.destroy({ //remove itens do carrinho
                where: { IdCart }
            });
            await this.Cart.destroy({//exlui o carrinho
                where: { id: IdCart }
            });

        } catch (error) {
            // console.error('nao atualiza carrinho:', error);
            throw error;
        }
    }

    // Pagamento crédito
    async credito(IdUser) {
        try {
            const cart = await this.Cart.findOne({ // acha o carrinho 
                where: { IdUser }
            });
            if (!cart) throw new Error('Carrinho não encontrado');

            const resultadoPagamento = await this.Payment.create({
                IdUser: IdUser,
                status: 'concluída', // add o status
                valorTotal: cart.valorTotal, // pega o valor total do carrinho
                metodoPagamento: 'credito' // add método de pagamento
            });

            await this.updateEstoqueDestroyCart(cart.id);

            return resultadoPagamento;

        } catch (error) {
            throw error;
        }
    }

    // Pagamento PIX
    async pix(IdUser) {
        try {
            const cart = await this.Cart.findOne({ // acha o carrinho 
                where: { IdUser }
            });
            if (!cart) throw new Error('Carrinho não encontrado');

            const resultadoPagamento = await this.Payment.create({
                IdUser: IdUser,
                status: 'concluída', // add o status
                valorTotal: cart.valorTotal, // pega o valor total do carrinho
                metodoPagamento: 'pix' // add método de pagamento
            });

            await this.updateEstoqueDestroyCart(cart.id);

            return resultadoPagamento;

        } catch (error) {
            throw error;
        }
    }

    // Visualizar transação
    async listAll(IdUser) {
        try {
            const transacoes = await this.Payment.findAll({
                where: { IdUser } // Busca todas as transações do usuário
            });
            return transacoes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService;
