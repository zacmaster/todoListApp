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
            selectedId: null
        };

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

    addTask = id => {
        let tasks = this.state.tasks
        let title = this.state.title
        let description = this.state.description


        id ? tasks = tasks.filter(t => t.props.id !== id) : id = Date.now()

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
            selectedId: null

        })

    }

    editTask = (id,title,description) => {
        this.setState({selectedId: id, title: title, description: description})
    }

    deleteTask =  id => {
        console.log('deleting', id)
        let tasks = this.state.tasks
        tasks = tasks.filter(t => parseInt(t.key) !== id)
        this.setState({tasks: tasks, selectedId: null, title: '', description: ''})
    }

    deleteAll = () => {
        this.setState({tasks: [],title: '',description: '', selectedId: null})
    }

    // ---Auxiliar methods
    validFields = () => {
        return this.state.title !== ''
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