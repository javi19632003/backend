
const express  = require('express');
const router   = require('./routes.js')
const app      = express()
const PORT     = 8080;


app.set('view engine', 'pug');
app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

app.set('productos', 'views');
app.set('productosPug', 'views');
app.set('productosEjs', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + "/public"));


app.use('/api', router)

app.listen(PORT, () =>{
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})
