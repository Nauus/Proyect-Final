
const express = require('express');
const app = express();
const cors = require ("cors");
const jwt = require('jsonwebtoken');

app.use(express.json());
const port = 3001; 
app.use(cors({
    origin: '*',
    methods: 'GET,POST', 
    allowedHeaders: 'Content-Type, Authorization', 
  }));

/*
1 NPM INSTALL EXPRESS
2 NPM INSTALL CORS 
3 JSONWEBTOKEN
4  NO REVISE LOS JAVASCRIPT PARA REVISAR CUIDADOSAMENTE SI HAY TODAVIA ALGUN FETCH A LA API DE JAP EN GITHUB
    SI CAMBIE LA DE PRODUCTS-INFO Y PRODUCTS
 EL RESTO ESTAN EN INIT.JS ALGUNAS NO CAMBIE PORQUE SON LITERALMENTE MENSAJES Y ME MAREABA XD
*/
app.get("/", (req, res) => {
    res.send("<h1>a ver</h1>");
  });

let cart = require("../json/cart/buy.json");  //UN MSG XD
app.get("/json/cart", (req, res) => {
    res.json(cart);
});
let cats = require("../json/cats/cat.json");     //CATS = CATEGORTIAS
app.get('/json/cats', (req, res) => {
    res.json(cats);
});
app.get('/json/cats_products/:id'+".json", (req, res) => {                   //PRODCUTOS POR CATEGORIAA
    res.json(require("../json/cats_products/" + req.params.id + ".json"));
});
app.get('/json/products/:id'+".json", (req, res) => {
    res.json(require("../json/products/" + req.params.id + ".json"));   //DETALLE DEL PRODUCTOO
});
app.get('/json/products_comments/:id'+'.json', (req, res) => {
    res.json(require("../json/products_comments/" + req.params.id + ".json"));  //COMENTARIOS DE X PRODUCTO
});
let sell = require("../json/sell/publish.json");                   //OTRO MENSAJE XD
app.get('/json/sell', (req, res) => {                
    res.json(sell);
});
let user_cart = require("../json/user_cart/25801.json");  
app.get('/json/user_cart', (req, res) => {
    res.json(user_cart);          //CARRITO DE USUARIO muestra solo el onix
});

const users = [];





/*  
USUARIO Y REGISTER
1 EN POSTMAN HACER UNA SOLICITUD A  HTTP:LOCALHOST ECON EL PUERTO 3001 Y METER USERNAME Y CONTRASE;A
2 SI DA USUARIO REGISTRADO REPETIR EL PASO 1 CON /LOGIN
3 SE GENERA EL TOKEN
4 Q XUXA HAGO CON EL TOKEN
*/

  app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = users.find(u => u.username === username);
  
    if (existingUser) {
      return res.status(400).json({ error: 'usuario ya usado' });
    }
    const newUser = {
      username,
      password,
      email,
    };
    users.push(newUser);
    app.post('/login', (req, res) => {
      const { username, password } = req.body;
    
      const user = users.find(u => u.username === username && u.password === password);
    
      if (!user) {
        return res.status(401).json({ error: 'Usuario o contrase;a mal' });
      }
    
      const token = jwt.sign({ userId: user.id }, 'xddd', { expiresIn: '1h' }); 
      res.json({ token });
    });
  
    res.status(201).json({ message: 'Usuario registrado' });
  });











app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
})