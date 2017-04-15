import { CHANGE_SEARCH, CHANGE_PAGE, RESET } from '../actions/types';
export default function(state = {
    searchTerm: '',
    page: 1
  }, action) {
  switch (action.type) {
    case CHANGE_SEARCH:
      return {
        ...state,
        searchTerm: action.payload
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: 1
      };
    case RESET:
      return {
        ...state,
        searchTerm: '',
        page: 1
      };
  }

  return state;
}