import mongoose from "mongoose";


const schema = mongoose.Schema({
  id: { type: Number, require: true },
  nombreProducto: { type: String, require: true },
  precio: { type: Number, require: true },
  urlProducto: { type: String, require: true }
});

export const productosMongoose = mongoose.model("productosMongoose", schema);
