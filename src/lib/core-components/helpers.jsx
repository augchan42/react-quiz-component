import snarkdown from 'snarkdown';
import dompurify from 'dompurify';

export const rawMarkup = (data) => {
  const sanitizer = dompurify.sanitize;
  return { __html: snarkdown(sanitizer(data)) };
};

export const checkAnswer = (index, correctAnswer, answerSelectionType, answers, {
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
}) => {
  const indexStr = `${index}`;
  const disabledAll = Object.keys(answers).map(() => ({ disabled: true }));
  const userInputCopy = [...userInput];
  if (answerSelectionType === 'single') {
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = index;
    }

    if (indexStr === correctAnswer) {
      if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }

      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
        },
      }));

      setIsCorrect(true);
      setIncorrectAnswer(false);
      setCorrect(correct);
      setShowNextQuestionButton(true);
    } else {
      if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }

      if (continueTillCorrect) {
        setButtons((prevState) => (
          {

            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
            },
          }
        ));
      } else {
        setButtons((prevState) => (
          {

            ...prevState,
            ...disabledAll,
            [index - 1]: {
              className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
            },
          }
        ));

        setShowNextQuestionButton(true);
      }

      setIncorrectAnswer(true);
      setIsCorrect(false);
      setIncorrect(incorrect);
    }
  } else if (answerSelectionType === 'personality') {
    // For personality quizzes, always set correct and do not check against a correctAnswer
    setIsCorrect(true);
    setIncorrectAnswer(false);
    setShowNextQuestionButton(true);
    
    const adjustedIndex = index - 1;
    const selectedTrigram = answers[adjustedIndex].trigram;
    
    userInputCopy[currentQuestionIndex] = selectedTrigram; // Record the trigram of the user's choice
    setUserInput(userInputCopy); // Update the userInput state
    
    // Disable all buttons after a choice is made to prevent changing answers
    setButtons((prevState) => ({
      ...prevState,
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = { ...prevState[key], disabled: true };
        return acc;
      }, {}),
      [index - 1]: {
        ...prevState[index - 1],
        className: 'selected'  // Highlight the selected answer
      }
    }));

    // Show the next question button if applicable
    setShowNextQuestionButton(true);

    // Optionally, if you track correct and incorrect indices, add to correct as there are no incorrect answers
    if (correct.indexOf(currentQuestionIndex) < 0) {
      correct.push(currentQuestionIndex);
    }
    setCorrect(correct);

    // Log for debugging
    console.log("Selected trigram: ", selectedTrigram);
    console.log("Updated userInput: ", userInputCopy);
  } else {
    const maxNumberOfMultipleSelection = correctAnswer.length;

    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = [];
    }

    if (userInputCopy[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
      userInputCopy[currentQuestionIndex].push(index);

      if (correctAnswer.includes(index)) {
        if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
          setButtons((prevState) => ({
            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
              className: (correctAnswer.includes(index)) ? 'correct' : 'incorrect',
            },
          }));
        }
      } else if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
        setButtons((prevState) => ({
          ...prevState,
          [index - 1]: {
            className: (correctAnswer.includes(index)) ? 'correct' : 'incorrect',
          },
        }));
      }
    }

    if (maxNumberOfMultipleSelection === userAttempt) {
      let cnt = 0;
      for (let i = 0; i < correctAnswer.length; i += 1) {
        if (userInputCopy[currentQuestionIndex].includes(correctAnswer[i])) {
          cnt += 1;
        }
      }

      for (let i = 0; i < answers.length; i += 1) {
        if (correctAnswer.includes(i + 1)) {
          setButtons((prevState) => ({
            ...prevState,
            [i]: {},
          }));
        }
      }

      if (cnt === maxNumberOfMultipleSelection) {
        correct.push(currentQuestionIndex);

        setIsCorrect(true);
        setIncorrectAnswer(false);
        setCorrect(correct);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      } else {
        incorrect.push(currentQuestionIndex);

        setIncorrectAnswer(true);
        setIsCorrect(false);
        setIncorrect(incorrect);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      }
    } else if (!showNextQuestionButton) {
      setUserAttempt(userAttempt + 1);
    }
  }
  setUserInput(userInputCopy);
};

