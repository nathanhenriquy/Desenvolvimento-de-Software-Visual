var express = require('express'); //para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
//var User = require('./models/user')(sequelize);



var indexRouter = require('./routes/index'); // para a rota principal do appp
var usersRouter = require('./routes/users'); // para a rota users ./routes/users.js
var produtosRouter = require('./routes/produtos');  // para a rota produtos ./routes/produtos.js
var cartRouter = require('./routes/cart'); // para a rota produtos ./routes/cart.js
var paymentRouter = require('./routes/payment'); // para a rota payment ./routes/payment.js




var app = express(); // ativa a API com o express


app.use(logger('dev'));
app.use(express.json()); // permite o uso de JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter); // Cria a rota app/
app.use('/users', usersRouter); //cria a rota app/users
app.use('/produtos', produtosRouter); //cria a rota app/produtos
app.use('/cart', cartRouter); //cria a rota app/cart
app.use('/payment', paymentRouter); //cria a rota app/payment



// Sincronizando o Sequelize (em dev)
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ force: false }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
        .then(() => {
            console.log('Banco de dados sincronizado');
        })
        .catch(err => {
            console.error('Erro ao sincronizar o banco de dados:', err);
        });
}

// iniciar o servidor com o app.js na porta 8080
var port = 8080

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
});;

module.exports = app;
