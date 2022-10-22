import React from 'react'


export default function Question(props) {
    
    const onScreenOptions = props.options.map(option => {
        let styleButton 
        if (props.gameEnded) {
            if (!option.isSelected) {
                styleButton = {backgroundColor: "#F5F7FB"}
            } else {
                styleButton = {backgroundColor: "#F8BCBC"}
            }
            if (props.ans === option.text) {
                styleButton = {backgroundColor: "#94D7A2"}
            } 
        } else {
            styleButton = option.isSelected ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"}
        }

        return (
        <div key={option.optionID} className='question-button' style={styleButton} onClick={() => props.onClick(option.optionID, props.id)}>
            <li className='question-text' >{option.text}</li>
        </div>
        )
    })
    const styleGrid =  {gridTemplate: `auto auto / repeat(${props.options.length}, 1fr)`}
    return (
        <div className='question'>
            <h1>{props.statement}</h1>
            <ol className='question-buttonsContainer' style={styleGrid}>
                {onScreenOptions}
            </ol>
        </div>
        
    )
    
}