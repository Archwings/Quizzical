import React from 'react'
import {nanoid} from "nanoid"
// key={nanoid()}
// statement={decodeHTML(question.question)}
// ans={question.correct_answer}
// options={createShuffledArray(question.correct_answer, question.incorrect_answers)}
// selected=""
// onClick={onClickHandler}

export default function Question(props) {
    console.log(props.options)
    const onScreenOptions = props.options.map(option => (
        <div key={nanoid()} className='question-button'>
            <li className='question-text' onClick={props.onClick}>{option.text}</li>
        </div>
    ))
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