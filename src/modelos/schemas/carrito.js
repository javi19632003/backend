import mongoose from "mongoose";
//mongoose.pluralize(null);
const carritoCollection = "carritos";

const carritoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  productos: [
    {
        idProducto: Number,
    }
],
  nombre: { type: String, required: true, max: 100 }
}, {
  versionKey: false 
});

export const carritos = mongoose.model(
  carritoCollection,
  carritoSchema
);
