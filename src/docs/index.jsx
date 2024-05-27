import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Quiz from '../lib/Quiz';
import quiz from './quiz';

const container = document.getElementById('app');
const root = createRoot(container);

function App() {
  
  const setQuizResult = (obj) => {
    console.log("setQuizResult: ", obj);
    // YOUR LOGIC GOES HERE
  }

  return (
    <div style={{ margin: 'auto', width: '500px' }}>
      <Quiz
        quiz={quiz}
        shuffle
        shuffleAnswer
        // showInstantFeedback
      // continueTillCorrect
        onComplete={setQuizResult}
        // onQuestionSubmit={(obj) => console.log('user question results:', obj)}
        // disableSynopsis
        // timer={60}
        // allowPauseTimer
        // allowNavigation
      />
    </div>
  );
}

root.render(<App />);

// return (
//   <div style={{ margin: 'auto', width: '500px' }}>
//     <Quiz
//       quiz={quiz}
//       shuffle
//       shuffleAnswer
//       showInstantFeedback
//     // continueTillCorrect
//       onComplete={setQuizResult}
//       onQuestionSubmit={(obj) => console.log('user question results:', obj)}
//       disableSynopsis
//       timer={60}
//       allowPauseTimer
//     />
//   </div>
// );