
const funcionCarrito=()=>{

//Evento carrito cuando se hace clic

    //limpiar carrito
    modalContainer.innerHTML="";
    //se vuelve apretar y funciona el boton
    modalContainer.style.display="flex";
    //se crea modal
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1>TU COMPRA</h1>
    `;
    modalContainer.append(modalHeader);
    const modalButton = document.createElement("button");
    modalButton.innerText = "CERRAR";

    //al hacer click se cierra
    modalButton.addEventListener("click",()=>{
        modalContainer.style.display="none";
    })

    modalHeader.append(modalButton);
    //recorro carrito
    carrito.forEach((product) =>{
        //mostrar contenido
    let carritoContent = document.createElement("div")
    carritoContent.className="carritoContent"
    carritoContent.innerHTML = `
    <h1> ${product.combo} </h1> 
    <h2> ${product.precio} $ </h2>
    <span class= "restar"> - </span>
    <p>Cantidad: ${product.cantidad} </p>
    <span class= "sumar"> + </span>
    <p> ${product.descripcion} </p>
    `;

      modalContainer.append(carritoContent);


    //boton restar
      let restar = carritoContent.querySelector(".restar")
      restar.addEventListener("click",()=>{
        if (product.cantidad > 0) {
          product.cantidad -= 1; 
          product.precioTotal = product.precio * product.cantidad;
          funcionCarrito(); 
      }
  
    })

    //boton sumar
    let sumar = carritoContent.querySelector(".sumar")
      sumar.addEventListener("click",()=>{
          product.cantidad += 1; 
          product.precioTotal = product.precio * product.cantidad;
           funcionCarrito();
    })
   
    });
  

    // suma con reduce. Empieza en 0 y recorre carrito y le suma
    const totalCompra = carrito.reduce((acumulador, producto) =>acumulador + producto.precioTotal, 0);
    const totalCarrito = document.createElement("div")
    totalCarrito.className = "total-content"
    totalCarrito.innerHTML = ` <h3> El total de su compra es: $ ${totalCompra} </h3>
    <h6> 🍔🍟💲Se abona en efectivo al recibir el pedido o por mercado pago 🍔🍟💲 </h6>
     `
    modalContainer.append(totalCarrito)  

    //ELIMINAR CARRITO
    const vaciarCarrito = document.createElement("button");
    vaciarCarrito.className = "vaciarCarrito";
    vaciarCarrito.innerHTML = ` <button> VACIAR CARRITO </button>
    `
    modalContainer.append(vaciarCarrito);
  
    vaciarCarrito.addEventListener("click", () => {
      carrito = []; // Vaciar el carrito
      saveLocal();
      funcionCarrito(); // Actualizar la vista del carrito estando vacia
    });

     //FINALIZAR COMPRA
    const realizarCompra = document.createElement("button")
    realizarCompra.className="realizarCompra"
    realizarCompra.innerHTML = ` <button> FINALIZAR COMPRA </button>
    `
    modalContainer.append(realizarCompra) 
    realizarCompra.addEventListener("click",finalizarCompra) 
  }


verCarrito.addEventListener("click", funcionCarrito)

  //BOTON FINALIZAR
  const finalizarCompra = () => {
    const form = document.createElement("form");
    const inputNombre = document.createElement("input");
    inputNombre.setAttribute("type", "text");
    inputNombre.setAttribute("placeholder", "Ingrese su nombre");
  
    const inputDireccion = document.createElement("input");
    inputDireccion.setAttribute("type", "text");
    inputDireccion.setAttribute("placeholder", "Ingrese su dirección");
  
    const btnEnviar = document.createElement("button");
    btnEnviar.textContent = "Enviar";
  
    form.appendChild(inputNombre);
    form.appendChild(inputDireccion);
    form.appendChild(btnEnviar);
  
    modalContainer.appendChild(form);
  
    btnEnviar.addEventListener("click", () => {
      const combo = carrito.map(product => product.combo).join(', ');
      const totalCompra = carrito.reduce((total, product) => total + (product.precio * product.cantidad), 0);
      enviarWpp(inputNombre.value, inputDireccion.value, combo, totalCompra);
    });
  };
  
  //ENVIAR PEDIDO AL WPP
  const enviarWpp = (nombre, direccion, combo, totalCompra) => {
    const numeroTelefono = "01168176099";
    let mensaje = "¡Hola!";
    if (nombre && direccion) {
      mensaje += ` Mi nombre es ${nombre}. Tengo listo el pedido para la dirección ${direccion} 🍔🍟
      Mi pedido es ${combo} 
      Precio final ${totalCompra}
      Abono en efectivo al recibir el pedido! 💲 💲 
      `;
    }
    const linkWpp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
    
    window.open(linkWpp);
  };