
const express    = require('express');
const router     = require('./routes.js')
//const Contenedor = require('./clases.js');
//const c1         = new Contenedor("productos.json");
const app        = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
app.get('/productos', async function  (req, res) {
  let resultado = await c1.getAll();
    res.json(resultado)
  })
  
  app.get('/productoRandom/:id', async (req, res) => {
    console.log(req.params.id)
    let resultado = await c1.getById(Number(req.params.id));
    res.json(resultado)
  })
*/
const PORT = 8080;
app.use('/api', router)
app.listen(PORT, () =>{
    console.log(`Servidor Http escuchando en el puerto 8080`)
})