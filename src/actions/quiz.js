export const INITIALIZE_TEST = 'INITIALIZE_TEST';
export const ADD_OR_UPDATE_ANSWER = 'ADD_OR_UPDATE_ANSWER';
export const EVALUATE_ANSWERS = 'EVALUATE_ANSWERS';
export const RESET_TEST = 'RESET_TEST';

export function saveAnswer(type,questionIndex, answer){
	return {
		type: ADD_OR_UPDATE_ANSWER,
		payload: { 
			questionType: type,
			questionIndex: questionIndex,
			answer: answer
		}
	};
}

export function initializeTest(){
	return {
		type: INITIALIZE_TEST,
		payload: null
	};
}

export function evaluateTest(){
	return {
		type: EVALUATE_ANSWERS,
		payload: null
	}
}

export function resetTest(){
return function(dispatch, getState){
	const { flashcards } = getState().flashcard.flashcardSet;
		dispatch({ type: RESET_TEST,
				payload: flashcards});
	}
}