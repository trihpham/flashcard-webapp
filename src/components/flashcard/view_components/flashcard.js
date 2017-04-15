import React from 'react';
import { Grid, Input } from 'semantic-ui-react';
const Flashcard = ({term, definition}) => {
  return (
    <Grid.Row>
		<Grid.Column width={8}>
	    	<Input fluid type='text' placeholder="term" value={term} readOnly/>
	    </Grid.Column>
		<Grid.Column width={8}>
	    	<Input fluid type='text' placeholder="definition" value={definition} readOnly/>
	    </Grid.Column>
	</Grid.Row>
  );
}

export default Flashcard;