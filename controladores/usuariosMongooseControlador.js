import { usuariosMongoose } from '../models/usuariosMongoose.js';
import logger from '../logger.js'

export async function obtenerUsuarioMongoose(usuarioBuscado, accionARealizar) {
    //DENTRO DE ACCION A REALIZAR PUEDE SER REGISTRAR O LOGIN    
    let usuariosEnMongoDbAtlas = await usuariosMongoose.find();
    logger.info("CONSOLE.LOG-> USUARIO PARA GRABAR:", usuarioBuscado);
    logger.info("CONSOLE.LOG-> USUARIOS OBTENIDOS DE MONGODB_ATLAS:", usuariosEnMongoDbAtlas);
    const usuarioEncontrado = usuariosEnMongoDbAtlas.find(usuario => (usuario.nombreUsuario == usuarioBuscado.nombreUsuario && usuario.emailUsuario == usuarioBuscado.emailUsuario));
    logger.info("CONSOLE.LOG-> EXISTE USUARIO EN BASE DE MONGO ATLAS:", usuarioEncontrado);
    switch (accionARealizar) {
        case 'REGISTRAR':
            if (usuarioEncontrado == undefined) {
                const usuarioCreado = usuariosMongoose(usuarioBuscado);
                usuarioCreado
                    .save()
                    .catch((error) => res.status(500).json({ mensajeError: error }));
                    logger.info("CONSOLE.LOG-> POST DE REGISTRO DE USUARIOS.USUARIO MONGOOSE:", usuarioCreado);
                return 'USUARIO REGISTRADO';
            }
            else {

                return 'USUARIO EN BASE DE DATOS';
            }
        case 'LOGIN':
            if (usuarioEncontrado) {
             return 'USUARIO VALIDO';       
            }
            else {

                return 'USUARIO NO AUTORIZADO';
            }

        default:
            return 'ERROR EN ACCION A REALIZAR';
           




    }//FIN DEL SWITCH


}  