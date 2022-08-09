import mongoose from "mongoose";

if (process.env.SELECTED_DB == "mongo"){
    try {
        mongoose.connect( 
            process.env.MONGO_DB_URI,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
           
        )  
        console.log("conectado")
    } catch (error) {
        throw new Error(error)        
    }
}

class ContenedorMongo {
    constructor(nombreColeccion){
        this.coleccion = nombreColeccion  
    }


    async mostrarTodos() {
        try {
            console.log(this.coleccion)
            const resultado = await this.coleccion.find()
            return resultado
        } catch (error) {
            throw new Error(error)        
        }
    }

    async guardarElemento(nuevoElemento){
        try {
            const nuevo = new this.coleccion(nuevoElemento)
            nuevo.save( function(err, prod){
                if (err) return console.error(err);
                    console.log(prod);
                    
            })
            return {"OK":"OK"} 
        } catch (error) {
            throw new Error(error)
        }
    }

    async mostrarPorId(id){
        try {
            const resultado = await this.coleccion.findOne({id: id})
            return resultado
        } catch (error) {
            return error
        }
    }

    async actualizar(id, nuevaData){
        try {
            const elementoActualizado = this.coleccion.findOneAndUpdate({id:id}, {$set: nuevaData})
            return elementoActualizado
        } catch (error) {
            throw new Error(error)
        }
    }

    async eliminarPorId(id){
        try {
            const elementoeliminado = await this.coleccion.deleteOne({id: id})
            return elementoeliminado
            
        } catch (error) {
            throw new Error(error)
        }
    }
}

export {ContenedorMongo}