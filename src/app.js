
const express           = require('express');
const router_producto   = require('./rutas/routes_producto.js')
const router_carrito    = require('./rutas/routes_carrito.js')
const app               = express()
const PORT              = process.env.PORT || 8080; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + "/public"));

app.use('/api/productos', router_producto)
app.use('/api/carrito', router_carrito)

app.listen(PORT, () =>{
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})
