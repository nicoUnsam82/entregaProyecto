
  const socket = io();
 //FIN DE USO DE //USO DE LIBRERIA PARA CLIENTE EN TYPESCRIPT DE IO SOCKET (ADEMAS INSTALAR npm install socket.io-client)

 document.querySelector("#productoAgregar").addEventListener("submit",async (e)=>{
      e.preventDefault();
      await fetch("api/productos",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json' 
        },
        body:JSON.stringify({
          nombreProducto:document.querySelector("#nombreProducto").value ,
          precio: document.querySelector("#precioProducto").value ,
          urlProducto:document.querySelector("#urlProducto").value 
        })
            
      })

       });

       socket.on("actualizacion_productos",async(data)=>{
       mostrarProductos(data);
       });
  
async function mostrarProductos(data){

  const fetchTemplateHbs = await fetch("./views/partials/listaProductos.hbs");
  const templateHbs=await fetchTemplateHbs.text();
  const template = Handlebars.compile(templateHbs);
  const html = template({productos:data});
  document.querySelector("#hbsTablaProductos").innerHTML =html;

}
 


