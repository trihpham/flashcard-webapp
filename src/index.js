import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Feature from './components/auth/feature';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import IndexSetSearch from './components/index_set_search';
import UserSetSearch from './components/user_set_search';

import FlashcardSet from './components/flashcard/flashcard_set';
import FlashcardSetList from './components/flashcard/flashcard_set_list';
import CreateFlashcardSet from './components/flashcard/create';
import ViewAndUpdate from './components/flashcard/view_and_update';
import FlashcardSetView from './components/flashcard/flashcard_set_view';
import FlashcardSetPageContainer from './components/flashcard/flashcard_set_page_container';

import MatchingGameMode from './components/flashcard/mode/matching_game/matching_game';
import StandardMode from './components/flashcard/mode/standard/flashcard_learning_game';
import QuizMode from './components/flashcard/mode/quiz/quiz';
import NotFound from './components/not_found';

import '../style/style.css';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({
        type: AUTH_USER
    });
}


ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="home" component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
        <Route path="create" component={CreateFlashcardSet} />
        <Route path="feature" component={RequireAuth(Feature)} />
        <Route path="flashcardsets" component={FlashcardSetList}/>
        <Route path="search" component={IndexSetSearch} />
        <Route path="mySets" component={UserSetSearch} />
        <Route path="user/:userId/flashcardsets" component={UserSetSearch}/>
      <Route path='flashcardsets/:flashcardsetId' component={FlashcardSetPageContainer}>
          <IndexRoute component={FlashcardSetView}/>
          <Route path='edit' component={ViewAndUpdate}/>
          <Route path='matching' component={MatchingGameMode} />
          <Route path="standard" component={StandardMode} />
          <Route path="quiz" component={QuizMode} />
        </Route>
        <Route path='*' component={NotFound} />
        </Route>
    </Router>
  </Provider>
    , document.querySelector('.container'));
