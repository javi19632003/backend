const { v4: uuidv4 } = require('uuid');

class Carrito {
    constructor(){
        this.id = uuidv4();
        this.timestamp      = Date.now()
        this.contenidoCar   = [];
    }
    add (obj){
        try {
            let idNew = 0;
            this.contenidoCar.forEach(ele => {
                if(ele.id > idNew){
                    idNew = ele.id;
                }
            });
            idNew         = idNew + 1;
            obj.id        = idNew;
            obj.timestamp = Date.now()
            this.contenidoCar.push(obj);
            let resultado = this.getById(idNew)
            console.log(resultado)
            return resultado;
        }
        catch(err){
            return null;
        }
    }   

    getById(id){
        let obj = null;
        try {
            const unProducto = this.contenidoCar.find( ( elemento ) => elemento.id === id)
            if (unProducto){
                obj = {"id": this.id,
                    "timestamp": this.timestamp,
                    "productos": unProducto}
            }
            return obj;    
        }
        catch(err){
           return null;
        }
    }
    getAll(){
        try {
            return  obj = {"id": this.id,
            "timestamp": this.timestamp,
            "productos": this.contenidoCar};    
        }
        catch(err){
            return null;
        }

    }        
    deleteById(id){

        try {
            const miIndice = this.contenidoCar.findIndex( ( producto ) => producto.id === id ? true : false )
            if (miIndice !== -1){
                this.contenidoCar.splice( miIndice, 1 )      
                return 1;
            }
         
            return -1;
        }
        catch(err){
            return -1;
        }
    } 

    // Borro todo       
    deleteAll(){
        this.contenidoCar = [];
        return null
    }    

    writeAll(contenidoCar){
        try {
            this.contenidoCar = contenidoCar ; 
        }
        catch(err){
            console.log('error en escritura: ', err)
        }

}        
    //modificaciones    
    rewriteById(miProducto){
        try {
            const miIndice = this.contenidoCar.findIndex( ( producto ) => producto.id === miProducto.id ? true : false )
            if (miIndice !== -1){
                this.contenidoCar( miIndice) = miProducto
                return 1      
            }
            return -1;
        }
        catch(err){
            return -1
        }
         
}    

}

module.exports =  Carrito;