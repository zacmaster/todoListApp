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
        let tasks = this.state.tasks
        let title = this.state.title
        let description = this.state.description

        let taskObj = {title: title, description: description}

        if(!id){
            id = await this.postTask(taskObj)

        }
        else{
            tasks = tasks.filter(task => task.key !== id)
            this.updateTask(id,taskObj)
        }

        tasks.unshift(<Task
            key={id}
            id={id}
            title={title}
            description={description}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
        />)



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
        let tasks = this.state.tasks
        let url = this.url + id
        tasks = tasks.filter(t => t.key !== id)
        this.setState({tasks: tasks, selectedId: null, title: '', description: '',edicion: false})
        
        fetch(url,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
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

    componentDidMount(){
        this.getAllTask()
    }

    getAllTask = async () => {
        const response = await fetch(this.url)
        const tasks = await response.json()
        this.loadTasksFromApi(tasks)

            
    }

    loadTasksFromApi = tasksObjects => {
        let tasks = tasksObjects.map(task => {
            return (<Task
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            editTask={this.editTask}
                            deleteTask={this.deleteTask}
            />)
        })
        this.setState({
            tasks: tasks,
            title: '',
            description: '',
            selectedId: null
        })
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
                <div>
                    {this.state.tasks}
                </div>
            </div>
        );
    }
}

App2.propTypes = {

};

export default App2;