const obtenerNumerosAleatorios = (cant) => {
    let numeros = [];
  
    for (let i=0; i<cant; i++){
        let numeroAleatorio = Math.floor(Math.random() * (1000 - 1) + 1);// Math.random() * (max - min) + min =>  COMO OBTENER NUMEROS ALEATORIOS ENTRE UN MAXIMO Y UN MINIMO
     
        const numeroEncontrado = numeros.find(item => {
            return item.numero === numeroAleatorio;
        })

        const indexEncontrado = numeros.findIndex(item => {
            return item.numero === numeroAleatorio;
        })

        if(!numeroEncontrado){
            numeros.push({numero: numeroAleatorio, cantidad: 1})
        } else {
            let cantidad = numeros[indexEncontrado].cantidad;
            numeros[indexEncontrado].cantidad = cantidad+1;
        }
    }//FIN DEL FOR => REALIZA UN FOR SEGUN LA CANTIDAD RECIBIDA

    return numeros;
}

process.on('message', req => {
    const {cant} = req;

    if(!cant) {
        let numerosRandom = obtenerNumerosAleatorios(100000000);
        process.send(numerosRandom);
    }

    let numerosRandom = obtenerNumerosAleatorios(cant);
    process.send(numerosRandom);
})
