import React, { Component } from 'react';
import EditableFlashcard from './editable_flashcard';
import { Grid } from 'semantic-ui-react';

export default class EditableFlashcardList extends Component{
	render(){
	const { flashcards, flashcardSetId } = this.props;

	return(
		<Grid>
			{flashcards.map((flashcard)=>
				<EditableFlashcard key={flashcard._id} flashcard={flashcard} flashcardSetId={flashcardSetId} />
			)}
		</Grid>
	);
	
	}
}





