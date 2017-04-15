import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';
import { ROOT_URL } from './index';

export function signinUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, {
            email,
            password
        })
            .then(response => {
                dispatch({
                    type: AUTH_USER
                });

                extractResponseDataToLocalStorage(response);
                browserHistory.push('/');
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    }
}

function extractResponseDataToLocalStorage(response) {
    const {token} = response.data;
    const {_id, name} = response.data.user;
    setUserDataToLocalStorage(token, _id, name);
}

function setUserDataToLocalStorage(token, userId, userName) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
}

export function signupUser({email, password, firstName, lastName}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {
            email,
            password,
            firstName,
            lastName
        })
            .then(response => {
                dispatch({
                    type: AUTH_USER
                });
                extractResponseDataToLocalStorage(response);
                browserHistory.push('/');
            })
            .catch(({response}) => {
                dispatch(authError(response.data.error));
            });

    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}


export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    return {
        type: UNAUTH_USER
    };
}


export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    }
}