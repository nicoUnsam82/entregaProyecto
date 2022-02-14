const cl_Contenedor= require("../clases/contenedor.js");


module.exports = class Carrito {
    productos = new cl_Contenedor;
    carrito =[];
    static idGlobal = 0;
    static idBorrados = [];


    constructor() {
        this.carrito;
        this.productos;
        this.idCarrito=0;
        this.horarioDeCreacionCarrito = Date.now()

    }//FIN DEL CONSTRUCTOR

    async generarCarro() {

        try {

            let largoArrayObjetos= this.productos.length;
            let idMasAlto= 0;
            if (largoArrayObjetos > 0) {
                idMasAlto = this.productos.reduce((anterior, proximo) => anterior > proximo.id ? anterior : proximo.id, 0);

            }//FIN DEL IF
            let largoIdBorrados =Contenedor.idBorrados.length;
            console.log(largoIdBorrados);
            switch(largoIdBorrados){

            case 0:
                this.idCarrito = idMasAlto + 1;
                return this.idCarrito;
            default:
                this.idCarrito =Contenedor.idBorrados[0]
                Contenedor.idBorrados.shift();
                return this.idCarrito;            

            }
  
        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN GENERACION EN GENERAR CARRITO"));
            throw (e);



        }//FIN DEL CATCH

        
    }//FIN DE METODO GUARDAR

    async obtenerProductosPorCarritoId(idBusqueda) {
        try {
            let id =parseInt(idBusqueda);
            const largoArrayCarrito = this.carrito.length;
            if (largoArrayCarrito > id) {
                const carrito = this.carrito.filter(idBuscado => idBuscado.idCarrito == id);
                return carrito.productos.obtenerObjetoEnProductos();
            }
            else {

                return { error : 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN OBTENER PRODUCTOS DE CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO OBTENER PRODUCTOS POR ID POR CARRITO

    
    async borrarCarritoPorId(idBusqueda) {
        try {

            const carritoBorrado = this.carrito.filter(idBuscado => idBuscado.idCarrito == idBusqueda);
            const largoCarritoBorrado = carritoBorrado.length;
            this.carrito = this.carrito.filter(idBuscado => idBuscado.idCarrito != idBusqueda);

            if (largoCarritoBorrado!= 0) {
                Contenedor.idBorrados.push(idBusqueda);
                return carritoBorrado;
            }
            else {

                return { error : 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN BORRAR CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO BORRAR CARRITO POR ID

    async guardarProductosPorCarritoId(idBusqueda,objeto) {
        try {
            let id =parseInt(idBusqueda);
            const largoArrayCarrito = this.carrito.length;
            if (largoArrayCarrito > id) {
                const carrito = this.carrito.filter(idBuscado => idBuscado.idCarrito == id);
                const carritoSinidActualizar= this.carrito.filter(idBuscado => idBuscado.idCarrito != id);
                carrito.productos.guardar(objeto);
                const carritoActualizado=carritoSinidActualizar.push(carrito);
                this.carrito=carritoActualizado;

            }
            else {

                return { error : 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN GUARDAR PRODUCTOS DE CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO GUARDAR PRODUCTOS POR ID POR CARRITO

    async borrarPorIdCarritoIdProducto(idCarrito,idProducto) {
        try {
            let idCarritoSeleccion  = parseInt(idCarrito);
            let idProductoBorrar = parseInt(idProducto);
            const largoArrayCarrito = this.carrito.length;
            if (largoArrayCarrito > idCarritoSeleccion) {
                const carrito = this.carrito.filter(idBuscado => idBuscado.idCarrito == idCarritoSeleccion);
                const carritoSinidActualizar= this.carrito.filter(idBuscado => idBuscado.idCarrito != idCarritoSeleccion);
                const productoBorrado=carrito.productos.borrarObjetoPorId(idProductoBorrar);
                const carritoActualizado=carritoSinidActualizar.push(carrito);
                this.carrito=carritoActualizado;
                return productoBorrado;

            }
            else {

                return { error : 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN BORRAR PRODUCTO POR SU ID DE CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO GUARDAR PRODUCTOS POR ID POR CARRITO

    


}//FIN DE LA CLASE CARRITO

