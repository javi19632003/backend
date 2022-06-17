
const express = require('express');
const { Router } = express; 
const Contenedor = require('./clases.js');
const c1         = new Contenedor("productos.json");
const router = Router();

router.get('/productos', async function (req, res) {
  let resultado = await c1.getAll();
  res.json(resultado)

});

router.post('/productos/', function (req, res) {
  res.send('productos con id');
});

router.get('/productos/:id', async function (req, res) {
  let resultado = await c1.getById(Number(req.params.id));
  res.json(resultado)
});

router.put('/productos/:id', function (req, res) {
  res.send('productos con id');
});

router.delete('/productos/:id', function (req, res) {
  res.send('productos con id');
});

module.exports = router;