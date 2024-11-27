// ./service/cartService.js

const db = require('../models');

class CartService {
    constructor(CartModel, CartItemModel, ProdutosModel) {
        this.Cart = CartModel;
        this.CartItem = CartItemModel;
        this.Produtos = ProdutosModel;
    }

    // Add produto
    async add(IdProduto, IdUser, quantidade) {
        try {

            const produto = await this.Produtos.findByPk(IdProduto);
            if (!produto) {
                throw new Error('Produto não encontrado');
            }

            if (produto.estoque < quantidade) {
                throw new Error('Estoque insuficiente');
            }

            let cart = await this.Cart.findOne({
                where: { IdUser }                   // busca o carrinho do User
            });


            if (!cart) {
                cart = await this.Cart.create({ IdUser });    // caso n ache, ele cria um novo carrinho
            }


            let cartItem = await this.CartItem.findOne({
                where: { IdCart: cart.id, IdProduto }      // procura o item no carrinho
            });


            if (cartItem) {
                cartItem.quantidade += quantidade;      // Se o item já estiver no carrinho, apenas atualiza ele
                cartItem.valor = cartItem.quantidade * (await this.Produtos.findByPk(IdProduto)).preco;
                await cartItem.save();
            } else {
                const produto = await this.Produtos.findByPk(IdProduto);
                cartItem = await this.CartItem.create({       // Se o item não estiver no carrinho, add ele
                    IdCart: cart.id,
                    IdProduto,
                    quantidade,
                    valor: quantidade * produto.preco
                });
            }

            cart.valorTotal += cartItem.valor;  // atualiza o valorTotal
            await cart.save();


            return cartItem;

        } catch (error) {
            throw error;
        }
    }

    //remover produto
    async remove(IdProduto, IdUser) {
        try {

            let cart = await this.Cart.findOne({
                where: { IdUser }                   // busca o carrinho do User
            });


            let cartItem = await this.CartItem.findOne({
                where: { IdCart: cart.id, IdProduto }      // procura o item no carrinho
            });

            if (cartItem.quantidade > 1) { // caso tenha mais de um desse item, apenas subtrai a quantidade e valor
                cart.valorTotal -= (await this.Produtos.findByPk(IdProduto)).preco;
                cartItem.quantidade -= 1;
                cartItem.valor = cartItem.quantidade * (await this.Produtos.findByPk(IdProduto)).preco;
                await cartItem.save();
            } else {
                cart.valorTotal -= cartItem.valor; // caso tenha apenas um, tira o valor e destroy o item do carrinho
                await this.CartItem.destroy({
                    where: { id: cartItem.id }
                });
            }
            await cart.save();



        } catch (error) {
            throw error;
        }
    }

    //visualizar produto
    async view(IdUser) {
        try {
            let cart = await this.Cart.findOne({
                where: { IdUser }                   // busca o carrinho do User
            });

            let cartItens = await this.CartItem.findAll({
                where: { IdCart: cart.id }          // busca todos os itens
            });

            return { cart, cartItens };

        } catch (error) {
            throw error;
        }
    }


}
module.exports = CartService;
