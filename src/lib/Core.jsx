import React, {
  useState, useEffect, useCallback, Fragment,
} from 'react';
import { nanoid } from 'nanoid';
import QuizResultFilter from './core-components/QuizResultFilter';
import { checkAnswer, selectAnswer, rawMarkup } from './core-components/helpers';
import InstantFeedback from './core-components/InstantFeedback';
import Explanation from './core-components/Explanation';

function Core({
  questions, appLocale, showDefaultResult, onComplete, customResultPage,
  showInstantFeedback, continueTillCorrect, revealAnswerOnSubmit, allowNavigation,
  onQuestionSubmit, timer, allowPauseTimer, allowCancel
}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buttons, setButtons] = useState({});
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [unanswered, setUnanswered] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [filteredValue, setFilteredValue] = useState('all');
  const [userAttempt, setUserAttempt] = useState(1);
  const [showDefaultResultState, setShowDefaultResult] = useState(true);
  const [answerSelectionTypeState, setAnswerSelectionType] = useState(undefined);

  const [totalPoints, setTotalPoints] = useState(0);
  const [correctPoints, setCorrectPoints] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(questions[currentQuestionIndex]);
  const [questionSummary, setQuestionSummary] = useState(undefined);
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [isRunning, setIsRunning] = useState(true);
  const [isPersonalityQuiz, setIsPersonalityQuiz] = useState(false);
  const [quizStateRestored, setQuizStateRestored] = useState(false);
  const [onCompleteCalled, setOnCompleteCalled] = useState(false);


  const trigramTranslations = {
    'Qian': 'Heaven - The Creative',
    'Dui': 'Lake - The Joyous',
    'Li': 'Fire - The Clinging',
    'Zhen': 'Thunder - The Arousing',
    'Xun': 'Wind - The Gentle',
    'Kan': 'Water - The Abysmal',
    'Gen': 'Mountain - Keeping Still',
    'Kun': 'Earth - The Receptive'
  };

  useEffect(() => {
    // Example condition to determine if it's a personality quiz
    setIsPersonalityQuiz(questions.some(question => question.answerSelectionType === 'personality'));
  }, [questions]);

  useEffect(() => {
    setShowDefaultResult(showDefaultResult !== undefined ? showDefaultResult : true);
  }, [showDefaultResult]);

  useEffect(() => {
    setActiveQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    const { answerSelectionType } = activeQuestion;
    // Default single to avoid code breaking due to automatic version upgrade
    setAnswerSelectionType(answerSelectionType || 'single');
  }, [activeQuestion, currentQuestionIndex]);

  // Compute the tally of trigrams
  const trigramTally = userInput.reduce((acc, trigram) => {
    if (trigram) { // Ensure the trigram is defined
      if (!acc[trigram]) {
        acc[trigram] = { count: 0, translation: trigramTranslations[trigram] || 'No translation available' };
      }
      acc[trigram].count += 1;
    }
    return acc;
  }, {});

  useEffect(() => {
    const storedQuizState = localStorage.getItem('quizState');
    console.log("quizState restored: ", storedQuizState);
    if (storedQuizState) {
      try {
        const parsedQuizState = JSON.parse(storedQuizState);
        const { correct, userInput, currentQuestionIndex } = parsedQuizState;
        setUserInput(userInput || []);
        setCurrentQuestionIndex(currentQuestionIndex || 0);
        setQuizStateRestored(true);
        setCorrect(correct) // Set array of 'correct' answers
      } catch (error) {
        console.error('Error parsing quiz state from localStorage:', error);
      }
    } else {
      setQuizStateRestored(true);
    }
  }, []); // Empty dependency array to run the effect only on component mount

  useEffect(() => {
    console.log("useEffect [userInput, currentQuestionIndex] triggered");
    console.log("quizStateRestored:", quizStateRestored);
    console.log("userInput:", userInput);
    console.log("currentQuestionIndex:", currentQuestionIndex);
    console.log("correct array:", correct);
    console.log("isRunning:", isRunning);
    console.log("activeQuestion:", activeQuestion);
    
    

    if (quizStateRestored && (userInput.length > 0 || currentQuestionIndex > 0)) {
      const quizState = {
        userInput,
        currentQuestionIndex,
        correct
      };
      localStorage.setItem('quizState', JSON.stringify(quizState));
      console.log("Selections changed, saving them.", quizState);
    }
  }, [userInput, currentQuestionIndex, quizStateRestored, correct]);

  useEffect(() => {
    if (endQuiz) {
      setIsRunning(false);

      localStorage.removeItem('quizState');
      localStorage.removeItem('quizQuestions');
      console.log("Quiz completed, cleared localStorage.");

      if (isPersonalityQuiz) {
        // For personality quizzes, we might just need user inputs or other relevant data
        const personalitySummary = {
          totalResponses: userInput.length,
          responses: userInput,
          questions,
          trigramTally
        };
        if (onComplete && !onCompleteCalled) {
          console.log("Completing personality quiz with summary:", personalitySummary);
          onComplete(personalitySummary);
          setOnCompleteCalled(true); // Set the flag as called
        }
      } else {
        // Standard quiz logic
        let totalPointsTemp = 0;
        let correctPointsTemp = 0;
        for (let i = 0; i < questions.length; i += 1) {
          let point = questions[i].point || 0;
          if (typeof point === 'string' || point instanceof String) {
            point = parseInt(point, 10);
          }

          totalPointsTemp += point;

          if (correct.includes(i)) {
            correctPointsTemp += point;
          }
        }
        setTotalPoints(totalPointsTemp);
        setCorrectPoints(correctPointsTemp);
      }
    }
  }, [endQuiz, isPersonalityQuiz, userInput, questions, onComplete]);

  useEffect(() => {
    setQuestionSummary({
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions,
      userInput,
      totalPoints,
      correctPoints,
    });
  }, [totalPoints, correctPoints]);

  useEffect(() => {
    if (endQuiz && onComplete !== undefined && questionSummary !== undefined) {
      onComplete(questionSummary);
    }
  }, [questionSummary]);

  const nextQuestion = (currentQuestionIdx) => {
    setIncorrectAnswer(false);
    setIsCorrect(false);
    setShowNextQuestionButton(false);
    setButtons({});

    console.log("Current Question Index:", currentQuestionIdx);
    console.log("User Input Length:", userInput.length);
    console.log("Total Questions:", questions.length);

    if (currentQuestionIdx + 1 === questions.length) {
      if (userInput.length !== questions.length) {
        alert('Quiz is incomplete');
      } else if (allowNavigation) {
        const submitQuiz = confirm('You have finished all the questions. Submit Quiz now?');
        if (submitQuiz) {
          setEndQuiz(true);
        }
      } else {
        setEndQuiz(true);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIdx + 1);
    }
  };

  const handleChange = (event) => {
    setFilteredValue(event.target.value);
  };

  const renderAnswerInResult = (question, userInputIndex) => {
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => {
      let answerBtnClassName = '';

      if (answerSelectionType === 'personality') {
        // Highlight the selected answer and grey out others
        answerBtnClassName = answer.trigram === userInputIndex ? 'selected' : 'greyed-out';
      } else if (answerSelectionType === 'single') {
        // correctAnswer - is string
        const isCorrect = `${index + 1}` === correctAnswer;
        const isUserAnswer = `${index + 1}` === `${userInputIndex}`;
        answerBtnClassName = isCorrect ? 'correct' : (isUserAnswer ? 'incorrect' : '');
      } else {
        // correctAnswer - is array of numbers
        const isCorrect = correctAnswer.includes(index + 1);
        const isUserAnswer = userInputIndex?.includes(index + 1);
        answerBtnClassName = isCorrect ? 'correct' : (isUserAnswer ? 'incorrect' : '');
      }

      return (
        <div key={nanoid()}>
          <button
            type="button"
            disabled
            className={`answerBtn btn ${answerBtnClassName}`}
          >
            {questionType === 'text' && <span>{answer.option}</span>}
            {questionType === 'photo' && <img src={answer.option} alt="answer" />}
            {/* Display trigram for personality type questions */}
            {answerSelectionType === 'personality' && (
              <span className="trigram"> ({answer.trigram})</span>
            )}
          </button>
        </div>
      );
    });
  };

  const renderTags = (answerSelectionType, numberOfSelection, segment) => {
    const {
      singleSelectionTagText,
      multipleSelectionTagText,
      pickNumberOfSelection,
    } = appLocale;

    return (
      <div className="tag-container">
        {answerSelectionType === 'single'
          && <span className="single selection-tag">{singleSelectionTagText}</span>}
        {answerSelectionType === 'multiple'
          && <span className="multiple selection-tag">{multipleSelectionTagText}</span>}
        <span className="number-of-selection">
          {pickNumberOfSelection.replace('<numberOfSelection>', numberOfSelection)}
        </span>
        {/* Do not render the segment for personality type questions */}
        {segment && answerSelectionType !== 'personality' &&
          <span className="selection-tag segment">{segment}</span>}
      </div>
    );
  };

  const isCorrectCheck = (index, correctAnswerIndex) => {
    if (typeof correctAnswerIndex === 'string') {
      return index === Number(correctAnswerIndex);
    }

    if (typeof correctAnswerIndex === 'object') {
      return correctAnswerIndex.find((element) => element === index) !== undefined;
    }

    return false;
  };

  const renderQuizResultQuestions = useCallback(() => {
    let filteredQuestions;
    let filteredUserInput;
  
    if (isPersonalityQuiz) {
      filteredQuestions = questions.filter((question, index) => {
        return userInput[index] !== undefined && userInput[index] !== null;
      });
  
      filteredUserInput = userInput.filter((input) => input !== undefined && input !== null);
    } else {
      if (filteredValue !== 'all') {
        let targetQuestions = unanswered;
        if (filteredValue === 'correct') {
          targetQuestions = correct;
        } else if (filteredValue === 'incorrect') {
          targetQuestions = incorrect;
        }
        filteredQuestions = questions.filter(
          (_, index) => targetQuestions.indexOf(index) !== -1,
        );
        filteredUserInput = userInput.filter(
          (_, index) => targetQuestions.indexOf(index) !== -1,
        );
      }
    }
  
    return (filteredQuestions || questions).map((question, index) => {
      const userInputIndex = filteredUserInput ? filteredUserInput[index] : userInput[index];
  
      // Default single to avoid code breaking due to automatic version upgrade
      const answerSelectionType = question.answerSelectionType || 'single';
  
      // Check if the question is answered
      if (userInputIndex === undefined || userInputIndex === null) {
        return null;
      }
  
      return (
        <div className="result-answer-wrapper" key={nanoid()}>
          <h3
            dangerouslySetInnerHTML={rawMarkup(
              `Q${question.questionIndex}: ${question.question} ${appLocale.marksOfQuestion.replace(
                '<marks>',
                question.point,
              )}`,
            )}
          />
          {question.questionPic && <img src={question.questionPic} alt="question" />}
          {renderTags(
            answerSelectionType,
            answerSelectionType !== 'personality' && question.correctAnswer && Array.isArray(question.correctAnswer)
              ? question.correctAnswer.length
              : 1,
            question.segment || 'defaultSegment',
          )}
          <div className="result-answer">{renderAnswerInResult(question, userInputIndex)}</div>
          <Explanation question={question} isResultPage />
        </div>
      );
    });
  }, [endQuiz, filteredValue]);

  const renderAnswers = (question, answerButtons) => {
    console.log("calling renderAnswers");
    const {
      answers, correctAnswer, questionType, questionIndex,
    } = question;
    let { answerSelectionType } = question;
    const onClickAnswer = (index) => checkAnswer(index + 1, correctAnswer, answerSelectionType, answers, {
      userInput,
      userAttempt,
      currentQuestionIndex,
      continueTillCorrect,
      showNextQuestionButton,
      incorrect,
      correct,
      setButtons,
      setIsCorrect,
      setIncorrectAnswer,
      setCorrect,
      setIncorrect,
      setShowNextQuestionButton,
      setUserInput,
      setUserAttempt,
    });

    const onSelectAnswer = (index) => selectAnswer(index + 1, correctAnswer, answerSelectionType, answers, {
      userInput,
      currentQuestionIndex,
      setButtons,
      setShowNextQuestionButton,
      incorrect,
      correct,
      setCorrect,
      setIncorrect,
      setUserInput,
    });

    const checkSelectedAnswer = (index) => {
      if (userInput[questionIndex - 1] === undefined) {
        return false;
      }
      if (answerSelectionType === 'personality') {
        console.log("checkSelectedAnswer for personality");
        return userInput[questionIndex - 1] === index;
      }
      if (answerSelectionType === 'single') {
        return userInput[questionIndex - 1] === index;
      }
      return Array.isArray(userInput[questionIndex - 1]) && userInput[questionIndex - 1].includes(index);
    };

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => (
      <Fragment key={nanoid()}>
        <button
          type="button"
          onClick={() => {
            if (answerSelectionType === 'personality') {
              if (userInput[questionIndex - 1] === answer.trigram) {
                // Unselect the answer if it's already selected
                setUserInput((prevUserInput) => {
                  const newUserInput = [...prevUserInput];
                  newUserInput[questionIndex - 1] = null;
                  return newUserInput;
                });                
              } else {
                // Select the answer
                setUserInput((prevUserInput) => {
                  const newUserInput = [...prevUserInput];
                  newUserInput[questionIndex - 1] = answer.trigram;
                  return newUserInput;
                });
              }
            } else {
              // Handle other answer selection types
              revealAnswerOnSubmit ? onSelectAnswer(index) : onClickAnswer(index);
            }
          }}
          className={`answerBtn btn ${userInput[questionIndex - 1] === answer.trigram ? 'selected' : ''}`}
        >
          {questionType === 'text' && <span>{answer.option}</span>}
          {questionType === 'photo' && <img src={answer.option} alt="answer" />}
        </button>
      </Fragment>
    ));
  };

  const getUnansweredQuestions = () => {
    questions.forEach((question, index) => {
      if (userInput[index] === undefined) {
        setUnanswered((oldArray) => [...oldArray, index]);
      }
    });
  };

  const renderResult = () => {
    // Count non-null entries in userInput
    const nonNullCount = userInput.filter(input => input !== null).length;

    return (
      <div className="card-body">
        <h2>
          {appLocale.resultPageHeaderText
            .replace('<numAnswered>', nonNullCount)
            .replace('<questionLength>', questions.length)}
        </h2>
        {!isPersonalityQuiz && (
          <h2>
            {appLocale.resultPagePoint
              .replace('<correctPoints>', correctPoints)
              .replace('<totalPoints>', totalPoints)}
          </h2>
        )
        }

        <br />
        {!isPersonalityQuiz && (
          <QuizResultFilter
            filteredValue={filteredValue}
            handleChange={handleChange}
            appLocale={appLocale}
          />
        )
        }
        {isPersonalityQuiz && (
          <div className="trigram-tally">
            <h3>Trigram Tally:</h3>
            <ul>
              {Object.entries(trigramTally).map(([trigram, details]) => (
                <li key={trigram}>
                  {`${trigram}: ${details.count} (${details.translation})`}
                </li>
              ))}
            </ul>
          </div>
        )}
        {renderQuizResultQuestions()}
      </div>
    );
  };

  useEffect(() => {
    let countdown;

    if (timer && isRunning && timeRemaining > 0) {
      countdown = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => timer && clearInterval(countdown);
  }, [isRunning, timeRemaining, timer]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (time) => (time < 10 ? '0' : '');
  const displayTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${formatTime(hours)}${hours}:${formatTime(minutes)}${minutes}:${formatTime(seconds)
      }${seconds}`;
  };

  const handleTimeUp = () => {
    setIsRunning(false);
    setEndQuiz(true);
    getUnansweredQuestions();
  };

  const handleCancelQuiz = () => {   
    // Reset quiz state
    // rest of cleanup is done in useEffect with endquiz
    setEndQuiz(true);  
  };

  return (
    <div className="questionWrapper">
      {timer && !isRunning && (
        <div>
          {appLocale.timerTimeTaken}
          :
          {' '}
          <b>{displayTime(timer - timeRemaining)}</b>
        </div>
      )}

      {timer && isRunning && (
        <div>
          {appLocale.timerTimeRemaining}
          :
          {' '}
          <b>
            {displayTime(timeRemaining)}
          </b>
        </div>
      )}
      {timer && timeRemaining === 0 && isRunning && handleTimeUp()}

      {!endQuiz && (
        <div className="questionWrapperBody">
          <div>
            {`${appLocale.question} ${currentQuestionIndex + 1} / ${questions.length
              }:`}
            <br />
            {timer && allowPauseTimer && (
              <button type="button" className="timerBtn" onClick={toggleTimer}>
                {isRunning ? appLocale.pauseScreenPause : appLocale.pauseScreenResume}
              </button>
            )}
            {allowCancel && (
              <button type="button" onClick={handleCancelQuiz}
                className="cancelQuizBtn btn">
                Cancel Quiz
              </button>
            )}
          </div>
          {isRunning ? (
            <>
              <h3
                dangerouslySetInnerHTML={rawMarkup(
                  `${activeQuestion && activeQuestion.question
                  } ${appLocale.marksOfQuestion.replace(
                    '<marks>',
                    activeQuestion.point,
                  )}`,
                )}
              />
              {activeQuestion && activeQuestion.questionPic && (
                <img src={activeQuestion.questionPic} alt="question" />
              )}
              {activeQuestion && renderTags(
                answerSelectionTypeState,
                answerSelectionTypeState === 'personality' ? 1 : (activeQuestion.correctAnswer && Array.isArray(activeQuestion.correctAnswer) ? activeQuestion.correctAnswer.length : 0),
                activeQuestion.segment || 'defaultSegment'
              )}
              <div className="questionModal">
                <InstantFeedback
                  question={activeQuestion}
                  showInstantFeedback={showInstantFeedback}
                  correctAnswer={isCorrect}
                  incorrectAnswer={incorrectAnswer}
                  onQuestionSubmit={onQuestionSubmit}
                  userAnswer={[...userInput].pop()}
                />
              </div>
              {activeQuestion && renderAnswers(activeQuestion, buttons)}
              {(showNextQuestionButton || (isPersonalityQuiz || allowNavigation)) && (
                <div className="questionBtnContainer">
                  {(isPersonalityQuiz || allowNavigation) && currentQuestionIndex > 0 && (
                    <button
                      onClick={() => nextQuestion(currentQuestionIndex - 2)}
                      className="prevQuestionBtn btn"
                      type="button"
                    >
                      {appLocale.prevQuestionBtn}
                    </button>
                  )}

                  <button
                    onClick={() => nextQuestion(currentQuestionIndex)}
                    className="nextQuestionBtn btn"
                    type="button"
                  >
                    {appLocale.nextQuestionBtn}
                  </button>
                </div>
              )}
            </>
          ) : (
            <span className="timerPauseScreen dark:text-white text-black">
              <br />
              <br />
              {appLocale.pauseScreenDisplay}
            </span>
          )}
        </div>
      )}
      {endQuiz && showDefaultResultState && customResultPage === undefined
        && renderResult()}
      {endQuiz && !showDefaultResultState && customResultPage !== undefined
        && customResultPage(questionSummary)}
    </div>
  );
}

export default Core;
