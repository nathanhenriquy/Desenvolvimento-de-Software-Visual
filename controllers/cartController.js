// ./controllers/cartController.js

class cartController {
    constructor(CartService) {
        this.cartService = CartService;
    }

    // Adicionar produto ao carrinho
    async addProduto(req, res) {      
        try {
            const {IdProduto, quantidade} = req.body;
            const IdUser = req.user.id;

            const newItem = await this.cartService.add(IdProduto, IdUser, quantidade);
            res.status(200).json(newItem);                 
            
        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro ao adicionar item ' });  
                console.error('Erro ao adicionar ao carrinho:', error);     
        }
    }


    // Remover produto do carrinho
    async removeProduto(req,res) {
        try {
            const {IdProduto} = req.params;
            const IdUser = req.user.id
            
            await this.cartService.remove(IdProduto,IdUser);
            res.status(200).json({message:"Item removido"});     

        } catch (error) {
            res
                .status(500)
                .json({ error: 'Erro ao remover item ' });
            
        }
    }


    // Visualizar produtos no carrinho
    async viewProdutos(req, res) {
        try {
            const IdUser = req.user.id;
            const cart = await this.cartService.view(IdUser);
            res.status(200).json(cart.cartItens);   
            
        } catch (error) {
            res
                .status(500)
                .json({error: 'Erro ao mostrar itens'});
        
        }
    }
}

module.exports = cartController;
