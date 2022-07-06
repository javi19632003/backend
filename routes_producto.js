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
    res.status(400).send({error: 'productos no encontrados'})
}
});

// damos de alta un nuevo producto
router_producto.post('/', async function (req, res) {
  let resultado  = await c1.save(req.body)
  console.log(resultado)
  
  if(resultado !== null){
        res.status(201).send({id: resultado});
  } else {
        res.status(400).send({error: 'el producto no pudo darse de alta'})
    }
 });
// mostramos un producto según su id
router_producto.get('/:id', async function (req, res) {
  let resultado = await c1.getById(Number(req.params.id));
  if(resultado !== null){
        res.status(200).send(resultado)
    } else {
        res.status(400).send({error: 'producto no encontrado'})
    }
});
// actualizamos un producto
router_producto.put('/', async function (req, res) {
  console.log(req.body)
  
  let resultado  = await c1.rewriteById(req.body)
  /*
  if(resultado == 1){
    res.status(200).send({Ok: 'Ok'})
  } else {
    res.status(400).send({error: 'No hay productos'})
  }
  */
  res.send("PUTO EL QUE LEE")
});

//Borramos un producto
router_producto.delete('/:id', async function (req, res) {
  console.log("entre en DELETE")
  let resultado = await c1.deleteById(Number(req.params.id));
  if(resultado !== -1){
        res.senStatus(200)
    } else {
        res.status(400).send({error: 'producto no encontrado'})
    }  
});


module.exports = router_producto;