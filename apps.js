//capturo div prod
const productos = document.getElementById("productos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

//arranca vacio o con lo que hay en el local
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//func asincrona
const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    console.log(data);
    
//recorrer array con forEach
    data.forEach((product)=> {
        let content = document.createElement("div");
        content.className="card"
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
        const producto = {
            combo: product.combo,
            cantidad: 1, 
            precio: product.precio,
            descripcion: product.descripcion,
            precioTotal: product.precio 
        };
    
        // Agregar el producto al carrito
        carrito.push(producto);

        // Actualizar el local storage
        saveLocal();

        // Alerta de producto agregado al carrito
        Swal.fire({
            icon: 'success',
            title: 'Ha sido agregado al carrito',
            showConfirmButton: false,
            timer: 500
        });

        console.log(carrito)
        //pedir que cada agregado vaya al local
        saveLocal();
        
    })
    });
};

getProducts();

//guardar y cambiar a string con json
const saveLocal =()=>{
localStorage.setItem("carrito", JSON.stringify (carrito))
};

//get para parsear info
JSON.parse(localStorage.getItem("carrito"))