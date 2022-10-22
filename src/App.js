import './App.css';
import Question from './Question.js';
import React from 'react'
import {nanoid} from "nanoid"

function App() {

  const [startScreen, setStartScreen] = React.useState(true);

  const [allQuestions, setAllQuestions] = React.useState([]);
  
  const[gameEnded, setGameEnded] = React.useState(false);
  
  const[correctCount, setCorrectCount] = React.useState(0);


  React.useEffect(() => {
    getAPIData()
  },[])

  function getAPIData() {
    fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple")
    .then(res => res.json())
    .then(data => createQuestionData(data.results))
  }

  function createQuestionData(data) {
    setAllQuestions(data.map(question => {
      return {
        key:nanoid(),
        id:nanoid(),
        statement:decodeHTML(question.question),
        ans:decodeHTML(question.correct_answer),
        options:createShuffledArray(question.correct_answer, question.incorrect_answers).map(option => ({
          isSelected: false,
          optionID: nanoid(),
          text: decodeHTML(option)
        }))
      }
    }))
  }


  const questionsElement = allQuestions.map(question => ( 
    <Question
      key={question.key}
      id = {question.id}
      statement={decodeHTML(question.statement)}
      ans={decodeHTML(question.ans)}
      options={question.options}
      onClick={onClickHandler}
      gameEnded={gameEnded}
    />
  ))


  function onClickHandler(buttonID, questionID) {
    setAllQuestions(prevQuestions => prevQuestions.map(question => {
      if (question.id === questionID) {
        const changedQuestion = findButton(question, buttonID)
        return {
          ...question,
          options: changedQuestion
        }
      } else { 
        return {
          ...question
        }
      }
    }))
  }
  function findButton(question , id) {
    return question.options.map(option => {
      if (option.optionID === id) {
        return {
          ...option,
          isSelected:true
          } 
      } else {
        return {
          ...option,
          isSelected:false
        }
      }
    })
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
    return array;
  }
  
  function checkAnswers() {
    setGameEnded(prevState => !prevState);
    if (!gameEnded) {
      for (let i = 0 ; i < allQuestions.length; i++) {
        let selectedAns =""
        const options = allQuestions[i].options
        for (let j = 0; j < options.length; j++) {
          if (options[j].isSelected) {
            selectedAns = options[j].text
          }
        }
        if (allQuestions[i].ans === selectedAns) {
          
          setCorrectCount(prevCount => prevCount+1)
        } 
      }
    } else {
      setCorrectCount(0)
      getAPIData();
    }
  }

  

  return (
    <div className="App">
      {/* Game State */}
      {!startScreen &&
      <div className='app-questions-container'>
        {questionsElement}
        <div>
          {gameEnded &&
            <h1 className='correct-count'>{`You got ${correctCount}/5 Correct!`}</h1>
          }
          <button className='submit-button' onClick={checkAnswers}>{gameEnded ? "Play Again" : "Check Answers"}</button>
        </div>
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
