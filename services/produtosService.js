// ./service/produtosService.js

// ========= VARIAVEIS EM PORTUGUES POIS ESQUECI QUE ESTAVAMOS FAZENDO PADRAO EM INGLES, APENAS PRODUTOS ESTA ASSIM ==========

const db = require ('../models');

class ProdutosService{
    constructor(ProdutosModel){
        this.Produtos = ProdutosModel;

    }

    //Criar produtos
    async create(nome,descricao, preco, estoque){
        try{
            const newProduto = await this.Produtos.create({
                nome: nome,
                descricao: descricao,
                preco: preco,
                estoque: estoque
            });
            
            return newProduto ? newProduto : null; // caso criado retornará
        }        
        catch(error){
            throw error;
        }        
    }

    //Retornar todos os prudutos
    async findAll() {
        try {
            const allProdutos = await this.Produtos.findAll();
            return allProdutos ? allProdutos : null; // caso ache mostra
        } catch (error) {
            throw error;
        }
    }

    // Atualizar produto
    async update(id, { nome, descricao, preco, estoque }) {
        try{
            await this.Produtos.update(
                {
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                    estoque: estoque
                },{where:{id:id}} // pega o id de troca e procura no banco para alterar
            );
        }catch(error){
            throw error;
        }
    }

    // Deletar produto
    async delete(id) {
        try {
            const deleteProdutos = await this.Produtos.destroy({
                where: { id: id }
            });

            return deleteProdutos ? true : false; // Retorna true se deletado
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProdutosService;