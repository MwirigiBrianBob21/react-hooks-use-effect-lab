import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    if(timeRemaining === 0){
      setTimeRemaining(10);
      onAnswered(false);
      return; //exit early     
    }

     //setting a timeout
     let timerId = setTimeout(()=> {
      // decrease the time left
      setTimeRemaining((timeRemaining)=> timeRemaining -1);
    }, 1000);

    // cleanup function
    return function () {
      clearTimeout(timerId)
    }
  // run the effect every time the time changes- timeRemaining
  // onAnswered is a dependency that never changes
    
  }, [timeRemaining, onAnswered])
  

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