// Add a new function to tally results
const tallyResults = (userInput, questions) => {
  const results = {};
  userInput.forEach((answerIndex, questionIndex) => {
    const trigram = questions[questionIndex].answers[answerIndex].trigram;
    if (results[trigram]) {
      results[trigram]++;
    } else {
      results[trigram] = 1;
    }
  });
  return results;
};

export const selectAnswer = (index, correctAnswer, answerSelectionType, answers, {
  userInput,
  currentQuestionIndex,
  setButtons,
  setShowNextQuestionButton,
  incorrect,
  correct,
  setCorrect,
  setIncorrect,
  setUserInput,
}) => {
  const selectedButtons = Object.keys(answers).map(() => ({ selected: false }));
  const userInputCopy = [...userInput];

  // Check if it's a personality quiz type
  if (answerSelectionType === 'personality') {
    // Adjust the index to match the array's zero-based indexing
    const adjustedIndex = index - 1;
    const selectedTrigram = answers[adjustedIndex].trigram;
    console.log("selectedTrigram: ", selectedTrigram);
    userInputCopy[currentQuestionIndex] = selectedTrigram; // Simply record the user's choice

    setButtons((prevState) => ({
      ...prevState,
      ...selectedButtons,
      [index - 1]: {
        className: 'selected',
      },
    }));

    setShowNextQuestionButton(true);
    // setUserInput(userInputCopy); done below
  } else if (answerSelectionType === 'single') {
    correctAnswer = Number(correctAnswer);
    userInputCopy[currentQuestionIndex] = index;

    if (index === correctAnswer) {
      if (correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }
      if (incorrect.indexOf(currentQuestionIndex) >= 0) {
        incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
      }
    } else {
      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }
      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }
    }
    setCorrect(correct);
    setIncorrect(incorrect);

    setButtons((prevState) => ({
      ...prevState,
      ...selectedButtons,
      [index - 1]: {
        className: 'selected',
      },
    }));

    setShowNextQuestionButton(true);
  } else {
    // Handle multiple selection type
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = [];
    }
    if (userInputCopy[currentQuestionIndex].includes(index)) {
      userInputCopy[currentQuestionIndex].splice(userInputCopy[currentQuestionIndex].indexOf(index), 1);
    } else {
      userInputCopy[currentQuestionIndex].push(index);
    }

    if (userInputCopy[currentQuestionIndex].length === correctAnswer.length) {
      let exactMatch = true;
      for (const input of userInput[currentQuestionIndex]) {
        if (!correctAnswer.includes(input)) {
          exactMatch = false;
          if (incorrect.indexOf(currentQuestionIndex) < 0) {
            incorrect.push(currentQuestionIndex);
          }
          if (correct.indexOf(currentQuestionIndex) >= 0) {
            correct.splice(correct.indexOf(currentQuestionIndex), 1);
          }
          break;
        }
      }
      if (exactMatch) {
        if (correct.indexOf(currentQuestionIndex) < 0) {
          correct.push(currentQuestionIndex);
        }
        if (incorrect.indexOf(currentQuestionIndex) >= 0) {
          incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
        }
      }
    } else {
      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }
      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }
    }
    setCorrect(correct);
    setIncorrect(incorrect);
    setButtons((prevState) => ({
      ...prevState,
      [index - 1]: {
        className: userInputCopy[currentQuestionIndex].includes(index) ? 'selected' : undefined,
      },
    }));

    if (userInputCopy[currentQuestionIndex].length > 0) {
      setShowNextQuestionButton(true);
    }
  }
  setUserInput(userInputCopy);
};
