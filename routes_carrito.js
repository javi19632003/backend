
const express            = require('express');
const { Router }         = express; 
const Carrito            = require('./carrito.js');
const MiCarrito          = new Carrito();
const router_carrito     = Router();

// Mostramos todos los productos
router_carrito.get('/', function (req, res) {
  let resultado = MiCarrito.getAll();

  if(resultado !== null){
        res.send(resultado)
    } else {
        res.status(400).send({error: -1, descripcion: 'No hay productos en el carro de compras'})
    }

});

// mostramos un producto según su id
router_carrito.get('/:id', function (req, res) {
  let resultado = MiCarrito.getById(Number(req.params.id));
  if(resultado !== null){
        res.status(200).send(resultado)
    } else {
        res.status(400).send({error: -1, descripcion: 'producto no encontrado en el carro de compras'})
    }

  });

// damos de alta un nuevo producto

router_carrito.post('/', function (req, res) {
  let resultado  = MiCarrito.add(req.body)
    if(resultado !== null){
        res.status(201).send({id: resultado});
     } else {
        res.status(400).send({error: -1, descripcion: 'el producto no pudo sacarse del carro de compras'})
    }
 });
  
// actualizamos un producto
router_carrito.put('/:id', function (req, res) {
  let resultado  = MiCarrito.rewriteById(req.body)
  if(resultado !== null){
    res.status(200).send({ok: "Ok"});
  } else {
    res.status(400).send({error: -1, descripcion: 'No existe el prodcuto en el carro de compras'})
  }
});

//Borramos un producto
router_carrito.delete('/productos/:id', function (req, res) {
  let resultado = MiCarrito.deleteById(Number(req.params.id));
  if(resultado !== -1){
    res.status(200).send({ok: "Ok"});
    } else {
        res.status(400).send({error: -1, descripcion:  'producto no encontrado en el carro de compras'})
    }  
});

//ruta no declarada
router_carrito.post('*', function (req, res) {
  console.log(req.route)
  res.status(400).send({error: -1, descripcion:  'ruta fea metodo POST no autorizada'})
});

router_carrito.delete('*', function (req, res) {
  console.log(req.body)
  res.status(400).send({error: -1, descripcion:  'ruta fea metodo DELETE no autorizada'})
});

router_carrito.put('*', function (req, res) {
  console.log(req.body)
  res.status(400).send({error: -1, descripcion:  'ruta fea metodo PUT no autorizada'})
});

module.exports = router_carrito;