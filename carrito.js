
const funcionCarrito=()=>{

//Evento carrito cuando se hace clic

    //limpiar carrito
    modalContainer.innerHTML="";
    //se vuelve apretar y funciona el boton
    modalContainer.style.display="flex";
    //se crea modal
    const modalHeader = document.createElement("div");
    //a ese div le asigno una clase dsp dar estilos
    modalHeader.className = "modal-header"
    //le creo su html
    modalHeader.innerHTML = `
    <h1>Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    const modalButton = document.createElement("button");
    modalButton.innerText = "X";

    //al hacer click se cierra
    modalButton.addEventListener("click",()=>{
        modalContainer.style.display="none";
    })

    modalHeader.append(modalButton);
    //recorro carrito
    carrito.forEach((product) =>{
        //mostrar contenido
    let carritoContent = document.createElement("div")
    carritoContent.innerHTML = `
    <h1> ${product.combo} </h1> 
    <h2> ${product.precio} $ </h2>
    <p> ${product.descripcion} </p>
    <span class= "delete-product"> ❌ </span>
    `;
    modalContainer.append(carritoContent);

    //boton eliminar
    let eliminar=carritoContent.querySelector(".delete-product");
    eliminar.addEventListener("click",()=>{
        eliminarProducto(product.id)
    })
    });
    
    // suma con reduce. Empieza en 0 y recorre carrito y le suma
    const totalCompra = carrito.reduce((acumulador, producto) =>acumulador + producto.precio, 0);

    const totalCarrito = document.createElement("div")
    totalCarrito.className = "total-content"
    totalCarrito.innerHTML = ` <h3> El total de su compra es: $ ${totalCompra} </h3>  `
    modalContainer.append(totalCarrito)  
 
}

// Función para eliminar un producto específico
const eliminarProducto = (id) => {
    const foundId = carrito.find ((element)=> element.id === id);
    console.log(foundId);
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId;
    })
    funcionCarrito();
};
verCarrito.addEventListener("click", funcionCarrito)
