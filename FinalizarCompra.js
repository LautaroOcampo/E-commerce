
let productosParse = JSON.parse(localStorage.getItem("carrito"))
let carritoRed = productosParse.reduce((acum, ele) => acum + ele.precio, 0)
let divCarrito = document.getElementById("carrito-divP")
let carritoTotal = document.getElementById("carrito-total")

for(producto of productosParse){
    let div = document.createElement("div")
    div.className = "carrito-divP-P"
    div.innerHTML = `
             <img class="carrito-img" src="${producto.imagen}" alt="${producto.textoA}">
    </div>
    <div class="carrito-divP-S">
    <div class="carrito-divP-S-nombre">   
        <p class="carrito-divP-S-nombre">${producto.nombre}</p>
    </div>
    <div class="carrito-divP-S-precio">
        <p class="carrito-divP-T-precio-p">${producto.precio}$</p>
    </div>
    </div>
        `
        divCarrito.append(div)
}
carritoTotal.innerText = `Total:${carritoRed}$`

let cuotas = document.getElementsByClassName("select-option")

cuotas[0].innerHTML = `1 cuota de ${carritoRed}$`
cuotas[1].innerHTML = `3 cuota de ${Math.floor(carritoRed / 3)}$`
cuotas[2].innerHTML = `6 cuota de ${Math.floor(carritoRed / 6)}$`
cuotas[3].innerHTML = `12 cuota de ${Math.floor(carritoRed / 12)}$`


