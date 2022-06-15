import { productosMongoose } from '../models/productosMongoose.js';
import logger from '../logger.js'

export async function guardarProductoMongoose(productoGuardar) {
    try {
        let productosEnMongoose = await productosMongoose.find();
        let largoArrayObjetos = productosEnMongoose.length;
        let idMasAlto = 0;
        if (largoArrayObjetos > 0) {
            idMasAlto = productosEnMongoose.reduce((anterior, proximo) => anterior > proximo.id ? anterior : proximo.id, 0);

        }//FIN DEL IF
        const idAsignar = idMasAlto + 1;
        const producto = {
            id: idAsignar,
            nombreProducto: productoGuardar.nombreProducto,
            precio: productoGuardar.precio,
            urlProducto: productoGuardar.urlProducto
        };
        const productoEnMongoose = productosMongoose(producto);
        productoEnMongoose
            .save()
            .catch((error) => res.status(500).json({ mensajeError: error }));
        /*const productoADevolver = {
            id: productoEnMongoose.id,    
            nombreProducto:productoEnMongoose.nombreProducto,
            precio:  productoEnMongoose.precio,
            urlProducto:productoEnMongoose.urlProducto,
            _id: productoEnMongoose._id, 
        };*/

        logger.info("CONSOLE.LOG ->PRODUCTO GUARDADO EN MONGOOSE:", productoEnMongoose);
        return productoEnMongoose;

    }//FIN DEL TRY
    catch (e) {

        logger.error(new Error("ERROR EN GENERACION EN GUARDAR OBJETO EN MONGOOSE "));
        throw (e);



    }//FIN DEL CATCH


}

export async function obtenerProductosMongoose() {

    try {
        let productosEnMongoose = await productosMongoose.find();
        logger.info("CONSOLE.LOG-> PRODUCTOS OBTENIDOS POR MONGOOSE:", productosEnMongoose);
        return productosEnMongoose;

    }//FIN DEL TRY
    catch (e) {

        logger.error(new Error("ERROR EN OBTENER TODOS LOS OBJETOS EN MONGOOSE"));
        throw (e);


    }//FIN DEL CATCH




}


export async function obtenerProductosPorIdMongoose(idDeBusqueda) {

    try {
        if (isNaN(idDeBusqueda)) {
            return { error: "el parametro no es numero" };

        }
        let productoPorIdEnMongoose = await productosMongoose.where({ id: idDeBusqueda });
        logger.info("CONSOLE.LOG-> PRODUCTO OBTENIDO POR ID EN MONGOOSE:", productoPorIdEnMongoose);
        return productoPorIdEnMongoose;

    }//FIN DEL TRY
    catch (e) {

        logger.error(new Error("ERROR EN OBTENER PRODUCTO POR ID EN MONGOOSE"));
        throw (e);


    }//FIN DEL CATCH

}

export async function actualizarProductoPorIdMongoose(idBusqueda, objeto) {

    try {
        if (isNaN(idBusqueda)) {
            return { error: "el parametro no es numero" };

        }
        let productoPorIdActualizadoEnMongoose = await productosMongoose.updateOne({ id: idBusqueda }, objeto);
        logger.info("CONSOLE.LOG-> PRODUCTO OBTENIDO POR ID EN MONGOOSE:", productoPorIdActualizadoEnMongoose);
        return productoPorIdActualizadoEnMongoose;

    }//FIN DEL TRY
    catch (e) {

        logger.error(new Error("ERROR EN ACTUALIZAR PRODUCTO POR ID EN MONGOOSE"));
        throw (e);


    }//FIN DEL CATCH

}


export async function borrarObjetoPorIdMongoose(idBusqueda) {

    try {
        let productoEliminadoPorId = await productosMongoose.deleteOne({ id: idBusqueda });
        return productoEliminadoPorId;


    }//FIN DEL TRY
    catch (e) {

        logger.error(new Error("ERROR EN BORRAR OBJETO POR ID EN MONGOOSE"));
        throw (e);


    }//FIN DEL CATCH



}