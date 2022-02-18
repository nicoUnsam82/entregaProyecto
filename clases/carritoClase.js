const cl_Contenedor= require("../clases/contenedor.js");

module.exports = class Carrito { 
    //productos = new cl_Carrito;SE SACO PARA QUE LA CLASE CARRITO NO DEPENDE DE OTRA CLASE Y SE PASA POR PARAMETRO
    constructor(productos)
     {  
        this.carrito=new cl_Contenedor;
        this.carrito.idCarrito=0;
        this.idBorrados=[];
        this.horarioDeCreacionCarrito = Date.now()

    }//FIN DEL CONSTRUCTOR

    async generarCarro() {

        try {
            let largoIdBorrados =this.idBorrados.length;
            switch(largoIdBorrados){

            case 0:
                this.carrito.idCarrito+=1;;
                return this.carrito.idCarrito;
            default:
                largoIdCarrito=this.carrito.length;
                this.carrito.idCarrito[largoIdCarrito]=this.idBorrados[0];
                this.idBorrados.shift();
                return this.carrito.idCarrito;            

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
                return this.carrito.productos.obtenerObjetoEnProductos();
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
                Carrito.idBorrados.push(idBusqueda);
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
                this.carrito.productos.guardar(objeto);
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

