import { Persistencia } from '../configuracionDePersistencia.js';
import { Router } from 'express';
import logger from '../logger.js'
const router = Router();

router.get('/carrito/:id/productos', (req, res) => {

    try {
        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                const carritoProductos = await Persistencia('CARRITO', 'MEMORIA', 'OBTENERPRODUCTOSENCARRITO', req.params.id, 'NULL');
                res.send(JSON.stringify(carritoProductos));
            }//FIN DEL ELSE
        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});

router.post('/carrito', (req, res) => {
    try {
        (async () => {
            logger.info('CONSOLE.LOG-> POST EN /CARRITO:', req.body);
            const idCarritoGenerado = await Persistencia('CARRITO', 'MEMORIA', 'GENERARCARRITO', 'NULL', 'NULL');
            res.send(JSON.stringify(idCarritoGenerado));

        }//FIN ASYNC
        )();
    }
    catch (e) {


        res.send(e);

    }


});

router.post('/carrito/:id/productos', (req, res) => {

    try {
        (async () => {

            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                const productoGuardadoEnCarrito = await Persistencia('CARRITO', 'MEMORIA', 'GUARDARPRODUCTOENCARRITO', req.params.id, req.body);
                res.send(JSON.stringify(productoGuardadoEnCarrito));

            }

        }//FIN ASYNC

        )();

    }
    catch (e) {

        res.send(e);


    }

});

router.delete('/carrito/:id', (req, res) => {
    try {

        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                const carritoEliminado = await Persistencia('CARRITO', 'MEMORIA', 'BORRARCARRITOPORID', req.params.id, 'NULL');
                res.send(`id eliminado: ${req.params.id} y carritoProducto eliminado:${JSON.stringify(carritoEliminado)}`);

            }

        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});

router.delete('/carrito/:id/productos/:id_prod', (req, res) => {
    try {

        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                const productoDeCarritoEliminado = await Persistencia('CARRITO', 'MEMORIA', 'BORRARPORIDCARRITOIDPRODUCTO', req.params.id, req.params.id_prod);
                res.send(`id carrito: ${req.params.id} y Producto eliminado del carrito:${JSON.stringify(productoDeCarritoEliminado)}`);

            }

        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});




export default router;
