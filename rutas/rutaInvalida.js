const rutaInvalida =(req,res,next)=>{
    res.json({
      error:-2, 
      descripción:`LA RUTA REQUERIDA '${req.url}'EN EL METODO '${ req.method}' NO EXISTE`
    });
  }
  
  module.exports = rutaInvalida;