//capturo div prod
const productos = document.getElementById("productos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

//array con objetos
const menu = 
[
    {id: 1, combo: "COMBO 1", precio: 2500,  descripcion: "hamburguesa simple con papas y gaseosa"},
    {id: 2, combo: " COMBO 2", precio: 2900,  descripcion: "hamburguesa doble con papas y gaseosa"},
    {id: 3, combo: "COMBO 3", precio: 3500, descripcion: "hamburguesa triple con papas y gaseosa"},
    {id: 4, combo: "COMBO 4", precio: 2400, descripcion: "nuggets con papas y gaseosa"},
    {id: 5, combo: "COMBO 5", precio: 1900,  descripcion: "menu infantil"},
]

//arranca vacio o con lo que hay en el local
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//recorrer array con forEach
menu.forEach((product)=> {
    //creo en HTML las cards me falta darle estilos
    let content = document.createElement("div");
    content.innerHTML = `
    <h1> ${product.combo} </h1>
    <h2> ${product.precio} </h2>
    <p> ${product.descripcion} </p>
    `;
//Al id le paso todas las "card"
productos.append(content)

//agrego boton 
let comprar = document.createElement("button")
comprar.innerText = "COMPRAR";
content.append(comprar)

//EVENTOS
comprar.addEventListener("click",()=>
{
    //pusheo al carrito
    carrito.push ({
        combo:product.combo,
        precio:product.precio,
        descripcion: product.descripcion
    })

    // alert agregado
    Swal.fire({
        icon: 'success',
        title: 'Ha sido agregado al carrito',
        showConfirmButton: false,
        timer: 500
      })
    console.log(carrito)
    //pedir que cada agregado vaya al local
    saveLocal();
    
})
});

//guardar y cambiar a string con json
const saveLocal =()=>{
localStorage.setItem("carrito", JSON.stringify (carrito))
};

//get para parsear info
JSON.parse(localStorage.getItem("carrito"))