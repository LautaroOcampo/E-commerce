
class Producto {
    constructor(nombre,precio,imagen,id){
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
        this.id = id
        this.textoA = `Foto de ${nombre}`
    }
}

const productos = []

const obtenerProductos = async () => {
    let response = await fetch("/data.json")
    let data = await response.json()
    data.forEach(ele =>{
        productos.push(new Producto(ele.nombre,ele.precio,ele.imagen,ele.id))
    })
    for(const producto of productos){
        let div = document.createElement("div")
        div.className = "main-img-div"
        div.innerHTML = `
        <div class="main-img-div ">
                            <img class="main-img" src="${producto.imagen}" alt=${producto.textoA}>
                            <div class="div-item-descripcion">
                                <p class="item-descripcion">${producto.nombre}</p>
                            </div>
                                <div class="boton-agregar-div">
                                <p>${producto.precio}$</p>
                                <button onclick="comprar(${producto.id})" class="boton-agregar">Agregar</button>
                            </div>
                        </div>
        `
        mainDivD.append(div)
    }
}
obtenerProductos()

let inputBuscar = document.getElementById("input")
let botonBuscar = document.getElementsByClassName("icon-buscar")
let mainDivD = document.getElementById("main-div2") 
let listItems = document.getElementsByClassName("list-item")
let mainImg = document.getElementsByClassName("main-img-div")
let scrollHeader = document.getElementById("header")
let divInput = document.getElementById("div-input")
let inputRango = document.getElementsByClassName("input-rango")
let numMin = document.getElementById("num-min")
let numMax = document.getElementById("num-max")
let botonAplicar = document.getElementById("aplicar")
let nav = document.getElementById("nav")
let carrito = document.getElementById("carrito")
let iconCarrito = document.getElementById("icon-carrito")
let carritoDivP = document.getElementById("carrito-divP")
let carritoProducto = document.getElementsByClassName("carrito-divP")
let carritoP = document.getElementById("carrito-p")
let iconBasura = document.getElementsByClassName("icon-basura")
let carritoTotal = document.getElementById("carrito-total")
let carritoDivS = document.getElementById("carrito-divS")
let botonVerMas = document.getElementById("boton-vermas")
let productosParse = []
productosParse = JSON.parse(localStorage.getItem("carrito")) || []
let a = productosParse.length
let e = 0



//-----COMPRAR-----
const comprar = async (param) => {
    let response = await fetch("/data.json")
    let data = await response.json()
    const producto = data.find(ele => ele.id === param)
    productosParse.push(producto)
    localStorage.setItem("carrito",JSON.stringify(productosParse))
    agregarAlCarrito(productosParse.length-1)
    let carritoArrayRed = productosParse.reduce((acum,ele) => acum + ele.precio, 0)
    carritoTotal.innerHTML = `Total: ${carritoArrayRed}$`
    productosParse.length > 0 ? carritoP.innerHTML = "" : carritoP.innerText = "Agrega productos al carrito!"
    Toastify({
        text:`Agregaste el producto ${producto.nombre} al carrito `,
        duration: 4000,
        className: "pruebe",
        gravity: "bottom",
    }).showToast()
    if(carritoArrayRed > 200000 && e === 0){
        Swal.fire({ titleText:'Estas gastando mucho dinero',
                    color:`black`,
                    icon: `warning`,
                    iconColor: `red`,
                    showClass:{
                    backdrop: `aparicion-alerta`,
                   },
                   confirmButtonColor: `black`,
                   buttonsStyling: `false`,
                   })
        e++
    }
    else if(carritoArrayRed < 200000 && e === 1){
        e--
    }
}  

