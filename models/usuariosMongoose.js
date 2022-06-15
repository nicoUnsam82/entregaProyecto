import mongoose from "mongoose";


const schema = mongoose.Schema({
  username: { type: String, require: true },
  // emailUsuario:  { type: String, require: true },
  password: { type: String, require: true }
  });
  
  export const usuariosMongoose = mongoose.model("usuariosMongoose", schema);
  
