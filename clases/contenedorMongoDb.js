const mongodb = require('mongodb');

module.exports = class ContenedorMongoDB {
    urlConexion = 'mongodb://127.0.0.1:27017';
    baseDatos = 'productos';
    idMongo = mongodb.ObjectId;//PARA TRABAJAR EN CASO DE QUERER REALIZAR LA BUSQUEDA POR EL ID ASIGNADO POR MONGO


    constructor() {
        this.clienteMongo = mongodb.MongoClient;
    }

    async guardarProducto(producto) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            cliente.db(this.baseDatos).collection('productos').insertOne(producto, (error, resultado) => {

                if (error) {

                    return console.log("Error al insertar producto");

                }//FIN IF DE INSERTAR PRODUCTO

                cliente.close();//CIERRO CONEXION CON LA BASE DE MONGO

                return resultado.ops;

            });//FIN CLIENTEDB


        });

    }//FIN DE LA FUNCION GUARDAR

    async buscarProductos(productosBuscados) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            cliente.db(this.baseDatos).collection('productos').find(productosBuscados).toArray((error, resultado) => {

                if (error) {

                    return console.log("Producto con las caracteristicas buscadas no encontrado");

                }//FIN IF DE BUSCAR PRODUCTOS

                cliente.close();//CIERRO CONEXION CON LA BASE DE MONGO

                return resultado;

            });//FIN CLIENTEDB


        });

    }//FIN DE LA FUNCION BUSCAR PRODUCTOS

    async buscarProducto(productoBuscado) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            cliente.db(this.baseDatos).collection('productos').findOne(productoBuscado, (error, resultado) => {

                if (error) {

                    return console.log("No se encuentra producto buscado");

                }//FIN IF DE BUSCAR PRODUCTO

                cliente.close();//CIERRO CONEXION CON LA BASE DE MONGO

                return resultado;

            });//FIN CLIENTEDB


        });

    }//FIN DE LA FUNCION BUSCAR PRODUCTO

    async modificarProducto(productoBuscado, propiedadModificar, valor) {
        const propiedad = toString(propiedadModificar);
        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB

            const idMongoProducto = cliente.db(this.baseDatos).collection('productos').findOne(productoBuscado, (error, resultado) => {

                if (error) {

                    return console.log("No se encuentra producto buscado");

                }//FIN IF DE BUSCAR PRODUCTO

                return resultado._id;

            });//FIN CLIENTEDB
            let estadoUpdate;
            switch (propiedad) {
                case "nombreProducto":
                    estadoUpdate = cliente.db(this.baseDatos).collection('productos').updateOne({ _id: new this.idMongo(idMongoProducto) }
                        , {
                            $set: {
                                nombreProducto: valor
                            }
                        });//FIN CLIENTEDB
                    estadoUpdate.then((resultado) => {
                        console.log(resultado);
                    }).catch((error) => {

                        console.log(error);
                    })//VERIFICACION DE LA PROMESA DEVUELTA POR EL UPDATE
                    cliente.close();
                    break;
                case "precioProducto":
                    estadoUpdate = cliente.db(this.baseDatos).collection('productos').updateOne({ _id: new this.idMongo(idMongoProducto) }
                        , {
                            $set: {
                                precioProducto: valor
                            }
                        });//FIN CLIENTEDB
                    estadoUpdate.then((resultado) => {
                        console.log(resultado);
                    }).catch((error) => {

                        console.log(error);
                    })//VERIFICACION DE LA PROMESA DEVUELTA POR EL UPDATE
                    cliente.close();
                    break;
                case "urlProducto":
                    estadoUpdate = cliente.db(this.baseDatos).collection('productos').updateOne({ _id: new this.idMongo(idMongoProducto) }
                        , {
                            $set: {
                                urlProducto: valor
                            }
                        });//FIN CLIENTEDB
                    estadoUpdate.then((resultado) => {
                        console.log(resultado);
                    }).catch((error) => {

                        console.log(error);
                    })//VERIFICACION DE LA PROMESA DEVUELTA POR EL UPDATE
                    cliente.close();
                    break;
                default:
                    console.log("No existe la propiedad");
                    cliente.close();
                    break;

            }
        });//FIN DE CONEXION DE MONGO

    }//FIN DE LA FUNCION MODIFICAR PRODUCTO

    async borrarProducto(productoBorrar) {

        this.clienteMongo.connect(this.urlConexion, { useNewUrlParser: true }, (error, cliente) => {
            if (error) {
                return console.log('No me pude conectar a MONGODB')
            }//FIN IF ERROR DE CONEXION MONGODB
            cliente.db(this.baseDatos).collection('productos').deleteOne(productoBorrar).then((resultado) => {
                console.log(resultado);
            }).catch((error) => {

                console.log(error);

            });//FIN CLIENTEDB


        });//FIN DEL CONNECT

    }//FIN DE LA FUNCION BORRAR PRODUCTO


}//FIN DE CLASE CONTENEDOR MONGODB