//-----AGREGAR A CARRITO-----
const agregarAlCarrito = (param) =>{
    a++
    if(a < 4){
    let div = document.createElement("div")
    div.id = `carrito-${productosParse[param].id}`
    div.className = "carrito-divP"
    div.innerHTML = `
    <div class="carrito-divP-P">
             <img class="carrito-img" src="${productosParse[param].imagen}" alt="${productosParse[param].textoA}">
    </div>
    <div class="carrito-divP-S">
    <div class="carrito-divP-S-nombre">   
        <p class="carrito-divP-S-nombre">${productosParse[param].nombre}</p>
    </div>
    <div class="carrito-divP-S-precio">
        <p class="carrito-divP-T-precio-p">${productosParse[param].precio}$</p>
    </div>
    </div>
    <div class="carrito-divP-T">
        <button  onclick = "eliminar(${productosParse[param].id})"><i class="boton-basura fa-solid fa-trash-can"></i></button>
    </div>`
    carritoDivP.append(div)
    }
    if(a === 4){
        botonVerMas.classList.remove("desaparecer")
    }
    }


const eliminar = (idEliminar) => {
    const eliminar = document.getElementById(`carrito-${idEliminar}`)
    console.log(eliminar);
    eliminar.remove()
    const index = productosParse.findIndex((i) => i.id == idEliminar)
    console.log(index);
    productosParse.splice(index,1)
    console.log(productosParse);
    localStorage.setItem("carrito",JSON.stringify(productosParse))
    let carritoArrayRed = productosParse.reduce((acum,ele) => acum + ele.precio, 0);
    carritoTotal.innerHTML = `Total: ${carritoArrayRed}$`
    productosParse.length > 0 ? carritoP.innerHTML = "" : carritoP.innerText = "Agrega productos al carrito!"
    a--
    if(a < 4){
        botonVerMas.classList.add("desaparecer")
    }
    if(productosParse[2]){
        let div = document.createElement("div")
        div.id = `carrito-${productosParse[2].id}`
        div.className = "carrito-divP"
        div.innerHTML = `
        <div class="carrito-divP-P">
                 <img class="carrito-img" src="${productosParse[2].imagen}" alt="${productosParse[2].textoA}">
        </div>
        <div class="carrito-divP-S">
        <div class="carrito-divP-S-nombre">   
            <p class="carrito-divP-S-nombre">${productosParse[2].nombre}</p>
        </div>
        <div class="carrito-divP-S-precio">
            <p class="carrito-divP-T-precio-p">${productosParse[2].precio}$</p>
        </div>
        </div>
        <div class="carrito-divP-T">
            <button  onclick = "eliminar(${productosParse[2].id},${index})"><i class="boton-basura fa-solid fa-trash-can"></i></button>
        </div>`
        carritoDivP.append(div)
    }
}

//-----LOCALSTORAGE-----
const localStorageFun = () => {
    for(let i = 0 ; i < 3 ; i++){
        if(productosParse[i]){
            let div = document.createElement("div")
            div.id = `carrito-${productosParse[i].id}`
            div.className = "carrito-divP"
            div.innerHTML = `<div class="carrito-divP-P">
            <img class="carrito-img" src="${productosParse[i].imagen}" alt="${productosParse[i].textoA}">
            </div>
            <div class="carrito-divP-S">
            <div class="carrito-divP-S-nombre">   
               <p class="carrito-divP-S-nombre">${productosParse[i].nombre}</p>
            </div>
            <div class="carrito-divP-S-precio">
               <p class="carrito-divP-T-precio-p">${productosParse[i].precio}$</p>
            </div>
            </div>
            <div class="carrito-divP-T">
               <button onclick = "eliminar(${productosParse[i].id},${i})"><i class="icon-basura fa-solid fa-trash-can"></i></button>
            </div>`
        carritoDivP.append(div)
        }
    }
    if(productosParse.length > 3){
        botonVerMas.classList.remove("desaparecer")
    }
    let carritoArrayRed = productosParse.reduce((acum,ele) => acum + ele.precio, 0);
    productosParse.length > 0 ? carritoTotal.innerHTML = `Total: ${carritoArrayRed}$` : carritoP.innerText = "Agrega productos al carrito!"
    
}
localStorageFun()

//----SACAR LAS TILDES---
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

