import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form, Message, Grid, Icon, Divider } from 'semantic-ui-react';
import update from 'immutability-helper';
import shortid from 'shortid';
import { createFlashcardSet } from '../../actions/index';

class CreateFlashcardSet extends Component {


  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      flashcards: [{
        id: shortid.generate(),
        term: '',
        definition: ''
      }, {
        id: shortid.generate(),
        term: '',
        definition: ''
      }, {
        id: shortid.generate(),
        term: '',
        definition: ''
      }, {
        id: shortid.generate(),
        term: '',
        definition: ''
      }],
      errors: []
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.addNewFlashcard = this.addNewFlashcard.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    return (
      <div>
				<Divider hidden/>
				{this.renderServerError()}
				{this.renderClientErrors()}
				{this.renderFlashcardSetFields()}
				<Divider hidden={true} />
				{this.renderFlashcardFields()}
				<Divider hidden={true} />
				{this.renderAddFlashcardButton()}
				{this.renderSubmitButton()}
			</div>
    );
  }

  renderServerError() {
    const error = this.props.serverError;
    if (error) {
      return (<Message key={shortid.generate()}  negative>
				    <Message.Header>There was some error submitting.</Message.Header>
				    <p>{error}</p>
			</Message>);
    } else {
      return '';
    }
  }

  renderClientErrors() {
    const errors = this.state.errors;
    if (errors.length > 0) {
      return (<Message
        error
        header='Please fix the problems below'
        list={errors}
        />);
    } else {
      return null;
    }

  }



  renderFlashcardSetFields() {
    const {title, description, flashcards} = this.state;
    return (
      <Form>
				<Form.Input key="title" label='Title' type='text' placeholder='Title' value={title} onChange={this.onTitleChange}/>
				<Form.TextArea key="description" label='Description' placeholder='Description' value={description} onChange={this.onDescriptionChange} />
			</Form>
    );
  }



  renderFlashcardFields() {
    const {flashcards} = this.state;
    const self = this;
    return (
      <Grid>
				{flashcards.map((flashcard) => {
        return self.renderFlashcardField(flashcard);
      })}
    		</Grid>);
  }

  renderFlashcardField(flashcard) {
    const self = this;
    const {title, definition} = flashcard;
    const flashcardId = flashcard.id;
    return (<Grid.Row key={flashcardId}>
    			<Grid.Column width={7}>
    				<Input fluid type='text' placeholder="term" value={title} onChange={self.onTermChange.bind(this, flashcardId)} />
    			</Grid.Column>
    			<Grid.Column width={7}>
    				<Input fluid type='text' placeholder="definition" value={definition} onChange={self.onDefinitionChange.bind(this, flashcardId)}  />
    			</Grid.Column>
    			<Grid.Column width={2}>
    				  <Button fluid content='Remove' color="yellow" onClick={self.onRemove.bind(this, flashcardId)}/>
    			</Grid.Column>
    			</Grid.Row>
    );
  }

  onRemove(id) {
    const flashcards = this.state.flashcards;
    const removedIndex = flashcards.findIndex(flashcard => flashcard.id === id);
    const newFlashcards = update(flashcards, {
      $splice: [[removedIndex, 1]]
    });
    this.setState({
      flashcards: newFlashcards
    });
  }

  renderAddFlashcardButton() {
    const self = this;
    return (
      <Button content='Add Flashcard' icon={<Icon name="add" color="green"/>} onClick={self.addNewFlashcard}/>
    );
  }

  renderSubmitButton() {
    return (<Button primary content='Submit' onClick={this.onFormSubmit}/>);
  }

  onFormSubmit() {
    const errors = [];
    const {title, description, flashcards} = this.state;

    if (title.length < 1) {
      errors.push("title field must not be blank");
    }

    if (description.length < 1) {
      errors.push("description field must not be blank");
    }

    let flashcardError = false;
    flashcards.forEach((flashcard) => {
      const {term, definition} = flashcard;
      if (term.length < 1 || definition.length < 1) {
        flashcardError = true;
      }
    });

    if (flashcardError) {
      errors.push("there are empty fields in your flashcard")
    }

    if (errors.length > 0) {
      this.setState({
        errors
      });
      return;
    } else {

      const flashcardSetProps = {
        title,
        description,
        flashcards
      };
      this.props.createFlashcardSet(flashcardSetProps);
    }
  }

  onTitleChange(event) {
    const title = event.target.value;
    this.setState({
      title
    });
  }

  onDescriptionChange(event) {
    const description = event.target.value;
    this.setState({
      description
    });
  }

  onTermChange(id, event) {
    const term = event.target.value;
    const flashcards = this.state.flashcards;
    const index = flashcards.findIndex(flashcard => flashcard.id === id);

    const newFlashcards = update(flashcards, {
      [index]: {
        term: {
          $set: term
        }
      }
    });
    this.setState({
      flashcards: newFlashcards
    });
  }

  onDefinitionChange(id, event) {
    const definition = event.target.value;
    const flashcards = this.state.flashcards;
    const index = flashcards.findIndex(flashcard => flashcard.id === id);

    const newFlashcards = update(flashcards, {
      [index]: {
        definition: {
          $set: definition
        }
      }
    });
    this.setState({
      flashcards: newFlashcards
    });
  }

  addNewFlashcard() {
    const flashcards = this.state.flashcards;
    const newFlashcards = update(flashcards, {
      $push: [{
        id: shortid.generate(),
        term: '',
        definition: ''
      }]
    });
    this.setState({
      flashcards: newFlashcards
    });
  }


}



export default connect(null, {
  createFlashcardSet
})(CreateFlashcardSet);