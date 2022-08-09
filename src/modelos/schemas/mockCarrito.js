import mongoose from "mongoose";
import { Carrito } from "./carrito.js";

CRUD();

async function CRUD() {
  try {
    mongoose.connect(
      "mongodb://localhost:27017/ecommerce",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado a MongoDB");

    /* -------------------------------------------------------*/
    /* ------------------------- CREATE ----------------------*/
    /* -------------------------------------------------------*/

    console.log("CREATE");
    const carritoData =[
        {"nombre":"Alejandro",
         "productos":[],
         "id":1
        }
  ];

    carritoData.forEach(async (carrito) => {
      const carritoNuevo = new Carrito(carrito);
      await carritoNuevo.save();
    });

    //Producto.insertMany(productoData, (error, docs) => {
      //   if (error) {
      //       console.log(error);
      //   } else {
      //       console.log(docs);
      //   }
    // });

    // mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
}
