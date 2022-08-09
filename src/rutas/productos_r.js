import {Router} from 'express'
//import { isAdministrator } from '../middlewares/index.js'
import {productosApi} from '../controladores/index.js'

const rutaProductos = Router()

rutaProductos.get('/:id?', async (req, res) => {
    try {
        const {id} = req.params
        if(id){
            const producto = await productosApi.mostrarPorId(id)
            return producto ? res.json(producto) : res.json({message: 'Producto no encontrado'})
        }
        const productos = await productosApi.mostrarTodos()
        res.json(productos) 
    } catch (error) {
        res.json(error)
    }

})
    

rutaProductos.post('/', async (req, res) => {
    const { id,nombre,descripcion,precio,foto } = req.body.data
    const { admin }  = req.body
    const timestamp  = Date.now()
    if (!admin) return res.send('Debe ser Administrador para utilizar este recurso')
    if(!nombre || !precio || !foto) return res.send('Debe completar todos los campos')
    const respuesta = await productosApi.guardarElemento({id,timestamp,nombre,descripcion,precio,foto})
    
    res.json(respuesta)
   
    
})

rutaProductos.put('/:id', async (req, res) => {
    const {id} = req.params
    const {nombre,descripcion,precio,foto} = req.body.data
    const { admin }                        = req.body
    if (!admin) return res.send('Debe ser Administrador para utilizar este recurso')

    const respuesta = await productosApi.actualizar(id, {nombre,descripcion,precio,foto})

    res.json(respuesta)
})

rutaProductos.delete('/:id?', async (req,res) => {
    const {id}    = req.params
    const {admin} = req.body
    if (!admin) return res.send('Debe ser Administrador para utilizar este recurso')
   if(id){
        const respuesta = await productosApi.eliminarPorId(id)
        res.json(respuesta)
        return
    }
})



export {rutaProductos}