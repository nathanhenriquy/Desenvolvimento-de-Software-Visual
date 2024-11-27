// controllers/paymentController.js

class paymentController {
    constructor(PaymentService) {
        this.paymentService = PaymentService;
    }

    // pagar com crédito
    async pagarCredito(req, res) {
        try {
            const IdUser = req.user.id;

            const pagamento = await this.paymentService.credito(IdUser);
            res.status(200).json(pagamento);

        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro no Pagamento por credito' });
        }
    }

    // pagar com PIX
    async pagarPix(req, res) {
        try {
            const IdUser = req.user.id; 

            const pagamento = await this.paymentService.pix(IdUser);
            res.status(200).json(pagamento);

        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro no Pagamento por PIX' });
        }
    }

    // ver transação
    async viewAllTransacoes(req, res) {
        try {
            const IdUser = req.user.id;
            const transacoes = await this.paymentService.listAll(IdUser);
            
            if (!transacoes || transacoes.length === 0) {
                return res.status(404).json({ message: 'Nenhuma transação encontrada.' });
            }
    
            res.status(200).json(transacoes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar transações.' });
        }
    }
}

module.exports = paymentController;
