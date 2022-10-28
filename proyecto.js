//CREAREMOS UNA WEB QUE OFRECE CURSOS PARA AYUDAR A CRECER A LOS EMPRENDEDORES EN DIFERENTES AREAS
//ADD FECHA Y HORA - LUXON
let mostrarFecha = document.getElementById("fecha");
let mostrarReloj = document.getElementById("reloj");

const DateTime = luxon.DateTime

const dt = DateTime.now();
console.log(dt)

const fecha = dt.toLocaleString(DateTime.DATE_FULL)
mostrarFecha.innerHTML = `${fecha}`

//FUNCTION MOSTRAR FECHA ACTUAL CON EL METODO setInterval + toLocalTimeString
setInterval(() => {
    let hora = new Date();
    mostrarReloj.innerHTML = hora.toLocaleTimeString();
}, 1000)

//CREANDO FUNCTION QUE RECORRE LOS PRODUCTOS A MOSTRAR 

//1RO CAPTURAMOS CON DOM EL ID EN DONDE SE VAN A AGREGAR LOS PRODUCTOS
let contenedorTalleres = document.getElementById("contenedorProductos")
//CAPTURAMOS CON DOM BURBUJA DE NOTIFICACION AL CARRITO 
let conteoCarrito = document.getElementById('conteoCarrito')
//Se agrega una especie de Loader con setTimeout
let loader = document.getElementById("load")
setTimeout(() => {
    loader.remove()
    mostrarCatalogo(contenido)

}, 3000)

function mostrarCatalogo(contenido) {
    contenedorTalleres.innerHTML = " "
    contenido.forEach((e) => {
        const {
            id,
            title,
            price,
            imagen,


        } = e

        // CREAMOS UN DIV PARA INSERTAR LOS CARDS QUE MUESTRAN LOS TALLERES
        let nuevoProducto = document.createElement("div")

        nuevoProducto.innerHTML = `  <div class="card" id="${id}" style="width: 30rem;">
                                <img src="recursos/${imagen}" class="card-img-top mt-4" alt=${title}>
                                <div class="card-body">
                                <p class="card-text descripcionTaller">${title}</p>
                                <p class= "${price <= 7000 ? "ofertaExpres" :"precioComun"}">$${price}</p>
                               <button id="btnComprar${id}" class="btn btn-primary"><i class="fas fa-shopping-cart fa-1x"></i> COMPRAR</button>
                                </div>
                            </div> `
        contenedorTalleres.append(nuevoProducto)

        //APLICAR FUNCIONALIDAD Y EVENTOS AL BTN COMPRAR:
        let btnComprar = document.getElementById(`btnComprar${e.id}`)

        btnComprar.addEventListener('click', () => {
            agregarAlCarrito(e)

            //MUESTRA CANTIDAD DE PRODUCTOS EN BURBUJA actualizandoce
            conteoCarrito.innerText = productosEnCarrito.length
        })

    })

}

//FUNCTION PARA BUSCAR LOS TALLERES DISPONIBLES 
let tallerBuscado = document.getElementById("buscarProductos")

function buscarProducto() {
    let tallerEncontrado = contenido.filter((prod) => prod.title.toLowerCase().includes(tallerBuscado.value.toLowerCase()))

    tallerEncontrado == 0 ? Swal.fire('No existe este taller en nuestra academia') : contenedorTalleres.innerHTML = ""
    mostrarCatalogo(tallerEncontrado)

}

//EVENTO PARA BOTON BUSCAR TALLERES
let botonBuscar = document.getElementById("btnBuscar")

botonBuscar.addEventListener("click", () => {
    buscarProducto()

})
//DOM APLICADO A LOS ELEMENTOS ID - CARRITO
let botonCarrito = document.getElementById("botonCarrito")
let contenedorCarrito = document.getElementById("carritoContenedor")
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra")
let totalCompra = document.getElementById("precioTotal")

//ALMACENA PRODUCTOS EN CARRITO EN EL LOCALSTORAGE Y LOS GUARDA SI ACTUALIZAMOS 
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []


//EVENTO AL HACER CLICK EN BOTON CARRITO
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})


