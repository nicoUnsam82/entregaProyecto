
let  xhttp = new XMLHttpRequest();
//FUNCION PARA MOSTRAR PRODUCTOS EN PRUEBA POR HANDLEBARS
async function mostrarProductosPrueba(data){

    const fetchTemplateHbs = await fetch("./views/partials/listaProductosPrueba.hbs");
    const templateHbs=await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({productosPrueba:data});
    document.querySelector("#pruebaApiProductos").innerHTML =html;
  
  }
//PRUEBA SOBRE PRODUCTOS

//BORRAR PRODUCTO POR ID
function borrarProductoPorId(id){

    xhttp.open("DELETE",`api/productos/${id}`,true);
    xhttp.send();
    console.log("OK");
}
async function obtenerProductos(){
    let productos=await $.ajax({
        type: "GET",
        url: "api/productos/",
        data: {"nombreProducto" : "valor1", "precioProducto" : "valor2","urlProducto":"valor3","id":"valor4"},
        dataType: "json",
        
    });
    console.log(productos);
    mostrarProductosPrueba(productos);
    
}//FIN DE FUNCION OBTENER PRODUCTOS

