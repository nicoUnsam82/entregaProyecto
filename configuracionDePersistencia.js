import cl_Contenedor from "./clases/contenedor.js";
import cl_Carrito from "./clases/carritoClase.js";
import { guardarProductoMongoose, obtenerProductosMongoose, obtenerProductosPorIdMongoose, actualizarProductoPorIdMongoose, borrarObjetoPorIdMongoose } from './controladores/productosMoongooseControlador.js'
import logger from './logger.js'

const contenedor = new cl_Contenedor;
const carrito = new cl_Carrito;

export async function Persistencia(tipoElemento, seleccionPersistencia, tipoAccion, informacionUno, informacionDos) {

    logger.info('DATOS QUE LLEGAN A LA FUNCION PERSISTENCIA', tipoElemento, seleccionPersistencia, tipoAccion, informacionUno, informacionDos);
    const tipoElementoSeleccionado = tipoElemento;
    const seleccionPersistenciaSeleccionada = seleccionPersistencia;
    const tipoAccionSeleccionado = tipoAccion;
    const informacionUnoEnviada = informacionUno;
    const informacionDosEnviada = informacionDos;

    switch (seleccionPersistenciaSeleccionada) {

        case 'MEMORIA':
            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'OBTENERPRODUCTOS') {

                const todosLosProductos = await contenedor.obtenerObjetoEnProductos();

                return todosLosProductos;

            }
            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'GUARDARPRODUCTO') {

                const productoGuardado = await contenedor.guardar(informacionUnoEnviada);

                return productoGuardado;

            }

            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'OBTENERPRODUCTOPORID') {

                const productoPorId = await contenedor.obtenerObjetoPorId(informacionUnoEnviada);

                return productoPorId;

            }

            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'ACTUALIZARPRODUCTOPORID') {

                const productoActualizadoPorId = await contenedor.actualizarObjetoPorId(informacionUnoEnviada, informacionDosEnviada);

                return productoActualizadoPorId;

            }
            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'BORRARPRODUCTOPORID') {

                const productoBorrado = await contenedor.borrarObjetoPorId(informacionUnoEnviada);

                return productoBorrado;

            }
            if (tipoElementoSeleccionado == 'CARRITO' && tipoAccionSeleccionado == 'OBTENERPRODUCTOSENCARRITO') {

                const productosEnCarrito = await carrito.obtenerProductosPorCarritoId(informacionUnoEnviada);
                return productosEnCarrito;
            }

            if (tipoElementoSeleccionado == 'CARRITO' && tipoAccionSeleccionado == 'GENERARCARRITO') {

                const idCarroGenerado = await carrito.generarCarro();
                return idCarroGenerado;
            }

            if (tipoElementoSeleccionado == 'CARRITO' && tipoAccionSeleccionado == 'GUARDARPRODUCTOENCARRITO') {

                const productoGuardadoEnCarrito = await carrito.guardarProductosPorCarritoId(informacionUnoEnviada, informacionDosEnviada);
                return productoGuardadoEnCarrito;
            }

            if (tipoElementoSeleccionado == 'CARRITO' && tipoAccionSeleccionado == 'BORRARCARRITOPORID') {

                const carritoBorrado = await carrito.borrarCarritoPorId(req.params.id);
                return carritoBorrado;
            }

            if (tipoElementoSeleccionado == 'CARRITO' && tipoAccionSeleccionado == 'BORRARPORIDCARRITOIDPRODUCTO') {

                const productoBorradoDelCarrito = await carrito.borrarPorIdCarritoIdProducto(informacionUnoEnviada, informacionDosEnviada);
                return productoBorradoDelCarrito;
            }

            else {

                logger.warn('CONSOLE.LOG -> CASE MEMORIA:NO ENTRO A NINGUN IF');
                break;

            }

        case 'MONGOOSE':
            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'GUARDARPRODUCTO') {

                const productoGuardado = await guardarProductoMongoose(informacionUnoEnviada);

                return productoGuardado;

            }

            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'OBTENERPRODUCTOS') {

                const todosLosProductos = await obtenerProductosMongoose();

                return todosLosProductos;

            }

            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'OBTENERPRODUCTOPORID') {

                const productoPorId = await obtenerProductosPorIdMongoose(informacionUnoEnviada);

                return productoPorId;

            }
            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'ACTUALIZARPRODUCTOPORID') {

                const productoActualizadoPorId = await actualizarProductoPorIdMongoose(informacionUnoEnviada, informacionDosEnviada);

                return productoActualizadoPorId;

            }
            if (tipoElementoSeleccionado == 'PRODUCTOS' && tipoAccionSeleccionado == 'BORRARPRODUCTOPORID') {

                const productoBorrado = await borrarObjetoPorIdMongoose(informacionUnoEnviada);

                return productoBorrado;

            }
            else {

                logger.warn('CONSOLE.LOG -> CASE MONGOOSE:NO ENTRO A NINGUN IF');
                break;

            }

        default:
            logger.warn('CONSOLE.LOG -> FUNCION PERSISTENCIA ENTRO AL DEFAULT DEL SWITCH CASE');
            break;

    }//FIN DE SWITCH

}