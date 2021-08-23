const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
const address = 'localhost';
const expressLayouts = require("express-ejs-layouts");
const { urlencoded } = require("express");

const utils = require("./utils");

const faker = require("faker");

let toggleBol=true;



app.set('view engine', 'ejs');
app.use(expressLayouts)

app.use(express.urlencoded({extended:false}));  //prepara a aplicacao para receber dados na forma de query string
app.use(express.json());    //prepara a aplicacao para receber dados no formato JSON

app.use('/', routes);

global.users =[];
for (let cont=0;cont<20;cont++){
    users.push({name:faker.name.findName(),address:faker.internet.email(),email:faker.address.streetAddress(),age:utils.getRandomByInterval(15,50,true),heigth:utils.getRandomByInterval(1.50,1.70,false).toFixed(2),vote:toggleBol});
    toggleBol=!toggleBol;
}

//Criando um servidor simples com o Node.js e o Express
const server = app.listen(port, address, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Servidor executando no endereço ${host} e porta ${port}`);
});