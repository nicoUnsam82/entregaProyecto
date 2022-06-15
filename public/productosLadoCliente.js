

const socket = io();
//FIN DE USO DE //USO DE LIBRERIA PARA CLIENTE EN TYPESCRIPT DE IO SOCKET (ADEMAS INSTALAR npm install socket.io-client)

//INICIO DE NORMALIZACION
const schemaAutor = new normalizr.schema.Entity(
  "autor",
  {},
  { idAttribute: "msjEmail" }
);

const schemaMensaje = new normalizr.schema.Entity(
  "mensaje",
  { autor: schemaAutor },
  { idAttribute: "autor" }
);

const schemaMensajes = new normalizr.schema.Entity(
  "mensajes",
  {
    mensajes: [schemaMensaje],
  },
  { idAttribute: "fyh" }
);


//FIN DE NORMALIZACION


document.querySelector("#productoAgregar").addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("api/productos", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombreProducto: document.querySelector("#nombreProducto").value,
      precio: document.querySelector("#precioProducto").value,
      urlProducto: document.querySelector("#urlProducto").value
    })

  })

});
socket.on("actualizacion_productos", async (data) => {
  console.log("CONSOLE.LOG -> SOCKET IO DE DATA GENERADA POR EL POST PARA MOSTRAR EN TABLA:", data);
  mostrarProductos(data);
});

async function mostrarProductos(data) {

  const fetchTemplateHbs = await fetch('/listaProductos');
  const templateHbs = await fetchTemplateHbs.text();
  const template = Handlebars.compile(templateHbs);
  const html = template({ productos: data });
  document.querySelector("#hbsTablaProductos").innerHTML = html;

}

//MENSAJES

document.querySelector("#mensajeAgregar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const mensaje = {
    autor: {
      idNombre: document.querySelector("#idNombre").value,
      msjApellido: document.querySelector("#msjApellido ").value,
      msjEmail: document.querySelector("#msjEmail").value,
      msjEdad: document.querySelector("#msjEdad").value,
      msjAlias: document.querySelector("#msjAlias").value,
      msjAvatar: document.querySelector("#msjAvatar").value
    },
    fyh: new Date().toLocaleString(),
    mensajeContenido: document.querySelector("#mensajeContenido").value
  }//FIN DE NUEVO FORMATO DE MENSAJE

  //const mensaje = {idNombre : idNombre,msjApellido : msjApellido,msjEmail : msjEmail,msjEdad : msjEdad ,msjAlias : msjAlias,msjAvatar : msjAvatar, mensajeContenido:mensajeContenido};
  //NORMALIZO MENSAJE PARA ENVIAR POR IO SOCKET Y SE DESNORMALIZA EN EL LADO SERVIDOR
  const mensajeNormalizado = normalizr.normalize(mensaje, schemaMensajes);
  console.log("CONSOLE.LOG -> MENSAJE NORMALIZADO LADO CLIENTE:", mensajeNormalizado);
  socket.emit('nuevoMensaje', mensajeNormalizado);
});

socket.on('mensajes', mensajes => {
  const html = generarHtmlLista(mensajes)
  document.querySelector("#mensajesChat").innerHTML = html;
});


function generarHtmlMensaje(mensaje) {
  return (`
          <div>
              <b style="color:blue;">${mensaje.autor.idNombre}</b>
              <i style="color:green;">${mensaje.mensajeContenido}</i>
          </div>
      `)

}
function generarHtmlLista(mensajes) {
  return mensajes.map(mensaje => {
    return (`
          <div>
              <b style="color:blue;">${mensaje.autor.idNombre}</b>
              [<span style="color:brown;">${mensaje.fyh}</span>] :
              <i style="color:green;">${mensaje.mensajeContenido}</i>
          </div>
      `)
  }).join(" ");
}


