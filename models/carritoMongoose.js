import mongoose from "mongoose";

const schema = mongoose.Schema({

    idCarrito: { type: Number, require: true },
    id: { type: Number, require: true },
    nombreProducto: { type: String, require: true },
    precio: { type: Number, require: true },
    urlProducto: { type: String, require: true }
});

export const carritoMongoose = mongoose.model("carritoMongoose", schema);