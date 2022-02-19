const cl_Carrito= require("../clases/carritoClase.js");

const express = require('express');
const router = express.Router();

let carrito = new cl_Carrito;


router.get('/carrito/:id/productos', (req, res) => {

    try {
        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
            const carritoProductos = await carrito.obtenerProductosPorCarritoId(req.params.id);
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
            console.log(req.body);
            const idCarroGenerado = await carrito.generarCarro();
            res.send(JSON.stringify(idCarroGenerado));
            
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
                await carrito.guardarProductosPorCarritoId(req.params.id,req.body);
                res.send(JSON.stringify(carrito));

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
                const carritoEliminado = await carrito.borrarCarritoPorId(req.params.id) ;
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
                const productoDeCarritoEliminado = await carrito.borrarPorIdCarritoIdProducto(req.params.id,req.params.id_prod) ;
                res.send(`id carrito: ${req.params.id} y Producto eliminado del carrito:${JSON.stringify(productoDeCarritoEliminado)}`);

            }

        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});




module.exports = router;


