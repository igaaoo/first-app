var express = require('express');
var router  = express.Router();
const app = express();

const expressLayouts = require("express-ejs-layouts");
router.use(express.static('public'));



router.get('/',(req,res)=>{
 res.render('pages/home.ejs');
 console.log("Acessou a home");
});

router.get('/about',(req,res)=>{
  res.render('pages/about');
});

router.get('/cadastro',(req,res)=>{
    res.render('pages/cadastro');
})
router.get('/curriculo',(req,res)=>{
 res.send('Meu currículo');
});

router.get('/cadastro/insert',(req,res)=>{
    //inserir um usuario
   });
   router.get('/cadastro/list',(req,res)=>{
   //listar de usuarios cadastrado
   });


   //Essa linha permite que este código seja exportado como ummódulo e possa ser usado em outras partes da aplicação.
   module.exports = router; 