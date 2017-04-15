import React from 'react';
import { Form } from 'semantic-ui-react';
const FlashcardSetHeader = ({title, description}) => {
  return (
    <Form>
			<Form.Input label='Title' type='text' value={title} readOnly/>
			<Form.TextArea label='Description' type='text'  value={description} readOnly/>
		</Form>
  );
}

export default FlashcardSetHeader;