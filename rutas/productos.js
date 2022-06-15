import { Persistencia } from '../configuracionDePersistencia.js';
import { Router } from 'express';
import logger from '../logger.js'
const productos = Router();

//OPCIONES DE PERSISTENCIA SON MEMORIA O MONGOOSE
productos.get('/productos', (req, res) => {

    try {
        (async () => {
            //const productos = await Persistencia ('PRODUCTOS','MEMORIA','OBTENERPRODUCTOS','NULL','NULL');
            const productos = await Persistencia('PRODUCTOS', 'MONGOOSE', 'OBTENERPRODUCTOS', 'NULL', 'NULL');
            res.send(JSON.stringify(productos));
            logger.info('CONSOLE.LOG -> GET DE PRODUCTOS:', productos);
        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});

productos.post('/productos', (req, res) => {
    try {
        (async () => {
            logger.info("CONSOLE.LOG ->POST PRODUCTOS:", req.body);
            //const producto = await Persistencia ('PRODUCTOS','MEMORIA','GUARDARPRODUCTO',req.body,'NULL');
            const producto = await Persistencia('PRODUCTOS', 'MONGOOSE', 'GUARDARPRODUCTO', req.body, 'NULL')
            res.send(JSON.stringify(producto));
            const productoDelPost = await Persistencia('PRODUCTOS', 'MONGOOSE', 'OBTENERPRODUCTOS', 'NULL', 'NULL');
            logger.info("CONSOLE.LOG ->PRODUCTO A EMITIR POR IO SOCKET EN RUTA DE POST:", productoDelPost);
            req.app.io.sockets.emit("actualizacion_productos", productoDelPost);
        }//FIN ASYNC
        )();
    }
    catch (e) {


        res.send(e);

    }


});

productos.get('/productos/:id', (req, res) => {

    try {
        (async () => {

            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {

                //const producto = await Persistencia ('PRODUCTOS','MEMORIA','OBTENERPRODUCTOPORID',req.params.id,'NULL');
                const producto = await Persistencia('PRODUCTOS', 'MONGOOSE', 'OBTENERPRODUCTOPORID', req.params.id, 'NULL');
                res.send(JSON.stringify(producto));
                logger.info('CONSOLE.LOG -> GET PRODUCTO/ID:', `${producto}`);

            }

        }//FIN ASYNC

        )();

    }
    catch (e) {

        res.send(e);


    }

});

productos.put('/productos/:id', (req, res) => {

    try {
        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                //const producto = await Persistencia ('PRODUCTOS','MEMORIA','ACTUALIZARPRODUCTOPORID',req.params.id,req.body);
                const producto = await Persistencia('PRODUCTOS', 'MONGOOSE', 'ACTUALIZARPRODUCTOPORID', req.params.id, req.body);
                res.send(`id actualizado ${req.params.id} y producto actualizado:${JSON.stringify(producto)}`);
                logger.info('CONSOLE.LOG ->ACTUALIZAR PRODUCTO POR ID:', `${producto}`);
            }
        }//FIN ASYNC
        )();

    }
    catch (e) {

        res.send(e);

    }

});

productos.delete('/productos/:id', (req, res) => {
    try {

        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                //const producto = await Persistencia ('PRODUCTOS','MEMORIA','BORRARPRODUCTOPORID',req.params.id,'NULL');
                const producto = await Persistencia('PRODUCTOS', 'MONGOOSE', 'BORRARPRODUCTOPORID', req.params.id, 'NULL');
                res.send(`id eliminado: ${req.params.id} y producto eliminado:${JSON.stringify(producto)}`);

            }

        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});

export default productos;


