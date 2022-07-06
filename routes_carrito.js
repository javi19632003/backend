
const express    = require('express');
const { Router } = express; 
const ClasProd   = require('./clases.js');
const c1         = new ClasProd();
const router_carrito     = Router();

// Mostramos todos los productos
router_carrito.get('/productos', function (req, res) {
  let resultado = c1.getAll();

  if(resultado !== null){
        res.send(resultado)
    } else {
        res.status(400).send({error: 'No hay productos'})
    }

});
// damos de alta un nuevo producto
router_carrito.post('/productos/', function (req, res) {
  let resultado  = c1.save(req.body)
    if(resultado !== null){
        res.status(201).send(resultado);
  } else {
        res.status(400).send({error: 'el producto no pudo darse de alta'})
    }
 
 });
// mostramos un producto según su id
router_carrito.get('/productos/:id', function (req, res) {
  let resultado = c1.getById(Number(req.params.id));
  if(resultado !== null){
        res.status(200).send(resultado)
    } else {
        res.status(400).send({error: 'producto no encontrado'})
    }
});
// actualizamos un producto
router_carrito.put('/:id', function (req, res) {
  let resultado  = c1.rewriteById(req.body)
  if(resultado !== null){
    res.sendStatus(200)
  } else {
    res.status(400).send({error: 'No hay productos'})
  }
});

//Borramos un producto
router_carrito.delete('/productos/:id', function (req, res) {
  let resultado = c1.deleteById(Number(req.params.id));
  if(resultado !== -1){
        res.senStatus(200)
    } else {
        res.status(400).send({error: 'producto no encontrado'})
    }  
});

module.exports = router_carrito;