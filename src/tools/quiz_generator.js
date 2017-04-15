import _ from 'lodash';
const MULTIPLE_CHOICE = 1;
const TRUE_OR_FALSE = 2;
const FILL_IN_BLANK = 3;
import { CHOICES } from '../constants/multiple_choice_options';
import { TRUE, FALSE } from '../constants/true_or_false_options';


export function generateQuiz(options, flashcards) {
  const flashcardsCopy = _.shuffle(flashcards.slice());
  const partitionCount = options.length;

  const remainder = flashcards.length % partitionCount;
  const closestLowerIntegerAverage = Math.floor(flashcards.length / partitionCount);
  const sliceCounts = Array(partitionCount).fill(closestLowerIntegerAverage);
  for (let i = 0; i < remainder; i++) {
    sliceCounts[i]++;
  }
  const indexesArray = [];

  const quiz = {};
  let startIndex = 0;
  options.forEach((option, index) => {
    const flashcardsIndexes = _.range(startIndex, startIndex + sliceCounts[index]);
    startIndex = startIndex + sliceCounts[index];
    quiz[option] = generateQuestions(flashcardsIndexes, option, flashcardsCopy);
  });

  return quiz;

}


function generateQuestions(flashcardsIndexes, option, completeFlashcardList) {

  let questionGeneratorFunc = null;
  if (option === MULTIPLE_CHOICE) {
    questionGeneratorFunc = generateMultipleChoiceQuestion;
  } else if (option === TRUE_OR_FALSE) {
    questionGeneratorFunc = generateTrueOrFalseQuestion;
  } else if (option === FILL_IN_BLANK) {
    questionGeneratorFunc = generateFillInBlankQuestion;
  } else {
    console.log("How'd you get here?");
  }

  return flashcardsIndexes.map((index) => {


    return questionGeneratorFunc(index, completeFlashcardList);
  });
}

export function generateBlankUserAnswers(quiz) {
  const userAnswers = {};
  const options = Object.keys(quiz);

  options.forEach((option) => {
    const questionsCount = quiz[option].length;
    userAnswers[option] = Array(questionsCount).fill(null);
  });
  return userAnswers;
}


function generateTrueOrFalseQuestion(flashcardIndex, completeFlashcardList, percentage = 50) {
  const flashCard = completeFlashcardList[flashcardIndex];
  const randomChance = Math.floor(Math.random() * 100);
  const term = flashCard.term;
  let answer = null;
  let definition = null;
  if (randomChance >= percentage) {
    answer = TRUE;
    definition = flashCard.definition;
  } else {
    let choices = _.range(0, completeFlashcardList.length);
    _.pull(choices, flashcardIndex);

    const numOfChoices = choices.length;
    const randomWrongFlashCardIndex = choices[_.random(choices.length - 1)];
    const randomWrongFlashCard = completeFlashcardList[randomWrongFlashCardIndex];
    answer = FALSE;
    definition = randomWrongFlashCard.definition;
  }
  return {
    question: `${term}  =>  ${definition}`,
    type: TRUE_OR_FALSE,
    answer: answer
  };
}

function generateMultipleChoiceQuestion(flashcardIndex, completeFlashcardList) {
  const flashCard = completeFlashcardList[flashcardIndex];
  const term = flashCard.term;

  let choices = _.range(completeFlashcardList.length);
  _.pull(choices, flashcardIndex);
  choices = _.shuffle(choices);
  const flashcardChoiceIndexes = choices.slice(0, 3);

  const insertionIndex = _.random(3);
  flashcardChoiceIndexes.splice(insertionIndex, 0, flashcardIndex);
  const answers = flashcardChoiceIndexes.map((flashcardChoiceIndex, index) => {
    const isRightChoice = flashcardIndex === flashcardChoiceIndex ? true : false;
    return {
      isRight: isRightChoice,
      choice: CHOICES[index],
      value: completeFlashcardList[flashcardChoiceIndex].definition
    };
  });

  return {
    question: `${term}`,
    type: MULTIPLE_CHOICE,
    answers: answers
  };

}

function generateFillInBlankQuestion(flashcardIndex, completeFlashcardList) {
  const flashCard = completeFlashcardList[flashcardIndex];
  const {term, definition} = flashCard;
  return {
    question: `${definition}`,
    display: `${definition}`,
    type: FILL_IN_BLANK,
    answer: `${term}`
  };
}

export function evaluateAnswer(question, answer) {
  const questionType = question.type;
  if (questionType === TRUE_OR_FALSE) {
    return evaluateTrueOrFalseAnswer(question, answer);
  } else if (questionType === MULTIPLE_CHOICE) {
    return evaluateMultipleChoiceAnswer(question, answer);
  } else if (questionType === FILL_IN_BLANK) {
    return evaluateFillInBlankAnswer(question, answer);
  }
}

export function evaluateAnswers(quiz, userAnswers) {
  let totalQuestions = 0;
  let correctAnswers = 0;

  const options = Object.keys(quiz);
  options.forEach((option) => {
    let questions = quiz[option];
    let answers = userAnswers[option];
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (evaluateAnswer(question, answer)) {
        correctAnswers++;
      }
      totalQuestions++;
    });
  });
  return correctAnswers / totalQuestions * 100;
}


function evaluateTrueOrFalseAnswer(tofQuestion, answer) {
  if (answer === null) {
    return false;
  }
  return answer === tofQuestion.answer;
}

function evaluateMultipleChoiceAnswer(mcQuestion, answer) {
  if (answer === null) {
    return false;
  }
  let isCorrectAnswer = false;
  mcQuestion.answers.forEach((answerChoice) => {
    if (answerChoice.isRight && answer === answerChoice.choice) {
      isCorrectAnswer = true;
    }
  });

  return isCorrectAnswer;

}

function evaluateFillInBlankAnswer(fibQuestion, answer) {
  if (answer === null) {
    return false;
  }
  return answer === fibQuestion.answer;
}



