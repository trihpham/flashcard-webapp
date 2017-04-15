export const CHANGE_CARD = 'CHANGE_CARD';
export const SHUFFLE = 'SHUFFLE';
export const FLIP_CARD = 'FLIP_CARD';
export const MATCH_GAME_SELECT_CARD = 'MATCH_GAME_SELECT_CARD';
export const LOAD_GAME = 'LOAD_GAME';
export const CARD_CHOSEN = 'CARD_CHOSEN';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const RESTART_GAME = 'RESTART_GAME';

export const TIMER_START = 'TIMER_START';
export const TIMER_STOP = 'TIMER_STOP';
export const TIMER_TICK = 'TIMER_TICK';



let timer = null;


export function restartGame() {
    return function(dispatch, getState) {
        const {flashcards} = getState().flashcard.flashcardSet;
        dispatch({
            type: RESTART_GAME,
            payload: flashcards
        });

        clearInterval(timer);
        timer = setInterval(() => dispatch(tickTimer()), 1000);
        dispatch({
            type: TIMER_START
        });
    }
}



export function startTimer() {
    return function(dispatch) {
        clearInterval(timer);
        timer = setInterval(() => dispatch(tickTimer()), 1000);
        dispatch({
            type: TIMER_START
        });
    }
}

export function tickTimer() {
    return {
        type: TIMER_TICK
    };
}

export function stopTimer() {
    clearInterval(timer);
    return {
        type: TIMER_STOP
    };
}



