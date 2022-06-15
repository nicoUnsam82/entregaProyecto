import { Router } from 'express';
//import { obtenerUsuarioMongoose } from '../controladores/usuariosMongooseControlador.js'
import {usuariosMongoose} from '../models/usuariosMongoose.js'
import logger from '../logger.js'
import passport from 'passport';
import { Strategy } from 'passport-local';


export const usuariosRutas = new Router();

//INICIO DE CONFIGURACION DE PASSPORT
passport.use('registro', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, 
async(req, username, password, done)=>{
    //validar
    const user = await usuariosMongoose.findOne({
        where: {
            username, 
            password
        }
    });
    if(!user){
        const userNew = await usuariosMongoose.create({
            username,
            password
        });
        return done(null, userNew)  
    }
    return done(null, false)
}));
//FIN DE ESTRATEGIA DE PASSPORT DE REGISTRO

passport.use('login', new Strategy(async (username, password, done)=>{
    const user = await usuariosMongoose.findOne({
        where: {
            username, 
            password
        }
    })
    if(user){
       return done(null, user)
    }
    done(null, false)
}));
//FIN DE ESTRATEGIA DE PASSPORT DE LOGIN

//SERIALIZACIÓN
passport.serializeUser((user, done)=>{
    logger.info("LOGGER.INFO -> USER.ID DE SERIALIZACION DE PASSPORT:",user.id);
    done(null, user.id)
});

//DESERIALIZACIÓN
passport.deserializeUser(async(id, done)=>{
    logger.info("LOGGER.INFO -> USER.ID DE DESERIALIZACION DE PASSPORT:",id);
    // done(null, user.id)
    const user = await usuariosMongoose.findOne({
        where: {
            id
        }
    });
    done(null, user)
});

//FIN DE CONFIGURACION DE PASSPORT

//INICIO RUTAS CON ESTRATEGIAS DE PASSPORT 

usuariosRutas.post('/registro', passport.authenticate('registro',{
    
    successRedirect:'/login',
    failureRedirect: '/registro',
    
    
    }
    
    ));

usuariosRutas.post('/login', passport.authenticate('login', {
    
    
    successRedirect:'/productos',
    failureRedirect: '/login',
    
    }));//POST DE REGISTRO DE USUARIOS


//FIN DE RUTAS CON ESTRATEGIAS DE PASSPORT


//INICIO  DE RUTAS CON ESTRATEGIAS SIN PASSPORT 

/*usuariosRutas.post('/registro', (req, res) => {
    logger.info("CONSOLE.LOG-> POST DE REGISTRO DE USUARIOS /REGISTRO:", req.body);
    const usuarioParaGrabar = req.body;

    (async () => {
        const registroUsuario = await obtenerUsuarioMongoose(usuarioParaGrabar, 'REGISTRAR');
        logger.info("CONSOLE.LOG-> DEVOLUCION DE REGISTRO DE USUARIO:", registroUsuario);


        if (registroUsuario == 'USUARIO REGISTRADO') {

            res.sendStatus(200);

        }
        else {

            res.sendStatus(400);


        }

    })()


});//POST DE REGISTRO DE USUARIOS*/


/*usuariosRutas.post('/login', (req, res) => {
    logger.info("CONSOLE.LOG-> POST DE LOGIN DE USUARIOS /REGISTRO:", req.body);
    const usuarioLogin = req.body;

    (async () => {
        const loginUsuario = await obtenerUsuarioMongoose(usuarioLogin, 'LOGIN');
        logger.info("CONSOLE.LOG-> DEVOLUCION DE LOGIN DE USUARIO:", loginUsuario);


        if (loginUsuario == 'USUARIO VALIDO') {

            req.session.nombreUsuario = { login: loginUsuario.nombreUsuario };//GUARDO LA COOKIE PARA MANTENER 60 SEG LA SESSION

            res.redirect('/productos');

        }
        else {

            res.sendStatus(401);


        }

    })()


});//POST DE REGISTRO DE USUARIOS*/

//FIN  DE RUTAS CON ESTRATEGIAS SIN PASSPORT 
