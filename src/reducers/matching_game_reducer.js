import _ from 'lodash';
import { LOAD_GAME, CARD_CHOSEN, START_GAME, SET_UP_MATCHING_GAME, RESTART_GAME } from '../actions/matching_game';
import { SET_UP_MATCHING_GAME_MODE } from '../actions/types';
import shortid from 'shortid';
import { TIMER_TICK, TIMER_STOP, TIMER_START} from '../actions/matching_game';
export const FRONT_SIDE = 'FRONT_SIDE';
export const BACK_SIDE = 'BACK_SIDE';

export const GAME_STATE_NOT_STARTED = 'GAME_STATE_NOT_STARTED';
export const GAME_STATE_STARTED = 'GAME_STATE_STARTED';
export const GAME_STATE_FINISH = 'GAME_STATE_FINISH';


const INITIAL_STATE = { 
	list:[],
	matchedList: [],
	elapsedTime: 0
	};


function sameCard(card1, card2){
	return(card1.id === card2.id && card1.cardSide === card2.cardSide);
}

function matchCard(card1, card2){
	return(card1.id === card2.id && card1.cardSide !== card2.cardSide);
}

function checkGameFinished(matchedList){
	return matchedList.every((match)=>{
		return match;
	});
}

function setUpNewGameList(flashcards){
	let standardModeFlashcards = flashcards.map(({term, definition})=>{
		return {id: shortid.generate(),term, definition};
	});
	let list = [];
	const numberOfCardsForGame = flashcards.length >= 8 ? 8 : flashcards.length; 
	const choosenCards = _.take(_.shuffle(standardModeFlashcards), numberOfCardsForGame);
	choosenCards.forEach((card)=>{
		list.push({
				id: card.id,
				cardSide: FRONT_SIDE,
				text: card.term
		});
		list.push({
			id: card.id,
			cardSide: BACK_SIDE,
			text: card.definition
		});
	});
	list = _.shuffle(list);
	return list;
}


export default function (state = INITIAL_STATE, action){
	switch(action.type){
		case SET_UP_MATCHING_GAME_MODE:{
			const flashcards = action.payload;
			const list = setUpNewGameList(flashcards);
			const matchedList = Array(list.length).fill(false);
			return {...state,  list, matchedList};
		}
		case START_GAME:
			return {...state, gameState: GAME_STATE_STARTED}
		
		case RESTART_GAME:{
				const flashcards = action.payload;
				const list = setUpNewGameList(flashcards);
				const matchedList = Array(list.length).fill(false);
				return {...state,  list, matchedList , gameState: GAME_STATE_STARTED, elapsedTime: 0};
			}
		case TIMER_START:
			return {...state, elapsedTime: 0};
		
		case TIMER_TICK:
		const {elapsedTime} = state;
			return {...state, elapsedTime: elapsedTime + 1};
		default:
			return state;
	}
}