//FUNCTION PARA AGREGAR AL CARRITO LOS TALLERES Y GUARDAR EN EL STORAGE 
function agregarAlCarrito(e) {
    //VARIABLE QUE ME ENCUENTRA EL TALLER REPETIDO
    let tallerAdd = productosEnCarrito.find((elem) => (elem.id === e.id))


    //EJECUTAR CONDICIONAL PARA NO REPETIR LOS TALLERES YA SUMADOS AL CARRITO
    if (tallerAdd == undefined) {
        productosEnCarrito.push(e)

        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        //APLICANDO LIBRERIAS SWEET ALERT
        Swal.fire({
            title: "Ha agregado un taller a su carrito",
            icon: "success",
            confirmButtonText: "Acepto",
            confirmButtonColor: "violet",
            timer: 3000,
            text: `El Taller ${e.title} ha sido agregado`,
            imageUrl: `recursos/${e.imagen}`,
            imageHeight: 300,
            imageAlt: `${e.titulo}`

        })
    } else {
        Swal.fire({
            title: "Ya agregaste este taller al carrito",
            icon: "info",
            confirmButtonText: "Acepto",
            confirmButtonColor: "violet",
            timer: 3500,
            text: `El Taller ${e.title} ya se encuentra en tu carrito`,

        })
    }

}


//FUNTION PARA CARGAR LA DESCRIPCION DE LA COMPRA AL MODAL DEL CARRITO
function cargarProductosCarrito(array) {

    contenedorCarrito.innerHTML = ""
    array.forEach((prod) => {

        contenedorCarrito.innerHTML += `
        <div class="card border-primary mb-3" id="prod${prod.id}" style="width:420px;">
        <div class="cardConteinerDetails">
        <img class="card-img-top cardImg" src="recursos/${prod.imagen}" alt="${prod.title}">
        <div class="card-body cardBody">
        <p class="card-title">${prod.title}</p>  
        <p class="card-text">$${prod.price}</p> 
        <button class= "btn btnTrash btn-danger" id="botonEliminar${prod.id}"><i class="fas fa-trash-alt"></i></button>
        </div>
        </div>  
        </div> 
    </div>
        `
        //TRAER CON DOM BTN ELIMINAR 
        console.log(document.getElementById(`botonEliminar${prod.id}`))

    })


    //Funcionabilidad para eliminar 
    //1RO.RECORRE CADA PROD AGREGADO
    array.forEach((prod, indice) => {
        document.getElementById(`botonEliminar${prod.id}`).addEventListener("click", () => {
            //2DO.METODO SPLICE PARA ELIMINARLO DEL ARRAY
            array.splice(indice, 1)
            //3RO.ELIMINAR DEL STORAGE 
            localStorage.setItem("carrito", JSON.stringify(array))
            //4TO.ELIMINAR CARD DEL DOM Y NO SE VIZUALICE
            let cardProdEliminar = document.getElementById(`prod${prod.id}`)
            console.log(cardProdEliminar)
            cardProdEliminar.remove()
            //RE-CALCULAR EL TOTAL AL ELIMINAR PRODUCTOS
            compraTotal(array)
            //ACTUALIZA EL VALOR EN LA BURBUJA CADA VEZ QUE BORRAMOS PRODUCTO
            conteoCarrito.innerText = productosEnCarrito.length

        })
    })
    //FUNCTION PARA CALCULAR EL TOTAL
    compraTotal(array)
    //MUESTRA CANTIDAD DE PRODUCTOS EN BURBUJA
    conteoCarrito.innerText = productosEnCarrito.length
}

function compraTotal(array) {
    let acumulador = 0

    acumulador = array.reduce((acumulador, prod) => {
        return acumulador + prod.price
    }, 0)
    //APLICACION OPERADOR TERNARIO BAJO CONDICIONAL
    acumulador == 00 ? totalCompra.innerHTML = "Aun no has agregado tus talleres a comprar" : totalCompra.innerHTML = `Total a pagar: $${acumulador}`

}

//FUNTION FINALIZAR COMPRA 
btnFinalizarCompra.addEventListener("click", () => {
    finalizarCompra()
})

function finalizarCompra() {
    Swal.fire({
        title: 'Vas a finalizar tu compra, estas seguro?',
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'No, cancelar',
        confirmButtonText: 'Si, Comprar!',
        confirmButtonColor: 'violet',
        cancelButtonColor: 'red',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Compra Exitosa',
                showConfirmButton: false,
                text: `Muchas gracias por su compra `,
                timer: 2500
            })
            //RESET CARRITO 
            productosEnCarrito = []
            localStorage.removeItem("carrito")
            setTimeout(() => {
                location.reload()
            }, 3000)
        } else {
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Revisar productos en carrito`,
                confirmButtonColor: 'violet',
                timer: 3500
            })
        }
    })
}