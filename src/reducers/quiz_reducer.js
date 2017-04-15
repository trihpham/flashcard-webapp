import { generateQuiz, generateBlankUserAnswers, evaluateAnswers } from '../tools/quiz_generator';
import { INITIALIZE_TEST, ADD_OR_UPDATE_ANSWER, EVALUATE_ANSWERS, RESET_TEST } from '../actions/quiz';
import { MULTIPLE_CHOICE, FILL_IN_BLANK, TRUE_OR_FALSE } from '../constants/question_options';
import { SET_UP_QUIZ_MODE } from '../actions/types';
import shortid from 'shortid';

const INITIAL_STATE = {
    options: [MULTIPLE_CHOICE,
        FILL_IN_BLANK,
        TRUE_OR_FALSE
    ],
    quiz: null,
    isEvaluated: false,
    userAnswers: null,
    score: null
};

function createQuiz(flashcards, state) {
    const list = flashcards.map(({term, definition}) => {
        return {
            id: shortid.generate(),
            term,
            definition
        };
    });
    const {options} = state;
    return generateQuiz(options, list);
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case SET_UP_QUIZ_MODE: {
        const flashcards = action.payload;
        const quiz = createQuiz(flashcards, state);
        const userAnswers = generateBlankUserAnswers(quiz);
        return ({
            ...state,
            quiz,
            userAnswers,
            isEvaluated: false
        });
    }
    case ADD_OR_UPDATE_ANSWER: {
        const {userAnswers} = state;
        const {questionType, questionIndex, answer} = action.payload;
        const questionArray = state.userAnswers[questionType].slice();
        questionArray[questionIndex] = answer;
        const newUserAnswers = {
            ...userAnswers,
            [questionType]: questionArray
        };
        return ({
            ...state,
            userAnswers: newUserAnswers
        });
    }
    case EVALUATE_ANSWERS: {
        const {quiz, userAnswers} = state;
        const score = evaluateAnswers(quiz, userAnswers);
        return ({
            ...state,
            isEvaluated: true,
            score
        });
    }
    case RESET_TEST: {
        const flashcards = action.payload;
        const quiz = createQuiz(flashcards, state);
        const userAnswers = generateBlankUserAnswers(quiz);
        return ({
            ...state,
            quiz,
            userAnswers,
            isEvaluated: false,
            score: null
        });
    }
    default:
        return state;
    }

}
