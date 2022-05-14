const cl_Contenedor = require("../clases/contenedor.js");
const cl_ContenedorMongoDb = require("../clases/contenedorMongoDb.js");
const express = require('express');
const router = express.Router();

let contenedor = new cl_Contenedor;
let contenedorMongoDb = new cl_ContenedorMongoDb;

router.get('/productos', (req, res) => {

    try {
        (async () => {
            const productos = await contenedor.obtenerObjetoEnProductos();
            res.send(JSON.stringify(productos));
            console.log(productos);
        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});

router.post('/productos', (req, res) => {
    try {
        (async () => {
            console.log(req.body);
            const producto = await contenedor.guardar(req.body);
            const productoGuardadoMongoDb = await contenedorMongoDb.guardarProducto(producto);//GUARDO EL PRODUCTO EN LA BASE DE MONGODB
            console.log(productoGuardadoMongoDb);
            res.send(JSON.stringify(producto));
            req.app.io.sockets.emit("actualizacion_productos", await contenedor.obtenerObjetoEnProductos());
        }//FIN ASYNC
        )();
    }
    catch (e) {


        res.send(e);

    }


});

router.get('/productos/:id', (req, res) => {

    try {
        (async () => {

            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                const producto = await contenedor.obtenerObjetoPorId(req.params.id);
                if (producto.length == 0) {
                    const productoMongoDb = await contenedorMongoDb.buscarProducto({ id: req.params.id })
                    if (productoMongoDb.length != 0) {

                        producto = productoMongoDb;

                    }//EN CASO DE QUE LO ENCONTRO EN MONGO LO COPIO A PRODUCTO   
                }//VERIFICO SI ESTA EN LA BASE DE MONGO Y NO EN MEMORIA

                res.send(JSON.stringify(producto));
                console.log(`${producto}`);

            }

        }//FIN ASYNC

        )();

    }
    catch (e) {

        res.send(e);


    }

});

router.put('/productos/:id', (req, res) => {

    try {
        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                const productoViejo = await contenedorMongoDb.buscarProducto({ id: req.params.id });
                const productoModificar = req.body;
                if (productoViejo.nombreProducto != productoModificar.nombreProducto) {
                    await contenedorMongoDb.modificarProducto({ id: req.params.id }, nombreProducto, productoModificar.nombreProducto);

                }
                if (productoViejo.precioProducto != productoModificar.precioProducto) {
                    await contenedorMongoDb.modificarProducto({ id: req.params.id }, precioProducto, productoModificar.precioProducto);

                }
                if (productoViejo.urlProducto != productoModificar.urlProducto) {
                    await contenedorMongoDb.modificarProducto({ id: req.params.id }, urlProducto, productoModificar.urlProducto);

                }
                const producto = await contenedor.actualizarObjetoPorId(req.params.id, req.body);
                res.send(`id actualizado ${req.params.id} y producto actualizado:${JSON.stringify(producto)}`);
                console.log(`${producto}`);
            }
        }//FIN ASYNC
        )();

    }
    catch (e) {

        res.send(e);

    }

});

router.delete('/productos/:id', (req, res) => {
    try {

        (async () => {
            if (isNaN(req.params.id)) {
                res.send({ error: "el parametro no es numero" });

            }
            else {
                const producto = await contenedor.borrarObjetoPorId(req.params.id);
                await contenedorMongoDb.borrarProducto({ id: req.params.id });//LO BORRAMOS DE LA BASE DE MONGO DB
                res.send(`id eliminado: ${req.params.id} y producto eliminado:${JSON.stringify(producto)}`);

            }

        }//FIN ASYNC
        )();
    }
    catch (e) {

        res.send(e);

    }

});

module.exports = router;


