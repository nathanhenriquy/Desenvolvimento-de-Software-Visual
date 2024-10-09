// ./controllers/produtosController.js

// ========= VARIAVEIS EM PORTUGUES POIS ESQUECI QUE ESTAVAMOS FAZENDO PADRAO EM INGLES, APENAS PRODUTOS ESTA ASSIM ==========

class produtosController{

    constructor(ProdutosService){
        this.produtosService = ProdutosService;
    }

    //criar produtos
    async createProdutos(req, res) {

        const {nome, descricao, preco, estoque} = req.body;

        try {
            const newProdutos = await this.produtosService.create(nome, descricao, preco, estoque);
            res.status(200).json(newProdutos);

        } catch (error) {
            res
                .status(500)
                .json({error: 'Erro ao gravar novo Produto' });
        }
    }

    //listar produtos
    async findAllProdutos(req, res) {
        try {
            const AllProdutos = await this.produtosService.findAll();
            res.status(200).json(AllProdutos);

        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro ao listar produtos' });
        }
    }

    //atualizar produtos
    async updateProdutos(req, res) {
        const { id } = req.params;
        const { nome, descricao, preco, estoque } = req.body;
    
        try {
            await this.produtosService.update(id, { nome, descricao, preco, estoque });
            res.status(200).json({message:'Produto Atualizado'});            
        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro ao atualizar' });
        }
    }

  
    // deletar
    async deleteProdutos(req, res) {
        const { id } = req.params;
        try {
            await this.produtosService.delete(id);
            res.status(200).json({ message: 'Produto deletado' });

        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro ao deletar produto' });
        }
    }
}

module.exports = produtosController;