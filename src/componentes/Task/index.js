import React from 'react'
import './style.css'

const Task = props => {
    return (
    <div className="task">
        <div>
            <h4>{props.title}</h4>   
            <p>{props.description}</p>
        </div>
        <div>
            <button onClick={() => props.editTask(props.id,props.title,props.description)}>Editar</button>
            <button onClick={() => props.deleteTask(props.id)}>Eliminar</button>
        </div>
    </div>
    )
}

export default Task
