var express = require('express');
var router = express.Router();
const app = express();

const expressLayouts = require("express-ejs-layouts");
router.use(express.static('public'));



router.get('/', (req, res) => {
  res.render('pages/home.ejs');
  console.log("Acessou a home");
});

router.get('/about', (req, res) => {
  res.render('pages/about');
  console.log("Acessou o Sobre");
});

router.get('/cadastro', (req, res) => {
  res.render('pages/cadastro', { users: users });
  console.log("Acessou o Cadastro");
})

router.post('/cadastro/update', (req, res) => {
  users[req.body.id].name = req.body.name;
  users[req.body.id].email = req.body.email;
  users[req.body.id].address = req.body.address;
  users[req.body.id].age = req.body.age;
  users[req.body.id].height = req.body.height;
  users[req.body.id].vote = req.body.vote;

  console.log("Dados recebidos: ", req.body);
  res.sendStatus(200);
})

router.get('/cadastro/list', (req, res) => {
  //lista de usuarios cadastrado
});


//Essa linha permite que este código seja exportado como um módulo e possa ser usado em outras partes da aplicação.
module.exports = router;