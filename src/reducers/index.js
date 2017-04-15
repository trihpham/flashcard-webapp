import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import matchingGameModeReducer from './matching_game_reducer';
import standardModeReducer from './standard_reducer';
import quizModeReducer from './quiz_reducer';
import flashcardReducer from './crud_flashcard_reducer';
import flashMessagesReducer from './flash_messages_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  matchingGame: matchingGameModeReducer,
  standard: standardModeReducer,
  quiz: quizModeReducer,
  flashcard: flashcardReducer,
  flashMessages: flashMessagesReducer
});

export default rootReducer;
