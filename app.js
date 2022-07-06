
const express           = require('express');
const router_producto   = require('./routes_producto.js')
const router_carrito    = require('./routes_carrito.js')
const app               = express()
const PORT              = process.env.PORT || 8080; 


//app.set('view engine', 'pug');
//app.set('view engine', 'handlebars');
//app.set('view engine', 'ejs');

//app.set('productos', 'views');
//app.set('productosPug', 'views');
//app.set('productosEjs', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + "/public"));


app.use('/api/productos', router_producto)
//app.use('/api/carrito', router_carrito)

app.listen(PORT, () =>{
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})
