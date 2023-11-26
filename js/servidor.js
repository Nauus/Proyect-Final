
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
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    return res.status(400).json({ error: 'Usuario ya usado' });
  }

  const newUser = {
    username,
    password,
    email,
  };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado' });
});

// Inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }

  const token = jwt.sign({ userId: user.id }, 'xddd', { expiresIn: '1h' });
  res.json({ token });
});


const verificacion = (req, res, next) => {
  const token = req.header('access_token');
  if (!token) {
    return res.status(400).json({ message: 'Error: Token no proporcionado' });
  }

  try {
    const verificationUser = jwt.verify(token, 'xddd');
    req.usuario = verificationUser;
    next(); // Llama a next() para pasar al siguiente middleware o ruta
  } catch (error) {
    res.status(401).json({ message: 'Verificación incorrecta o token inválido' });
  }
};

// Ruta protegida 
app.get('/cart', verificacion, (req, res) => {
  // Acciones para la ruta protegida
  res.json({ message: 'Acceso a la ruta protegida exitoso', user: req.usuario });
});
/*


//INTENTO 2 
//endpoint login
app.post('/login', express.json(), async (req, res) => {
  const { username, password }=req.body;
  const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '2002',
    database: 'users',
    connectionLimit: 5
  });

const conn = await pool.getConnection();
const user = conn.query(`SELECT * FROM users WHERE username = ${username} & password = ${password}`);
const token = jwt.sign ({userId: user.id}, 'xddd', {expiresIn:'1h'})

res.json({ token})
})
//middleware
const verificacion = (req, res, next) => {
  const token = req.header('Authorization');
  if (token === undefined) {
    return res.status(400).json({ 'message': 'error debe estar ingresado en el sistema'})
  }

try {
  const verificationUser = jwt.verify(token, 'xddd')
  req.usuario=verificationUser
  next()
}
catch (error){
  res.status(400).json({'message':'verificacion incorrecta'})
}};
*/

app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
})