//-----NAVBAR CAMBIO-----
const navbar = () =>{
let div = document.createElement("div")
    div.className = "nav-list"
    div.innerHTML = `
        <li onclick="navbarCambio(0)" class="list-item">Abrigos</li>
        <li onclick="navbarCambio(8)" class="list-item">Sacos</li>
        <li onclick="navbarCambio(16)" class="list-item">Camisas</li>
        <li onclick="navbarCambio(24)" class="list-item">Pantalones</li>
        <li onclick="navbarCambio(32)" class="list-item">Zapatos</li>
        <li onclick="navbarCambio(40)" class="list-item">Accesorios</li>
        `
    nav.append(div)
}

const navbarCambio = (param) => {
    mainDivD.innerHTML = ""
    for(let i = 0 ; i < 8 ; i++){
     let div = document.createElement("div")
     div.className = "main-img-div"
     div.innerHTML = `<div class="main-img-div ">
    <img class="main-img" src="${productos[i + param].imagen}" alt=${productos[i + param].textoA}>
    <div class="div-item-descripcion">
        <p class="item-descripcion">${productos[i + param].nombre}</p>
    </div>
        <div class="boton-agregar-div">
        <p>${productos[i + param].precio}$</p>
        <button onclick="comprar(${productos[i + param].id})" class="boton-agregar">Agregar</button>
    </div>
    </div>`
     mainDivD.append(div)
     }
}
navbar()

//-----BUSCADOR------
botonBuscar[0].addEventListener("click",() =>{
    let busqueda = productos.filter(ele =>removeAccents(ele.nombre.toLowerCase()).includes(removeAccents(inputBuscar.value.toLowerCase())))
    mainDivD.innerHTML = ""
    for(const producto of busqueda){
            let div = document.createElement("div")
            div.innerHTML = `
            <div class="main-img-div ">
                <img class="main-img" src="${producto.imagen}" alt=${producto.textoA}>
                <div class="div-item-descripcion">
                    <p class="item-descripcion">${producto.nombre}</p>
                </div>
                <div class="boton-agregar-div">
                    <p>${producto.precio}$</p>
                    <button onclick="comprar(${producto.id})" class="boton-agregar">Agregar</button>
                </div>
            </div>`
            mainDivD.append(div)
    }
})

//-----SCROLLMENU----
window.addEventListener("scroll",() => {
    scrollHeader.classList.toggle("scroll-header",window.scrollY>0);
    divInput.classList.toggle("desaparecer",window.scrollY>0);
    carrito.classList.toggle("carrito-moveY",window.scrollY>0)
    
})

//----RANGO DE PRECIOS---
inputRango[0].addEventListener("input", () =>{
    numMin.innerHTML = `${inputRango[0].value * 1000}$`
})

inputRango[1].addEventListener("input", () =>{
    numMax.innerHTML = `${inputRango[1].value * 1000}$`
})

//-----APLICAR RANGO DE PRECIOS-------
const rangoDePrecios = () => {  
    let busqueda = productos.filter(ele => ele.precio < inputRango[1].value * 1000 && ele.precio > inputRango[0].value * 1000)
    mainDivD.innerHTML = ""
    for(const producto of busqueda){
            let div = document.createElement("div")
            div.innerHTML = `
            <div class="main-img-div ">
                <img class="main-img" src="${producto.imagen}" alt=${producto.textoA}>
                <div class="div-item-descripcion">
                    <p class="item-descripcion">${producto.nombre}</p>
                </div>
                <div class="boton-agregar-div">
                    <p>${producto.precio}$</p>
                    <button onclick="comprar(${producto.id})" class="boton-agregar">Agregar</button>
                </div>
            </div>`
            mainDivD.append(div)
    }
}

botonAplicar.addEventListener("click",() => {
    rangoDePrecios()
})

//-----CARRITO MENU-------
iconCarrito.addEventListener("click",() => {
    carrito.classList.toggle("carrito-position")
    carrito.classList.toggle("carrito-positionA")
})