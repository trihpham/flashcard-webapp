import { FETCH_FLASHCARDSETS, FETCH_FLASHCARDSET, REMOVED_FLASHCARD, ADDED_FLASHCARD, UPDATED_FLASHCARD, ADDED_FLASHCARDS_IN_BULK, UPDATED_FLASHCARDSET } from '../actions/types';
import update from 'immutability-helper';
export default function(state = {
    flashcardSetList: [],
    flashcardSet: null,
    count: 0,
    offset: 0,
    limit: 0
  }, action) {
  switch (action.type) {
    case FETCH_FLASHCARDSETS: {
      const {flashcardSets, count, offset, limit} = action.payload;
      return {
        ...state,
        flashcardSetList: flashcardSets,
        count,
        offset,
        limit
      };
    }
    case FETCH_FLASHCARDSET: {
      const flashcardSet = action.payload;
      return {
        ...state,
        flashcardSet
      };
    }
    case ADDED_FLASHCARD: {
      const newFlashcard = action.payload;
      const flashcardSet = state.flashcardSet;
      const newFlashcardSet = update(flashcardSet, {
        flashcards: {
          $push: [newFlashcard]
        }
      });
      return {
        ...state,
        flashcardSet: newFlashcardSet
      };
    }
    case REMOVED_FLASHCARD: {
      const removedFlashcardId = action.payload;
      const flashcardSet = state.flashcardSet;
      const removeIndex = flashcardSet.flashcards.findIndex(x => x._id === removedFlashcardId);
      if (removeIndex || removeIndex === 0) {
        return {
          ...state,
          flashcardSet: update(flashcardSet, {
            flashcards: {
              $splice: [[removeIndex, 1]]
            }
          })
        };
      } else {
        return state;
      }
    }
    case UPDATED_FLASHCARDSET: {
      const flashcardSet = action.payload;
      return {
        ...state,
        flashcardSet
      };
    }
    case UPDATED_FLASHCARD: {
      const flashcardSet = state.flashcardSet;
      const updatedFlashcard = action.payload;
      const updatedFlashcardId = updatedFlashcard._id;
      const updateIndex = flashcardSet.flashcards.findIndex(x => x._id === updatedFlashcardId);
      if (updateIndex || updateIndex === 0) {
        return {
          ...state,
          flashcardSet: update(flashcardSet, {
            flashcards: {
              [updateIndex]: {
                $set: updatedFlashcard
              }
            }
          })
        }
      } else {
        return state;
      }
    }
    case ADDED_FLASHCARDS_IN_BULK: {
      const updatedFlashcardSet = action.payload;
      return {
        ...state,
        flashcardSet: updatedFlashcardSet
      };
    }
    default:
      return state;

  }

}
