import React from 'react'

const TaskCounter = props => {

    let noPendingTasks = 'No hay tareas pendientes'
    let oneTaskPending = 'Hay una tarea pendiente'
    const pendingTasks = quantity => `Hay ${quantity} tareas pendientes`
    
    return (
        <div>
            {props.quantity === 0 && noPendingTasks}
            {props.quantity === 1 && oneTaskPending}
            {props.quantity > 1 && pendingTasks(props.quantity)}
        </div>
    )
}

export default TaskCounter
