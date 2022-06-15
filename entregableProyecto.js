import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { join } from 'path';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import productos from './rutas/productos.js';
import carrito from './rutas/carrito.js';
import { usuariosRutas } from './rutas/usuarios.js';
import 'dotenv/config'//DOTENV
import { servidorModoCluster } from './cluster.js';
import { createServer } from './servidor.js';
import { engine } from 'express-handlebars';
import contenerdorMensajes from './clases/contenedorMsj.js';
import mongoose from 'mongoose';
import { normalize, denormalize, schema } from "normalizr";
import { faker } from '@faker-js/faker';
import os from 'os';
import { fork } from 'child_process';
import compression from 'compression';
import logger from './logger.js'
import morgan from 'morgan'
//import rutaInvalida from './rutaInvalida.js'


const PORT = process.argv[2] ?? 8080;
const modoCluster = process.argv[3] == 'CLUSTER'; //node entregableClase28.js 8080 'CLUSTER' ->   PUERTO 8080 MODO CLUSTER

//INICIO CONFIGURACION DE SERVIDOR
//EXPRESS
const app = express();
//IO SOCKET
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(join(process.cwd(), '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'NICO',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000//60 segundos de tiempo de vida
    }
})
);
app.use(passport.initialize());
app.use(passport.session());
//FIN DE CONFIGURACION DE SERVIDOR

app.use(morgan('dev'))

//INICIO RUTEO DE APIS
app.use('/api', productos);
app.use('/api', carrito);
app.use('/', usuariosRutas);
//app.use(rutaInvalida);
//FIN  RUTEO DE APIS

//INICIO CX MONGOOSE
mongoose.connect(process.env.MONGODB_ATLAS)
    .then(() => {
        logger.info("CONECTADO A MONGODB ATLAS");
    })
    .catch((error) => {
        logger.error(error);
    })
//FIN CX MONGOOSE

const mensajesApi = new contenerdorMensajes;

//HANDLEBARS
app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "layout.hbs",
})
);
app.set("/public/", "/views/");
app.set("view engine", "hbs"); //SETEAMOS EL MOTOR DE PLANTILLA

//INICIO RUTEO SEGUN LOGIN
app.get('/login', (req, res) => {

    res.render("login");

});

app.get('/registro', (req, res) => {

    res.render("registro");

});


app.get('/productos', (req, res) => {

    res.render("productos");

});

app.get('/listaProductos', (req, res) => {

    res.sendFile(process.cwd() + '/views/listaProductos.hbs');

});


//FIN RUTEO SEGUN LOGIN

//INICIO DE NORMALIZACION
const schemaAutor = new schema.Entity(
    "autor",
    {},
    { idAttribute: "msjEmail" }
);

const schemaMensaje = new schema.Entity(
    "mensaje",
    { autor: schemaAutor },
    { idAttribute: "autor" }
);

const schemaMensajes = new schema.Entity(
    "mensajes",
    {
        mensajes: [schemaMensaje],
    },
    { idAttribute: "fyh" }
);


//FIN DE NORMALIZACION

//INICIO PAGINA DE TEST CON FAKER
const productosPrueba = [];

app.get('/api/productos-test', (req, res) => {

    for (let i = 0; i < 5; i++) {
        const producto = {
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            foto: faker.image.imageUrl()
        }
        productosPrueba.push(producto);
    }

    res.send(productosPrueba);
});


//FIN PAGINA DE TEST CON FAKER


//CONEXION IO
io.on('connection', async socket => {
    logger.info('CLIENTE CONECTADO')
    // CARGA DE MENSAJES
    socket.emit('mensajes', await mensajesApi.listarTodo());

    //ACTUALIZACION DE MENSAJES
    socket.on('nuevoMensaje', async mensajeNormalizado => {
        logger.info("CONSOLE.LOG -> MENSAJE NORMALIZADO LADO CLIENTE:", mensajeNormalizado);
        const mensajeDesnormalizado = denormalize(mensajeNormalizado.result, schemaMensajes, mensajeNormalizado.entities);//DESNORMALIZO PARA GUARDAR EL MENSAJE QUE ENVIO POR IO SOCKET NORMALIZADO DESDE EL LADO CLIENTE
        logger.info("CONSOLE.LOG -> MENSAJE DESNORMALIZADO LADO CLIENTE:", mensajeDesnormalizado);
        await mensajesApi.guardar(mensajeDesnormalizado);
        io.sockets.emit('mensajes', await mensajesApi.listarTodo());
        //FIN DE MENSAJES

    });
});

app.io = io;//POR APP ENVIAMOS EL IO SERVER, ASI LO TOMA POR EJEMPLO EL LADO CLIENTE

// PROCESS

//AGREGO CANTIDAD DE CPU'S QUE ES LO SOLICITADO
const cantCpus = os.cpus().length
app.get('/info', (req, res) => {


    res.render("info", {
        argEntrada: process.argv,
        os: process.platform,
        nodeVs: process.version,
        excPath: process.execPath,
        processID: process.pid,
        carpeta: process.cwd(),
        cantCpu: cantCpus
    });
});

//EJEMPLO DE RUTEO CON COMPRESION DE INFO
app.get('/infozip',compression(), (req, res) => {


    res.render("info", {
        argEntrada: process.argv,
        os: process.platform,
        nodeVs: process.version,
        excPath: process.execPath,
        processID: process.pid,
        carpeta: process.cwd(),
        cantCpu: cantCpus
    });
});
//FORK PAERA NUMEROS RANDOM

app.get('/randoms', (req, res) => {
    const numeroAleatorio = fork('./procesoHijo.js');

    numeroAleatorio.send(req.query);
    numeroAleatorio.on('message', numerosRandom => {
        res.end(`Numeros aleatorios ${JSON.stringify(numerosRandom)}`);
    });
});

if (modoCluster) {

    await servidorModoCluster(app, httpServer);

}

else {

    await createServer({ port: PORT }, app, httpServer);

}

