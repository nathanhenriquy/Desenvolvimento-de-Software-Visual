// ./service/fornecedorService.js

const db = require ('../models');

class FornecedorService {
    constructor(FornecedorModel) {
        this.Fornecedor = FornecedorModel;
    }

    // Criar novo fornecedor
    async create(nome, cnpj, endereco, categoriaProduto, observacao) {
        try {
            const novoFornecedor = await this.Fornecedor.create({
                nome,
                cnpj,
                endereco,
                categoriaProduto,
                observacao,
            });
            return novoFornecedor ? novoFornecedor : null;

        } catch (error) {
            throw error;
        }
    }

    // Retornar todos os fornecedores
    async findAll() {
        try {
            const AllFornecedores = await this.Fornecedor.findAll();
            return AllFornecedores ? AllFornecedores : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FornecedorService;