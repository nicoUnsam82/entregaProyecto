const express = require("express");
const hbs= require("express-handlebars");
const rutaInvalida = require("./rutas/rutaInvalida");
const productos = require('./rutas/productos');
const carrito = require('./rutas/carrito');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');



//EXPRESS
const app = express();

//IO SOCKET
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', productos);
app.use('/api', carrito);
app.use(rutaInvalida.rutaInvalida);


//HANDLEBARS
app.engine("hbs",hbs.engine({
extname:"hbs",
defaultLayout:"layout.hbs",
layoutsDir:__dirname+"public/views/layouts",
partialsDir:__dirname+"public/views/partials"
})
);
app.set("public/views", "./views/partials");  
app.set("view engine", "hbs"); //SETEAMOS EL MOTOR DE PLANTILLA

//CONEXION IO
io.on("actualizacion_productos", socket => {
    console.log('CLIENTE CONECTADO')  
})
app.io =io;

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => {

    console.log(`INICIO SERVIDOR: http://localhost:${httpServer.address().port}`)


});

httpServer.on('error', (error) => console.log(`ERROR EN SERVIDOR: ${error}`));
