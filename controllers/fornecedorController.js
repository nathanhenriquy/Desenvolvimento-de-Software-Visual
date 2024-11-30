// ./controllers/fornecedorController.js

class FornecedorController {
    constructor(FornecedorService) {
        this.fornecedorService = FornecedorService;
    }

    
    async createFornecedor(req, res) {
        const { nome, cnpj, endereco, categoriaProduto, observacao } = req.body;

        try {
            const novoFornecedor = await this.fornecedorService.create(nome, cnpj, endereco, categoriaProduto, observacao);
            res.status(200).json(novoFornecedor);

        } 
        catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao criar um novo fornecedor' });
        }
    }

    
    async findAllFornecedores(req, res) {
        try {
            const AllFornecedores = await this.fornecedorService.findAll();
            res.status(200).json(AllFornecedores);
        } 
        catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro' });
        }
    }
}

module.exports = FornecedorController;
