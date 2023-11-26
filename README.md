# Proyect-Final
servidor.js tiene las rutas
las rutas estan puestas en init.js y las que no estan ahi es porque estan siendo llamadas en su respectivo archivo JS,

para el servidor, cors, jsonwebtoken, express

puerto 3001 pqsi

en postman si se hace un post al localhost3001 con endpoint /register va a recibir username y password, se manejan 3 situaciones
si ya existe.
se registra.
datos incompatible. (pide json y solo2)

luego de eso en postman al hacer post pero con /login
genera el token en caso de que sea igual que los datos ingresados en register
se maneja:
si son diferentes datos
si es todo correcto (da el token)
si esta malxd

en login.js se esta haciendo un fetch a /login, y en register un fetch a /register
la idea es "imitar" la funcionalidad de postman para que devuelva el token y lo almacene, asi
interactuaria el servidor con el front, haciendo que para /cart o cart.html solo se ingrese
si se tiene ese token.

al registrarse y despues loguearse en html el token se guarda en localstorage

el error en principio es "Error fetching navbar: TypeError: Failed to fetch" linea 16 de navbarjs, pero si se quitan los fetch de login y register funciona, intente
metiendo async, await, borrandoloxd, nada funca, tambien intente borrar logout.js para que no me quite del indexhtml y tampoco es flipante