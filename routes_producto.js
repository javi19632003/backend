const express         = require('express');
const { Router }      = express; 
const ClasProd        = require('./clases.js');
const c1              = new ClasProd('productos.json');
const router_producto = Router();

// Lista todos los productos
router_producto.get('/', async function (req, res) {
  let resultado = await c1.getAll();
  if(resultado !== null){
    res.status(200).send(resultado)
} else {
    res.status(400).send({error: -1, descripcion: 'No hay Productos para mostrar'})
}
});

// mostramos un producto según su id
router_producto.get('/:id', async function (req, res) {
  let resultado = await c1.getById(Number(req.params.id));
  if(resultado !== null){
        res.status(200).send(resultado)
    } else {
        res.status(400).send({error: -1, descripcion: 'producto no encontrado'})
    }
});

// damos de alta un nuevo producto
router_producto.post('/', async function (req, res) {
  if (req.body.admin) {
    let resultado  = await c1.save(req.body.data)
    if(resultado !== null){
          res.status(201).send({id: resultado});
    } else {
          res.status(400).send({error: -1, descripcion:'el producto no pudo darse de alta'})
      }
    } else {
      res.status(400).send({error: -1, descripcion: "No es administrador, no puede usar POST"})
  }  
});

// actualizamos un producto
router_producto.put('/:id', async function (req, res) {
  if (req.body.admin) {
    let resultado  = await c1.rewriteById(req.body.data)
    if(resultado == 1){
      res.status(200).send({estado: 'Ok'})
    } else {
      res.status(400).send({error:  -1, descripcion: 'No se pudo actualizar'})
    }
  } else {
      res.status(400).send({error: -1, descripcion: "No es administrador, no puede usar PUT"})
  }  
});


//Borramos un producto
router_producto.delete('/:id', async function (req, res) {
  if (req.body.admin) {
    let resultado = await c1.deleteById(Number(req.params.id));
    if(resultado !== -1){
        res.status(200).send({estado: 'Ok'})
      } else {
          res.status(400).send({error: -1, descripcion: 'producto no encontrado'})
      }
    } else {
      res.status(400).send({error: -1, descripcion: "No es administrador, no puede usar DELETE"})
  }  
      
});

//ruta no declarada

router_producto.get('*', function (req, res) {
  console.log(req.route)
  res.status(400).send({error: -1, descripcion:  'ruta fea metodo GET no autorizada'})
});

router_producto.post('*', function (req, res) {
  console.log(req.route)
  res.status(400).send({error: -1, descripcion:  'ruta fea metodo POST no autorizada'})
});

router_producto.delete('*', function (req, res) {
  console.log(req.body)
  res.status(400).send({error: -1, descripcion:  'ruta fea metodo DELETE no autorizada'})
});

router_producto.put('*', function (req, res) {
  console.log(req.body)
  res.status(400).send({error: -1, descripcion:  'ruta fea metodo PUT no autorizada'})
});

module.exports = router_producto;