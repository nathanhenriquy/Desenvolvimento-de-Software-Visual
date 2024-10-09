// services/paymentService.js

const db = require('../models');

class PaymentService {
    constructor(PaymentModel, CartModel, CartItemModel, ProdutosModel) {
        this.Payment = PaymentModel;
        this.Cart = CartModel;
        this.CartItem = CartItemModel;
        this.Produtos = ProdutosModel;
    }

    // destruir carrinho
    async DestroyCart(IdCart) {
        try {
            
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

            await this.DestroyCart(cart.id);

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

            await this.DestroyCart(cart.id);

            return resultadoPagamento;

        } catch (error) {
            throw error;
        }
    }

    // Visualizar transação
    async view(transacaoId, IdUser) {
        try {
            const transacao = await this.Payment.findOne({
                where: { id: transacaoId, IdUser: IdUser }  //econtra a transação pelo id passado no url e pelo id do user do token
            });
            if (!transacao) throw new Error('Transação não encontrada');
            return transacao;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService;
