import React from 'react';
import { Grid } from 'semantic-ui-react';
import Flashcard from './flashcard';

const FlashcardList = ({flashcards}) => {
  return (
    <Grid>
		{flashcards.map(({term, definition, _id}) => <Flashcard key={_id} term={term} definition={definition} />)}
	</Grid>
  );
}
export default FlashcardList;