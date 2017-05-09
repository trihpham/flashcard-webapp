import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, FETCH_FLASHCARDSETS, FETCH_FLASHCARDSET, FETCH_FLASHCARDSETS_BY_USER, ADDED_FLASHNCARD, REMOVED_FLASHCARD, UPDATED_FLASHCARD, ADDED_FLASHCARDS_IN_BULK, ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, SET_UP_STANDARD_MODE, SET_UP_QUIZ_MODE, SET_UP_MATCHING_GAME_MODE, UPDATED_FLASHCARDSET } from './types';
import queryString from 'query-string';
import { PRODUCTION_ROOT_URL } from '../../config';

const DEFAULT_ROOT = 'http://localhost:3090';

//to connect to the backend
export const ROOT_URL = process.env.NODE_ENV === 'production' ? (PRODUCTION_ROOT_URL || DEFAULT_ROOT) : DEFAULT_ROOT;

export function createFlashcardSet(flashcardSetProps) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const {title, description, flashcards, tags} = flashcardSetProps;
    const userId = localStorage.getItem('userId');
    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/flashcardset`,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                title,
                description,
                flashcards,
                tags
            }
        }
        )
            .then(response => {
                const flashcardSetTitle = response.data.title;
                const flashcardSetId = response.data._id;
                browserHistory.push(`flashcardsets/${flashcardSetId}`);
                dispatch({
                    type: ADD_FLASH_MESSAGE,
                    payload: {
                        type: 'success',
                        text: `${flashcardSetTitle} was successfully created`
                    }
                });

            })
            .catch(() => {
                dispatch({
                    type: ADD_FLASH_MESSAGE,
                    payload: {
                        type: 'negative',
                        text: 'Error occurred creating flashcard set'
                    }
                });
            });
    }
}

export function deleteFlashcardSet(flashcardSetId) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/flashcardset/delete`,
            data: {
                flashcardSetId
            }
        }
        ).then(response => {
            if (response.data) {
                browserHistory.push(`mySets`);
                const flashcardSetTitle = response.data.title;
                dispatch({
                    type: ADD_FLASH_MESSAGE,
                    payload: {
                        type: 'success',
                        text: `${flashcardSetTitle} was successfully deleted`
                    }
                });


            }
        })
            .catch(() => {
                dispatch({
                    type: ADD_FLASH_MESSAGE,
                    payload: {
                        type: 'negative',
                        text: 'Error occurred deleting flashcardSetTitle flashcard set'
                    }
                });
            });

    }

}



export function fetchFlashcardSets({limit, offset, searchTerm}) {
    queryString.stringify({
        limit,
        offset,
        searchTerm
    });
    const query = queryString.stringify({
        limit,
        offset,
        searchTerm
    });
    return function(dispatch) {
        axios.get(`${ROOT_URL}/flashcardsets?${query}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                const {all, count, offset, limit} = response.data;
                dispatch({
                    type: FETCH_FLASHCARDSETS,
                    payload: {
                        flashcardSets: all,
                        count: count,
                        offset: offset,
                        limit: limit
                    }
                });
            });
    }
}


export function fetchFlashcardSet(flashcardSetId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/flashcardset/${flashcardSetId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                const {all, count, offset} = response.data;
                dispatch({
                    type: FETCH_FLASHCARDSET,
                    payload: response.data
                });
            });
    }
}
export function fetchFlashcardSetsOfLoggedInUser({limit, offset}) {
    const loggedInUserId = localStorage.getItem('userId');
    const queryString = `?limit=${limit || 10}&offset=${offset || 0}`;
    return function(dispatch) {
        axios.get(`${ROOT_URL}/flashcardsets/userId/${loggedInUserId}${queryString}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch({
                    type: FETCH_FLASHCARDSETS,
                    payload: response.data
                });
            });
    }
}

