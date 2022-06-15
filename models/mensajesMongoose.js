import mongoose from "mongoose";

const schema = mongoose.Schema({
  idMensaje: { type: String, require: true },
  autor: {
    email: { type: String, require: true },
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: String, require: true },
    alias: { type: String, require: true },
    avatar: { type: String, require: true },
  },
  timestamp: { type: Date, default: new Date() },
});

export const mensajesMoongoose = mongoose.model("mensajes", schema);

