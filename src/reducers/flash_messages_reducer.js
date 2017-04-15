import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';

export default function(state = [], action = {}) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      const {type, text} = action.payload;
      return [
        ...state,
        {
          id: shortid.generate(),
          type,
          text
        }
      ];
    case DELETE_FLASH_MESSAGE:
      return state.filter(message => message.id !== action.payload);
    default:
      return state;
  }
}