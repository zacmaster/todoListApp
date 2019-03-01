import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            texto: '',
            tareas: [],
            idSeleccionado: null
        };
        this.agregarTarea = this.agregarTarea.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.eliminarTarea = this.eliminarTarea.bind(this)
        this.editarTarea = this.editarTarea.bind(this)
    }


    handleSubmit(e){
        e.preventDefault()
        if(this.state.texto !== '')this.agregarTarea(this.state.idSeleccionado)
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
        tareas = tareas.filter(t => {
            return parseInt(t.key) !== id
        })
        this.setState({tareas: tareas})
    }   


    handleChange({target}){
        this.setState({texto: target.value})
    }



    render() {
        return(
            <div>
                <h1>TODO-list App</h1>
                <h5>{
                    this.state.tareas.length === 0 ?
                        'No hay tareas pendientes' :
                        (this.state.tareas.length === 1 ?
                            'Hay una tarea pendiente' :
                            'Hay ' + this.state.tareas.length + ' tareas pendientes')}
                </h5>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.texto} onChange={this.handleChange}/>
                    <input type="submit" value="Agregar"/>
                </form>
                <div>
                    {this.state.tareas}
                </div>
            </div>
        );
    }
}

App.propTypes = {

};

export default App;