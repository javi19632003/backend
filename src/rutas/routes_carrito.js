
const express            = require('express');
const { Router }         = express; 
const Carrito            = require('../controladores/carrito.js');
const MiCarrito          = new Carrito();
const router_carrito     = Router();


// Crea un nuevo carrito de compras
router_carrito.post('/', function (req, res) {
  let resultado  = MiCarrito.creoCarrito()
     if(resultado !== null){
        res.status(201).send({id: resultado});
     } else {
        res.status(400).send({error: -1, descripcion: 'No se pudo crear el Carro de Compras'})
    }
 });
 
 // borra y limpia un carrito
 router_carrito.delete('/:id', function (req, res) {
  let resultado  = MiCarrito.borroCarrito(req.params.id)
    if(resultado !== null){
        res.status(201).send({ok: "OK"});
     } else {
        res.status(400).send({error: -1, descripcion: 'No se pudo Borrar el Carro de Compras'})
    }
 });

// Doy de alta un producto por su id en el carrito
router_carrito.post('/:id/productos', async function (req, res) {
  let resultado  =  await MiCarrito.sumoProducto(req.params.id)
  if(resultado !== null){
        res.status(200).send({ok: "OK"});
  } else {
        res.status(400).send({error: -1, descripcion: 'No se encontó el producto'})
  }
 });


// Mostramos todos los productos de un determinado carrito
router_carrito.get('/:id/productos', function (req, res) {
  let resultado = MiCarrito.miroProductos(req.params.id);
  if(resultado !== null){
        res.send(resultado)
    } else {
        res.status(400).send({error: -1, descripcion: 'No hay productos en el carro de compras'})
    }

});

 // borra un producto del carrito
 router_carrito.delete('/:id/productos/:id_prod', function (req, res) {
  let resultado  = MiCarrito.borraProducto(req.params.id, req.params.id_prod)
    if(resultado !== null){
        res.status(201).send({ok: "OK"});
     } else {
        res.status(400).send({error: -1, descripcion: 'No se pudo Borrar el producto del Carro de Compras'})
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

router_carrito.get('*', function (req, res) {
  console.log(req.route)
  res.status(400).send({error: -1, descripcion:  'ruta carrito metodo GET no autorizada'})
});

router_carrito.post('*', function (req, res) {
  console.log(req.route)
  res.status(400).send({error: -1, descripcion:  'ruta carrito metodo POST no autorizada'})
});

router_carrito.delete('*', function (req, res) {
  console.log(req.body)
  res.status(400).send({error: -1, descripcion:  'ruta carrito metodo DELETE no autorizada'})
});

router_carrito.put('*', function (req, res) {
  console.log(req.body)
  res.status(400).send({error: -1, descripcion:  'ruta carrito metodo PUT no autorizada'})
});

module.exports = router_carrito;