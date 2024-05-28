import React, { useState, useEffect, useCallback } from 'react';
import Core from './Core';
import defaultLocale from './Locale';
import './styles.css';

function Quiz({
  quiz,
  shuffle,
  shuffleAnswer,
  showDefaultResult,
  onComplete,
  customResultPage,
  showInstantFeedback,
  continueTillCorrect,
  revealAnswerOnSubmit,
  allowNavigation,
  onQuestionSubmit,
  disableSynopsis,
  timer,
  allowPauseTimer,
}) {
  const [start, setStart] = useState(false);
  // const [questions, setQuestions] = useState(quiz.questions);
  const [questions, setQuestions] = useState([]);

  const nrOfQuestions = quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length
    ? quiz.nrOfQuestions
    : quiz.questions.length;

  // Shuffle answers funtion here
  const shuffleAnswerSequence = (oldQuestions = []) => {
    const newQuestions = oldQuestions.map((question) => {
      const answerWithIndex = question.answers?.map((ans, i) => [ans, i]);
      const shuffledAnswersWithIndex = answerWithIndex.sort(
        () => Math.random() - 0.5,
      );
      const shuffledAnswers = shuffledAnswersWithIndex.map((ans) => ans[0]);
      if (question.answerSelectionType === 'single') {
        const oldCorrectAnswer = question.correctAnswer;
        const newCorrectAnswer = shuffledAnswersWithIndex.findIndex(
          (ans) => `${ans[1] + 1}` === `${oldCorrectAnswer}`,
        ) + 1;
        return {
          ...question,
          correctAnswer: `${newCorrectAnswer}`,
          answers: shuffledAnswers,
        };
      }
      if (question.answerSelectionType === 'multiple') {
        const oldCorrectAnswer = question.correctAnswer;
        const newCorrectAnswer = oldCorrectAnswer.map(
          (cans) => shuffledAnswersWithIndex.findIndex(
            (ans) => `${ans[1] + 1}` === `${cans}`,
          ) + 1,
        );
        return {
          ...question,
          correctAnswer: newCorrectAnswer,
          answers: shuffledAnswers,
        };
      }
      return question;
    });
    return newQuestions;
  };

  const shuffleQuestions = useCallback((q) => {
    for (let i = q.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [q[i], q[j]] = [q[j], q[i]];
    }
    return q;
  }, []);

  useEffect(() => {
    console.log("useEffect []");
    if (disableSynopsis) setStart(true);
    const storedQuizState = localStorage.getItem('quizState');
    console.log("useEffect [] storedQuizState: ", storedQuizState);
    if (storedQuizState) {
      console.log("quizState exists, starting quiz for user.", storedQuizState);
      setStart(true); // Automatically start the quiz if a valid state is found
    }
  }, []);

  useEffect(() => {
    let newQuestions;
    const storedQuizQuestions = localStorage.getItem('quizQuestions');
    let restored = false;

    if (storedQuizQuestions) {
      console.log("storedQuizQuestions found.");
      try {
        const parsedQuestions = JSON.parse(storedQuizQuestions);
        console.log("parsedQuestions: ", parsedQuestions);

        if (validateQuiz(parsedQuestions)) {
          console.log("parsedQuestions passed validation");
          newQuestions = parsedQuestions.questions;
          restored = true;
        } else {
          localStorage.removeItem('quizQuestions');
          newQuestions = quiz.questions;
        }
      } catch (error) {
        restored = false;
        localStorage.removeItem('quizQuestions');
        newQuestions = quiz.questions;
      }
    } else {
      console.log("storedQuizQuestions not found.");
      newQuestions = quiz.questions;
    }

    if (shuffle && !restored) {
      // console.log("validate called from shuffling questions");
      newQuestions = shuffleQuestions(newQuestions);
    }

    if (shuffleAnswer && !restored) {
      // console.log("validate called from shuffling answers");
      newQuestions = shuffleAnswerSequence(newQuestions);
    }

    newQuestions.length = nrOfQuestions;
    newQuestions = newQuestions.map((question, index) => ({
      ...question,
      questionIndex: index + 1,
    }));
    setQuestions(newQuestions);
    if (!storedQuizQuestions) {
      console.log("storing quiz questions", newQuestions);
      localStorage.setItem('quizQuestions', JSON.stringify({ questions: newQuestions }));
    }
  }, [start]);

  // useEffect(() => {
  //   if (questions.length > 0 ) {
  //     localStorage.setItem('quizState', JSON.stringify({ questions }));
  //     console.log("questions changed, saving them.", questions)
  //   }
  // }, [questions]);

  const validateQuiz = (q) => {

    if (!q) {
      console.error('Quiz object is required.');
      return false;
    }

    // Check if the questions array is empty
    if (!q.questions || q.questions.length === 0) {
      console.error('Quiz must have at least one question.');
      return false;
    }

    if ((timer && typeof timer !== 'number') || (timer < 1)) {
      console.error(timer && typeof timer !== 'number' ? 'timer must be a number' : 'timer must be a number greater than 0');
      return false;
    }

    if (allowPauseTimer && typeof allowPauseTimer !== 'boolean') {
      console.error('allowPauseTimer must be a Boolean');
      return false;
    }

    for (let i = 0; i < q.questions.length; i += 1) {
      const {
        question,
        questionType,
        answerSelectionType,
        answers,
        correctAnswer,
      } = q.questions[i];
      if (!question) {
        console.error("Field 'question' is required.");
        return false;
      }

      if (!questionType) {
        console.error("Field 'questionType' is required.");
        return false;
      }
      if (questionType !== 'text' && questionType !== 'photo') {
        console.error(
          "The value of 'questionType' is either 'text' or 'photo'.",
        );
        return false;
      }

      if (!answers) {
        console.error("Field 'answers' is required.");
        return false;
      }
      if (!Array.isArray(answers)) {
        console.error("Field 'answers' has to be an Array");
        return false;
      }

      // Skip correctAnswer check for personality type questions
      if (answerSelectionType !== 'personality' && !correctAnswer) {
        console.error("Field 'correctAnswer' is required for non-personality questions.");
        return false;
      }

      let selectType = answerSelectionType;

      if (!answerSelectionType) {
        // Default single to avoid code breaking due to automatic version upgrade
        console.warn(
          'Field answerSelectionType should be defined since v0.3.0. Use single by default.',
        );
        selectType = answerSelectionType || 'single';
      }

      if (
        selectType === 'single'
        && !(typeof selectType === 'string' || selectType instanceof String)
      ) {
        console.error(
          'answerSelectionType is single but expecting String in the field correctAnswer',
        );
        return false;
      }

      if (selectType === 'multiple' && !Array.isArray(correctAnswer)) {
        console.error(
          'answerSelectionType is multiple but expecting Array in the field correctAnswer',
        );
        return false;
      }
    }

    return true;
  };

  if (!validateQuiz(quiz)) {
    return null;
  }

  const appLocale = {
    ...defaultLocale,
    ...quiz.appLocale,
  };

  return (
    <div className="react-quiz-container">
      {!start && (
        <div>
          <h2>{quiz.quizTitle}</h2>
          <div>
            {appLocale.landingHeaderText.replace(
              '<questionLength>',
              nrOfQuestions,
            )}
          </div>
          {quiz.quizSynopsis && (
            <div className="quiz-synopsis">{quiz.quizSynopsis}</div>
          )}
          <div className="startQuizWrapper">
            <button type="button" onClick={() => setStart(true)} className="startQuizBtn btn">
              {appLocale.startQuizBtn}
            </button>
          </div>
        </div>
      )}

      {start && (
        <Core
          questions={questions}
          showDefaultResult={showDefaultResult}
          onComplete={onComplete}
          customResultPage={customResultPage}
          showInstantFeedback={showInstantFeedback}
          continueTillCorrect={continueTillCorrect}
          revealAnswerOnSubmit={revealAnswerOnSubmit}
          allowNavigation={allowNavigation}
          appLocale={appLocale}
          onQuestionSubmit={onQuestionSubmit}
          timer={timer}
          allowPauseTimer={allowPauseTimer}
        />
      )}
    </div>
  );
}

export default Quiz;
