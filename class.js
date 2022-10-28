//AGREGANDO LAS CARDS CON innerHTML
class Talleres {
    constructor(id, title, price, imagen) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imagen = imagen;




    }

}

const cargandoProductos = async () => {
    const response = await fetch("data.json")
    const data = await response.json()
    // console.log(data)
    for (let taller of data) {
        let tallerNuevo = new Talleres(taller.id, taller.title, taller.price, taller.imagen)
        contenido.push(tallerNuevo)

    }
    //ALMACENAR DATOS DE LOS TALLERES EN EL STORAGE 
    localStorage.setItem("listatalleres", JSON.stringify(contenido))

}
cargandoProductos()
//Inicializando array
const contenido = []