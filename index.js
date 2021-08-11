const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
const address = 'localhost';
const expressLayouts = require("express-ejs-layouts");


global.users = [
    { name: "Wellington W. F. Sarmento", address: "Rua Dom Jeronimo, 666", email: "wwagner@virtual.ufc.br", age: 46, height: 1.70, vote: true },
    { name: "Patricia S. Paula", address: "Rua Dom Jeronimo, 666", email: "patricia@virtual.ufc.br", age: 32, height: 1.65, vote: true },
    { name: "Henrique Sérgio L. Pequeno", address: "Rua do Henrique, 666", email: "henrique@virtual.ufc.br", age: 38, height: 1.82, vote: true }
];





app.set('view engine', 'ejs');
app.use(expressLayouts)

app.use(express.urlencoded({extended:false}));  //prepara a aplicacao para receber dados na forma de query string
app.use(express.json());    //prepara a aplicacao para receber dados no formato JSON

app.use('/', routes);
//Criando um servidor simples com o Node.js e o Express
const server = app.listen(port, address, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Servidor executando no endereço ${host} e porta ${port}`);
});