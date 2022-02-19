const cl_Contenedor = require("../clases/contenedor.js");
//HABRIA QUE VER LA FORMA DE QUE NO ESTE, PARA QUE LA CLASE DATO NO DEPENDA DE LA CLASE CONTENEDOR(PASAR POR PARAMETRO PERO HAY QUE VER COMO YA TOMAS LAS FUNCIONES)
module.exports = class Carrito{
    static asignarId = 0;
    static idBorradosCarrito = [];

    constructor() {
        this.productos= new cl_Contenedor;
        this.idCarrito= [];
        this.horarioDeCreacionCarrito = Date.now()

    }//FIN DEL CONSTRUCTOR

    async generarCarro() {

        try {
            let largoidBorradosCarrito = Carrito.idBorradosCarrito.length;
            switch (largoidBorradosCarrito) {

                case 0:
                    Carrito.asignarId = Carrito.asignarId+1;
                    this.idCarrito.push(Carrito.asignarId);
                    const largoIdCarrito=this.idCarrito.length;
                    return this.idCarrito[largoIdCarrito-1];
                default:
                    largoIdCarrito = this.idCarrito.length;
                    this.idCarrito[largoIdCarrito] = Carrito.idBorradosCarrito[0];
                    Carrito.idBorradosCarrito.shift();
                    return this.idCarrito[largoIdCarrito];

            }

        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN GENERACION EN GENERAR CARRITO"));
            throw (e);



        }//FIN DEL CATCH


    }//FIN DE METODO GUARDAR

    async borrarCarritoPorId(idBusqueda) {
        try {

            const carritoBorrado = this.idCarrito.filter(idBuscado => idBuscado == idBusqueda);
            const largoCarritoBorrado = carritoBorrado.length;
            this.idCarrito = this.idCarrito.filter(idBuscado => idBuscado.idCarrito != idBusqueda);

            if (largoCarritoBorrado != 0) {
                Carrito.idBorradosCarrito.push(idBusqueda);
                return carritoBorrado;
            }
            else {

                return { error: 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN BORRAR CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO BORRAR CARRITO POR ID

    async guardarProductosPorCarritoId(idBusqueda, objeto) {
        try {
            let id = parseInt(idBusqueda);
            const idCarritoBuscado = this.idCarrito.filter(idBuscado => idBuscado == id);
            if (idCarritoBuscado) {
               this.productos.guardar(objeto);
               this.productos.idCarrito=idCarritoBuscado;
               let productoGuardado;
               if(this.productos.idCarrito==idBusqueda){
                productoGuardado=this.productos;
               }
              
               return productoGuardado;
            }
            else {

                return { error: 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN GUARDAR PRODUCTOS DE CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO GUARDAR PRODUCTOS POR ID POR CARRITO

    async obtenerProductosPorCarritoId(idBusqueda) {
        try {
            let id = parseInt(idBusqueda);
            const idCarritoBuscado = this.idCarrito.filter(idBuscado => idBuscado == id);
            if (idCarritoBuscado) {
                this.productos.idCarrito=idCarritoBuscado;
                let productoGuardado;
                if(this.productos.idCarrito==idBusqueda){
                 productoGuardado=this.productos;
                }
               
                return productoGuardado;
            
            }
            else {

                return { error: 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN OBTENER PRODUCTOS DE CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO OBTENER PRODUCTOS POR ID POR CARRITO






    async borrarPorIdCarritoIdProducto(idCarrito, idProducto) {
        try {
            let idCarritoSeleccion = parseInt(idCarrito);
            let idProductoBorrar = parseInt(idProducto);
            const idCarritoBuscado = this.idCarrito.filter(idBuscado => idBuscado == idCarritoSeleccion);
            if (idCarritoBuscado) {
                console.log(this.productos);
                const idProductoAEliminar=this.productos.borrarObjetoPorId(idProductoBorrar);
                if(idProductoAEliminar){
                return idProductoAEliminar;
                }
                else{
                    return { error: 'producto no encontrado' };
                }

            }
            else {

                return { error: 'carrito no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN BORRAR PRODUCTO POR SU ID DE CARRITO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO GUARDAR PRODUCTOS POR ID POR CARRITO




}//FIN DE LA CLASE CARRITO

