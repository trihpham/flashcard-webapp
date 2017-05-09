import React from 'react';
import { Form } from 'semantic-ui-react';
import TagList from './tag_list';
const FlashcardSetHeader = ({title, description, tags}) => {
    return (
        <Form>
			<Form.Input label='Title' type='text' value={title} readOnly/>
			<Form.TextArea label='Description' type='text'  value={description} readOnly/>
			<TagList tags={tags} deletable={false} />
		</Form>
    );
}

export default FlashcardSetHeader;