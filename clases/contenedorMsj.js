export default class ContenedorMsj {
    constructor() {
        this.mensajes = []
        this.id = 0
    }

    listar(id) {
        const elem = this.mensajes.find(elem => elem.id == id)
        return elem || { error: `elemento no encontrado` }
    }

    listarTodo() {
        return [...this.mensajes]
    }

    guardar(elem) {
        const newElem = { ...elem, id: ++this.id }
        this.mensajes.push(newElem)
        return newElem
    }

    actualizar(elem, id) {
        const newElem = { id: Number(id), ...elem }
        const index = this.mensajes.findIndex(p => p.id == id)
        if (index !== -1) {
            this.mensajes[index] = newElem
            return newElem
        } else {
            return { error: `elemento no encontrado` }
        }
    }

    borrar(id) {
        const index = this.mensajes.findIndex(elem => elem.id == id)
        if (index !== -1) {
            return this.mensajes.splice(index, 1)
        } else {
            return { error: `elemento no encontrado` }
        }
    }

    borrarTodo() {
        this.mensajes = []
    }
}


