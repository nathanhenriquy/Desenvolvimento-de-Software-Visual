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
    async viewTransacao(req, res) {
        try {
            const { transacaoId } = req.params;
            const IdUser = req.user.id; 

            const transacao = await this.paymentService.view(transacaoId, IdUser);
            res.status(200).json(transacao);

        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro para ver transacao' });
        }
    }
}

module.exports = paymentController;
