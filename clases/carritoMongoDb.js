const mongodb = require('mongodb');

module.exports = class CarritoMongoDB {
    urlConexion = 'mongodb://127.0.0.1:27017';
    baseDatos = 'carritos';
    idMongo = mongodb.ObjectId;//PARA TRABAJAR EN CASO DE QUERER REALIZAR LA BUSQUEDA POR EL ID ASIGNADO POR MONGO


    constructor() {
        this.clienteMongo = mongodb.MongoClient;
    }

    async guardarCarritoConProductos(carritoConProducto) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            cliente.db(this.baseDatos).collection('carritos').insertOne(carritoConProducto, (error, resultado) => {

                if (error) {

                    return console.log("Error al insertar productos de carritos");

                }//FIN IF DE INSERTAR PRODUCTO

                cliente.close();//CIERRO CONEXION CON LA BASE DE MONGO

                return resultado.ops;

            });//FIN CLIENTEDB


        });

    }//FIN DE LA FUNCION GUARDAR

    async buscarProductosPorIdCarrito(idCarrito) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            cliente.db(this.baseDatos).collection('carritos').find(idCarrito).toArray((error, resultado) => {

                if (error) {

                    return console.log("No se encuentra productos por Id de Carrito");

                }//FIN IF DE BUSCAR PRODUCTO POR ID CARRO

                cliente.close();//CIERRO CONEXION CON LA BASE DE MONGO

                return resultado;

            });//FIN CLIENTEDB


        });

    }//FIN DE LA FUNCION BUSCAR PRODUCTO POR ID CARRO



    async borrarCarrito(idCarrito) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            cliente.db(this.baseDatos).collection('carritos').deleteOne(idCarrito).then((resultado) => {
                console.log(resultado);
            }).catch((error) => {

                console.log(error);

            });//FIN CLIENTEDB


        });//FIN DEL CONNECT

    }//FIN DE LA FUNCION BORRAR CARRITO

    async borrarProductosPorIdCarritoPorIdProducto(idCarrito, id) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            const productosPorCarritoId = cliente.db(this.baseDatos).collection('carritos').find(idCarrito).toArray((error, resultado) => {

                if (error) {

                    return console.log("No se encuentra productos por Id de Carrito");

                }//FIN IF DE BUSCAR PRODUCTO POR ID CARRO

                cliente.close();//CIERRO CONEXION CON LA BASE DE MONGO

                return resultado;

            });//FIN CLIENTEDB
            const productoBuscado = productosPorCarritoId.filter(idBuscado => idBuscado == id);
            cliente.db(this.baseDatos).collection('carritos').deleteOne({ _id: new this.idMongo(productoBuscado._id) }).then((resultado) => {
                console.log(resultado);
            }).catch((error) => {

                console.log(error);

            });//FIN CLIENTEDB

        });

    }//FIN DE LA FUNCION BORRAR PRODUCTO POR ID CARRO

}//FIN DE CLASE CARRITO MONGODB



