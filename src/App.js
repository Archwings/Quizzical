import './App.css';
import Question from './Question.js';
import React from 'react'
import {nanoid} from "nanoid"

function App() {

  const [startScreen, setStartScreen] = React.useState(true);

  const [allQuestions, setAllQuestions] = React.useState([]);

  const[questions, setQuestions] = React.useState(createQuestions());

  function createQuestions() {
    const questionsArray = allQuestions.map(question => {
      //console.log(question)
      //const container = {};
      {
      key:nanoid()
      statement:decodeHTML(question.question)
      ans:decodeHTML(question.correct_answer)
      
      options:createShuffledArray(question.correct_answer, question.incorrect_answers).map(incAns => ({
        isSelected: false,
        questionID: nanoid(),
        text:decodeHTML(incAns)
      }))}

    })
    return questionsArray;
  }
  console.log(questions);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple")
      .then(res => res.json())
      .then(data => setAllQuestions(data.results))
  },[])

  const questionsElement = questions.map(question => ( 
    <Question
      key={nanoid()}
      statement={decodeHTML(question.question)}
      ans={decodeHTML(question.correct_answer)}
      
      options={createShuffledArray(question.correct_answer, question.incorrect_answers).map(incAns => ({
        isSelected: false,
        questionID: nanoid(),
        text:decodeHTML(incAns)
      }))}
      // options={question.incorrect_answers.map(option => decodeHTML(option)).map(option => ({
      //   questionID: nanoid(),
      //   text: decodeHTML(option)
      // }))} 

      // options={createShuffledArray(question.correct_answer, question.incorrect_answers).map(option => ({
      //   questionID: nanoid(),
      //   text: decodeHTML(option)
      // }))}
      onClick={()=> onClickHandler(question)}
    />
  ))
  //console.log(allQuestions[0].incorrect_answers[0])

  function onClickHandler(question) {
    // setAllQuestions(prevQuestions => prevQuestions.map(prevQuestion => {
    //   prevQuestion.key === question.key && prevQuestion.options.map(option => {
    //       console.log(option)
    //   })
    // }
    // ))
    console.log(question)


    // setAllQuestions(prevQuestions => prevQuestions.map(question => ({
    //   ...question,
    //   buttonKeys:{}
    // }))) 
  }

  function decodeHTML(html) {
    const text = document.createElement("textarea")
    text.innerHTML = html;
    return text.value;
  }

  
  function createShuffledArray(ans, incAnsArray) {
    let array = [...incAnsArray]
    array.push(ans)
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    console.log(array.length)
    return array;
  }

  return (
    <div className="App">
      {/* Game State */}
      {!startScreen &&
      <div className='app-questions-container'>
        {questionsElement}
      </div>}

      <div className='background'>
          <img src={require('./images/blob.png')} className='blob0' alt="prop0"/>
          <img src={require('./images/blobYellow.png')} className='blob1' alt="prop1"/>
      </div>
      <div>
        {/* Start Screen */}
        {startScreen && 
        <div className="app-welcome-page">
          <h1 className="app-welcome-header">Quizzical</h1>
          <p className="app-welcome-p">Anime Yes</p> 
          <button className="app-start-button" onClick={()=> setStartScreen(false)} >Start Quiz</button>
        </div>}
      </div>

      
    </div>
  );
}

export default App;
