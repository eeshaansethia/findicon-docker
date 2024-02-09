import React from 'react'
import '../styles/promptCard.css'

const PromptCard = (props) => {
    return (
        <div className="prompt-card">
            <div className="prompt-card-body">
                <img className="prompt-card-icon" src={props.icon} />
                <h5 className="prompt-card-title">{props.name}</h5>
            </div>
            <div className="prompt-card-delete" onClick={props.deleteFunction}>
                <i className="fa-solid fa-trash"></i>
            </div>
        </div>
    )
}

export default PromptCard
