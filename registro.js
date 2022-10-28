//APLICAMOS DOM PARA LLAMAR LOS ELEMENTOS ID FORMULARIO: 
let inputName = document.getElementById("inputName")
let mail = document.getElementById("inputMail")
let clave = document.getElementById("inputPassword")
let rubro = document.getElementById("inputRubro")


//ALMACENAR EN EL STORAGE LOS DATOS DEL USUARIO REGISTRADOS
class Usuario {
    constructor(nombre, correo, password, rubros) {
        this.inputName = nombre;
        this.mail = correo;
        this.clave = password;
        this.rubro = rubros;
    }
}


let usuarioCreado
//GUARDAR USUARIOS EN EL STORAGE 
let registros = JSON.parse(localStorage.getItem("registros")) || []


function guardarUsuario(array) {
    //CREAMOS UNA INSTANCIACION DE LOS OBJ A RECIBIR EN NUESTRO ARRAY
    let usuarioCreado = new Usuario(inputName.value, mail.value, parseInt(clave.value), rubro.value)
    array.push(usuarioCreado)
    //ACTUALIZAMOS CADA REGISTRO EN STORAGE
    localStorage.setItem("registros", JSON.stringify(array))


}

let registro = document.getElementById("btnRegistro")
//BOTON REGISTRASE
if (registro) {
   
    registro.addEventListener("click", () => {

        guardarUsuario(registros);
        //ALERT AL REGISTRARSE
        Swal.fire({
            title: 'Registro realizado',
            icon: 'success',
            text: `Pronto te enviaremos tu descuento! Revisar correo`,
            confirmButtonColor: 'violet',
            timer: 3500
        })

    })
}