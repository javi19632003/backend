
const fs = require("fs");


class ClasProd {
    constructor(archivo){
        this.archivo   = archivo;
    }

    async save (obj){
        try {
            const contenido = JSON.parse( await fs.promises.readFile(this.archivo,'utf-8'))
            let idNew = 0;
            contenido.forEach(ele => {
                if(ele.id > idNew){
                    idNew = ele.id;
                }
            });
            idNew         = idNew + 1;
            obj.id        = idNew;
            obj.timestamp = Date.now()
            contenido.push(obj);
            await this.writeAll(contenido);
            return idNew;
        }
        catch(err){
            console.log('error en lectura: ', err)
        }
    }   

    async getById(id){
        let obj = null;
        try {
            const contenido =  JSON.parse( await fs.promises.readFile(this.archivo,'utf-8'))
            const unProducto = contenido.find( ( elemento ) => elemento.id === id)
            if (unProducto){
                obj = unProducto
            }
            return obj;    
        }
        catch(err){
            console.log('error en lectura: ', err)
        }
    }
    async getAll(){
        let obj = null;
        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))
            return contenido;    
        }
        catch(err){
            console.log('error en lectura: ', err)
        }

    }        
    async deleteById(id){

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))
            const miIndice = contenido.findIndex( ( producto ) => producto.id === id ? true : false )
            if (miIndice !== -1){
                contenido.splice( miIndice, 1 )      
                await this.writeAll(contenido)
                return 1;
            } else { return -1}
        }
        catch(err){
            return -1;
        }
    } 

    // Borro todo       
    async deleteAll(){
        let contenido = [];
        await this.writeAll(contenido)
        return null
    }    

    async writeAll(contenido){
        try {
            await fs.promises.writeFile(this.archivo,JSON.stringify(contenido))
        }
        catch(err){
            console.log('error en escritura: ', err)
        }

        
}        
async rewriteById(obj){

    try {
        const borrado = await this.deleteById(obj.id);
        if (borrado == 1) {
            const contenido = JSON.parse( await fs.promises.readFile(this.archivo,'utf-8'))
            contenido.push(obj);
            const contenidoOrdenado = contenido.sort(this.SortArray);
            await this.writeAll(contenidoOrdenado);
            return 1;
        } else { return -1}
    }
    catch(err){
        return -1
    }
} 

SortArray(x, y){
    if (x.id < y.id) {return -1;}
    if (x.id > y.id) {return 1;}
    return 0;
}

}

module.exports =  ClasProd;