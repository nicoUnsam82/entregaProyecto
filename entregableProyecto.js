const express = require("express");
const hbs= require("express-handlebars");
const productos = require('./rutas/productos')
const carrito = require('./rutas/carrito')
const rutaInvalida = require("./rutas/rutaInvalida");
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
layoutsDir:__dirname+"views/layouts",
partialsDir:__dirname+"views/partials"
})
);
app.set("views", "./views/partials");  
app.set("view engine", "hbs"); //SETEAMOS EL MOTOR DE PLANTILLA

const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () => {

    console.log(`INICIO SERVIDOR: http://localhost:${httpServer.address().port}`)


});

httpServer.on('error', (error) => console.log(`ERROR EN SERVIDOR: ${error}`));
