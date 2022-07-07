const { v4: uuidv4 } = require('uuid');
const ClasProd       = require('./clases.js');
const c1             = new ClasProd('productos.json');

class Carrito {
    constructor(){
        this.id             = null;
        this.timestamp      = null;
        this.contenidoCar   = [];
    }

    // Crea un nuevo carrito de compras
    creoCarrito(){
        try {
            this.id             = uuidv4();
            this.timestamp      = Date.now();
            this.contenidoCar   = [];
            return this.id    
        }
        catch(err){
            return null;
        }

    };

    // Borra el carrito creado y lo limpia
    borroCarrito(id){
        if(this.id == id){
            try {
                this.id             = null;
                this.timestamp      = null;
                this.contenidoCar   = [];
                return 1    
            }
            catch(err){
                return null;
            }
        } else { return null }    
    };

    // sumo un producto al carrito
    async sumoProducto(idProd){
        let resultado = await c1.getById(Number(idProd));
        if(resultado !== null){
            this.contenidoCar.push(resultado);
            return 1;
        } else { 
            return null
        }
    }   
   // muestra todos los productos del carrito 
    miroProductos(idCar){
        if (this.id == idCar){
            return this.contenidoCar
        } else { return null}
    }        


    //Borra un producto del carrito
    borraProducto(id, id_prod){
        if (this.id == id){
           const miIndice = this.contenidoCar.findIndex( ( producto ) => producto.id == id_prod ? true : false )
           if (miIndice !== -1){
               this.contenidoCar.splice( miIndice, 1 )  
               return 1;
           } else { 
               return null;
           }
        } else {
            return null
        }
    }        
}

module.exports =  Carrito;