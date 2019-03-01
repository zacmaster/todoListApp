import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            texto: '',
            tareas: [],
            idSeleccionado: null
        };
    }

    handleChange  = ({target}) => {
        this.setState({texto: target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.texto !== '') this.agregarTarea(this.state.idSeleccionado)
    }


    agregarTarea(id){
        let tareas = this.state.tareas
        let texto = this.state.texto

        id ? tareas = tareas.filter(t => t.props.id !== id) : id = Date.now()  
        
        tareas.unshift(
            <div key={id} id={id}>
                <span>{texto}</span>
                <button onClick={() => this.editarTarea(id,texto)}>Editar</button>
                <button onClick={() =>  this.eliminarTarea(id)}>Eliminar</button>
            </div>
        )
        this.setState({tareas: tareas, texto: '', idSeleccionado: null})
    }


    editarTarea(id, texto){
        this.setState({idSeleccionado: id, texto: texto})
    }

    eliminarTarea(id){
        let tareas = this.state.tareas
        tareas = tareas.filter(t => parseInt(t.key) !== id)
        this.setState({tareas: tareas, idSeleccionado: null, texto: ''})
    }   

    eliminarTodas = () =>{
        this.setState({tareas: []})
    }        


    getTextoTareasPendientes(){
        return this.state.tareas.length === 0 ? 'No hay tareas pendientes' :
            (this.state.tareas.length === 1 ?
                'Hay una tarea pendiente' :
                'Hay ' + this.state.tareas.length + ' tareas pendientes')
    }


    


    render() {
        return(
            <div>
                <h1>TODO-list App</h1>
                <h5>{this.getTextoTareasPendientes()}</h5>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.texto} onChange={this.handleChange}/>
                    <input type="submit" value="Agregar"/>
                </form>
                {this.state.tareas.length > 1 && <button onClick={this.eliminarTodas}>Eliminar todas</button>}
                <div>
                    {this.state.tareas}
                </div>
            </div>
        );
    }
}

export default App;