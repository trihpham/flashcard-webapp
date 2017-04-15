import _ from 'lodash';
import { SHUFFLE, CHANGE_CARD, FLIP_CARD } from '../actions/standard';
import { SET_UP_STANDARD_MODE } from '../actions/types';
const INITIAL_STATE = {
    position: 0,
    cardFlipped: false,
    list: []
};
//for regular flashcard learning mode 

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case SET_UP_STANDARD_MODE: {
        const flashcards = action.payload;
        const list = flashcards.map(({term, definition}) => {
            return ({
                term,
                definition
            });
        });
        return {
            ...state,
            list,
            position: 0,
            cardFlipped: false
        };
    }
    case SHUFFLE: {
        const list = _.shuffle(state.list);
        return {
            ...state,
            list,
            position: 0,
            cardFlipped: false
        };
    }
    case CHANGE_CARD: {
        const newPosition = action.payload + state.position;
        if (newPosition < 0 || newPosition >= state.list.length) {
            return state;
        }
        return {
            ...state,
            position: newPosition,
            cardFlipped: false
        };
    }
    case FLIP_CARD: {
        return {
            ...state,
            cardFlipped: !state.cardFlipped
        };
    }
    default:
        return state;
    }
}