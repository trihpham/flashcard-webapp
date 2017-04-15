export const CHANGE_CARD = 'CHANGE_CARD';
export const SHUFFLE = 'SHUFFLE';
export const FLIP_CARD = 'FLIP_CARD';


export function changeCard(positionShift){
	return{
		type: CHANGE_CARD,
		payload: positionShift
	};
}

export function shuffleList(){
	return{
		type: SHUFFLE,
		payload: null
	};
}

export function flipCard(){
	return{
		type: FLIP_CARD,
		payload: null
	};
}