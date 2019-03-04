import React from 'react'

const Form = props => {
    const handleSubmit = (e) =>{
        e.preventDefault()
        props.handleSubmit()
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={props.handleTitleChange} placeholder="Título" value={props.title}/>
                <input type="text" name="description" onChange={props.handleDescriptionChange} placeholder="Descripción" value={props.description}/>
                <input type="submit" value={props.submitText}/>
            </form>
            {props.quantity > 1 && <button onClick={() => props.deleteAll()}>Eliminar todas</button>}    
        </>
    )
}

export default Form