export function fetchFlashcardSetsByUser({userId, searchTerm}) {
    const query = queryString.stringify({
        searchTerm
    });
    return function(dispatch) {
        axios.get(`${ROOT_URL}/flashcardsets/user/${userId}?${query}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                const {all} = response.data;
                dispatch({
                    type: FETCH_FLASHCARDSETS,
                    payload: {
                        flashcardSets: all
                    }
                });
            });
    }
}


export function fetchFlashcardSetById(flashcardSetId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/flashcardset/${flashcardSetId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }

        })
            .then(response => {
                return dispatch({
                    type: FETCH_FLASHCARDSET,
                    payload: response.data
                });
            });
    }
}

export function updateFlashcardSet(flashcardSetId, flashcardSetProps) {
    const {title, description, tags} = flashcardSetProps;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return function(dispatch) {
        axios.post(`${ROOT_URL}/flashcardset/update`, {
            flashcardSetId,
            title,
            description,
            tags
        }).then(response => {
            if (response.data) {
                dispatch({
                    type: UPDATED_FLASHCARDSET,
                    payload: response.data
                });
            }
        });
    }
}


export function updateFlashcard(flashcardSetId, flashcardId, flashcardProps) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return function(dispatch) {
        axios.put(`${ROOT_URL}/flashcardset/flashcard/update`, {
            flashcardSetId,
            flashcardId,
            flashcard: flashcardProps
        })
            .then(response => {
                dispatch({
                    type: UPDATED_FLASHCARD,
                    payload: response.data
                })
            });
    }
}

export function removeFlashcard(flashcardSetId, flashcardId) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return function(dispatch) {
        axios.post(`${ROOT_URL}/flashcardset/flashcard/remove`, {
            flashcardSetId,
            flashcardId
        })
            .then(response => {
                dispatch({
                    type: REMOVED_FLASHCARD,
                    payload: response.data
                })
            });
    }
}

export function addFlashcard(flashcardSetId, flashcardProps) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return function(dispatch) {
        axios.post(`${ROOT_URL}/flashcardset/flashcard/add`, {
            flashcardsetId,
            flashcard: flashcardProps
        })
            .then(response => {
                dispatch({
                    type: ADDED_FLASHNCARD,
                    payload: response.data
                })
            });
    }
}

//returns whole flashcardSet
export function addFlashcardInBulk(flashcardSetId, flashcardListProps) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return function(dispatch) {
        axios.post(`${ROOT_URL}/flashcardset/flashcard/addBulk`, {
            flashcardSetId,
            flashcards: flashcardListProps
        })
            .then(response => {
                dispatch({
                    type: ADDED_FLASHCARDS_IN_BULK,
                    payload: response.data
                })
            });
    }
}

export function setUpStandardMode(flashcardSetId) {
    return setUpMode(SET_UP_STANDARD_MODE, flashcardSetId);
}

export function setUpQuizMode(flashcardSetId) {
    return setUpMode(SET_UP_QUIZ_MODE, flashcardSetId);
}

export function setUpMatchingGameMode(flashcardSetId) {
    return setUpMode(SET_UP_MATCHING_GAME_MODE, flashcardSetId);
}

function setUpMode(type, flashcardSetId) {

    return function(dispatch, getState) {
        const flashcardSet = getState().flashcard.flashcardSet;
        if (!flashcardSet || !flashcardSet.flashcards || flashcardSet.flashcards.length === 0) {
            axios.get(`${ROOT_URL}/flashcardset/${flashcardSetId}`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
                .then(response => {
                    return dispatch({
                        type: FETCH_FLASHCARDSET,
                        payload: response.data
                    });
                }).then(() => {
                const {flashcards} = getState().flashcard.flashcardSet;
                dispatch({
                    type,
                    payload: flashcards
                });
            });


        } else {
            const {flashcards} = getState().flashcard.flashcardSet;

            return dispatch({
                type,
                payload: flashcards
            });
        }
    }
}