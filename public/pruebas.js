
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
async function mostrarCarritoPrueba(data){

    const fetchTemplateHbsCarritoProductos = await fetch("./views/partials/listaCarritos.hbs");
    const templateHbsCarritoProductos=await fetchTemplateHbsCarritoProductos.text();
    const template = Handlebars.compile(templateHbsCarritoProductos);
    const html = template({carritoLista:data});
    document.querySelector("#pruebaApiCarrito").innerHTML =html;
  
  }
//PRUEBA SOBRE CARRITO
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

async function obtenerProductoPorId(id){
    let producto=await $.ajax({
        type: "GET",
        url: `api/productos/${id}`,
        data: {"nombreProducto" : "valor1", "precioProducto" : "valor2","urlProducto":"valor3","id":"valor4"},
        dataType: "json",
        
    });
    console.log(producto);
    mostrarProductosPrueba(producto);
    
}//FIN DE FUNCION OBTENER PRODUCTOS

//PRUEBA SOBRE CARRITO

async function crearCarrito(){
    let carritoDato=await $.ajax({
        type: "POST",
        url: "api/carrito/",
    });
    let  carrito ={idCarrito:carritoDato};
    console.log(carrito);
    mostrarCarritoPrueba(carrito);
    
}//FIN DE FUNCION OBTENER PRODUCTOS

async function borrarCarrito(){
    let carritoDato=await $.ajax({
        type: "DELETE",
        url: "api/carrito/1",
    });
    let  carrito ={idCarrito:carritoDato};
    console.log(carrito);
    mostrarCarritoPrueba(carrito);
    
}//FIN DE FUNCION OBTENER PRODUCTOS

async function guardarProductoporIdCarro(){
    let carritoDato=await $.ajax({
        type: "POST",
        url: "api/carrito/1/productos",
        data: {"nombreProducto" : "TV", "precioProducto" : "100","urlProducto":"http://TV.com","id":"1"},
        dataType: "json",
    });
    let  carrito ={idCarrito:carritoDato};
    console.log(carrito);
    mostrarCarritoPrueba(carrito);
}//FIN DE FUNCION OBTENER PRODUCTOS

async function eliminarProductoporIdCarroIdProducto(){
    let carritoDato=await $.ajax({
        type: "DELETE",
        url: "api/carrito/1/productos/1",
        
    });
    let  carrito ={idCarrito:carritoDato};
    console.log(carrito);
    mostrarCarritoPrueba(carrito);
}//FIN DE FUNCION OBTENER PRODUCTOS