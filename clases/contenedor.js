

module.exports = class Contenedor {
    productos =[];
    static idGlobal = 0;
    static idBorrados = [];


    constructor() {
        this.productos;

    }//FIN DEL CONSTRUCTOR

    async guardar(objeto) {

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
                this.productos.push(objeto);
                const idAsignar = idMasAlto + 1;
                this.productos[largoArrayObjetos].id = idAsignar;
                console.log(this.productos[idAsignar-1]);
                return this.productos[idAsignar-1];
            default:
                this.productos.push(objeto);
                let idAsignado =Contenedor.idBorrados[0]
                this.productos[largoArrayObjetos].id = idAsignado;
                Contenedor.idBorrados.shift();
                console.log(this.productos[largoArrayObjetos]);
                return this.productos[largoArrayObjetos];            

            }
  
        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN GENERACION EN GUARDAR OBJETO"));
            throw (e);



        }//FIN DEL CATCH

        
    }//FIN DE METODO GUARDAR

    async obtenerObjetoPorId(idBusqueda) {
        try {
            let id =parseInt(idBusqueda);
            console.log(id);
            const largoArrayObajetos = this.productos.length;
            if (largoArrayObajetos > id) {
                const producto = this.productos.filter(idBuscado => idBuscado.id == idBusqueda);
                return producto;
            }
            else {

                return { error : 'producto no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN OBTENER OBJETO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO OBTENER OBJETO POR ID

    async obtenerObjetoEnProductos() {
        try {


            const largoArrayObjetos = this.productos.length;
            if (largoArrayObjetos != 0) {

                return this.productos;

            }
            else {

                return null;
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN OBTENER TODOS LOS OBJETOS"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO OBTENER TODOS LOS OBJETOS  
    async borrarObjetoPorId(idBusqueda) {
        try {

            const productoBorrado = this.productos.filter(idBuscado => idBuscado.id == idBusqueda);
            const largoProductoBorrado = productoBorrado.length;
            this.productos = this.productos.filter(idBuscado => idBuscado.id != idBusqueda);

            if (largoProductoBorrado != 0) {
                Contenedor.idBorrados.push(idBusqueda);
                return productoBorrado;
            }
            else {

                return { error : 'producto no encontrado' };
            }


        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN BORRAR OBJETO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO BORRAR OBJETO POR ID
    async borrarTodosObjetos() {
        try {

            this.productos = [];

        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN BORRAR TODOS LOS OBJETOS"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO BORRAR OBJETO TODOS LOS OBJETOS

    async actualizarObjetoPorId(idBusqueda,objeto) {
        try {

            const largoArrayObajetos = this.productos.length;
            if (largoArrayObajetos > idBusqueda) {
                this.productos[idBusqueda-1].nombreProducto=objeto.nombreProducto;
                this.productos[idBusqueda-1].precio=objeto.precio;
                this.productos[idBusqueda-1].thumbnail=objeto.thumbnail;
                return this.productos[idBusqueda-1];
                
            }
            else {

                return { error : 'producto no encontrado' };
            }

        }//FIN DEL TRY
        catch (e) {

            console.error(new Error("ERROR EN ACTUALIZAR OBJETO POR ID"));
            throw (e);


        }//FIN DEL CATCH



    }//FIN DEL METODO ACTUALIZAR OBJETO POR ID


}//FIN DE LA CLASE CONTENEDOR

