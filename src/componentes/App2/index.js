import React, { Component } from 'react'
import Form from '../Form'
import Task from '../Task'
import TaskCounter from '../TaskCounter'

class App2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            tasks: [],
            edicion: false,
            selectedId: null
        };

        // this.url = 'http://localhost:4000/tasks/'
        this.url = 'https://task-api-zacmaster.herokuapp.com/tasks/'

    }



    // ----handlers
    handleTitleChange = ({target}) => {
        this.setState({title: target.value})
    }


    handleDescriptionChange = ({target}) => {
        this.setState({description: target.value})
    }
    
    handleSubmit = () => {
        if(this.validFields()) this.addTask(this.state.selectedId)
    }




    // ----methods

    addTask = async id => {

        let {tasks, title, description} = this.state
        const taskObj = {title, description}
        
        if(id){
            await this.updateTask(id,taskObj)
            tasks = tasks.map(t => t._id === id ? t = {...t, ...taskObj} : t)
        }
        else{
            taskObj._id = await this.postTask(taskObj)
            tasks.push(taskObj)
        }

        
        this.setState({
            tasks: tasks,
            title: '',
            description: '',
            selectedId: null,
            edicion: false
        })
    }





    editTask = (id,title,description) => {
        this.setState({selectedId: id, title: title, description: description, edicion: true})
    }

    deleteTask =  async id => {
        let { tasks } = this.state
        let url = this.url + id
        console.log('id:',id)
        tasks = tasks.filter(t => t._id !== id)
        
        await fetch(url,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })

        this.setState({tasks: tasks, selectedId: null, title: '', description: '',edicion: false})
    }

    deleteAll = async () => {
        await fetch(this.url,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        this.setState({tasks: [], title: '',description: '',selectedId: null, edicion: false})
    }

    // ---Auxiliar methods
    validFields = () => {
        return this.state.title !== ''
    }

    async componentDidMount(){
        const response = await fetch(this.url)
        const tasks = await response.json()
        this.setState({tasks: tasks})
    }



    postTask = async data => {
        const response = await fetch(this.url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        const json = await response.json()
        const id = json._id
        return id
    }


    updateTask = async (id,data) => {
        const url = this.url + id
        fetch(url,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        // const json = await response.json()
    }



    render() {
        return(
            <div>
                <h1>TODO-list App</h1>
                <TaskCounter quantity={this.state.tasks.length}/>
                <Form
                        handleTitleChange={this.handleTitleChange}
                        handleDescriptionChange={this.handleDescriptionChange}
                        handleSubmit={this.handleSubmit}
                        deleteAll={this.deleteAll}
                        quantity={this.state.tasks.length}
                        title={this.state.title}
                        description={this.state.description}
                        submitText={this.state.edicion ? 'Guardar' : 'Agregar'}
                />
                <div style={{display: 'flex',flexDirection: 'column-reverse'}}>
                    {
                        this.state.tasks.map(({_id, title, description},index) => (
                            <Task
                                key={index}
                                title={title}
                                description={description}
                                editTask={() => this.editTask(_id,title,description)}
                                deleteTask={() => this.deleteTask(_id)}
                            />
                        ))

                    }
                </div>
            </div>
        );
    }
}

App2.propTypes = {

};

export default App2;