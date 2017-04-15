import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { addFlashcardInBulk } from '../../../actions/index'; 
import {Button, Input, Form, Message, Grid, Icon, Divider} from 'semantic-ui-react';
import shortid from 'shortid';
class NewFlashcardFields extends Component {
	constructor(props){
		super(props);
		this.state = {
			newFlashcards: [],
			addIncrement: 1,
			showIncrementInput: false,
			errors: []
		}

		this.onAddClick = this.onAddClick.bind(this);
		this.onRemoveClick = this.onRemoveClick.bind(this);
		this.onChangeIncrement = this.onChangeIncrement.bind(this);
		this.onShowChangeIncrement = this.onShowChangeIncrement.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render(){
		return(<div>
			    <Divider section />
			{this.renderErrors()}
			{this.renderNewFlashcardInputs()}
			{this.renderSubmit()}

			{this.renderAddButton()}
			
		</div>);
	}

	renderIncrementInput(){
		const showIncrementInput = this.state.showIncrementInput;
		const options = [
			{value: 1, label: 'One'},
			{value: 5, label: 'Five'},
			{value: 10, label: 'Ten'},
			{value: 20, label: 'Twenty'}
		];

		if(showIncrementInput){
			return(
				<div>
					<label>Add Increment:</label>
					<Select 
					name="add-increment-input"
					value={this.state.addIncrement}
					options={options}
					onChange={this.onChangeIncrement} />
				</div>
				);
		} else {
			return('');
		}
	}


	renderNewFlashcardInputs(){
		const newFlashcards = this.state.newFlashcards;
		const self = this;
		return(<Grid>
			{newFlashcards.map((flashcard) => {
				return(self.renderNewFlashcardInput(flashcard));
			})}
		</Grid>);
	}


	renderNewFlashcardInput(flashcard){
		const {term, definition, id} = flashcard;
		const self = this;
		return(	<Grid.Row key={id}>
	    			<Grid.Column width={6}>
	    				<Input fluid type='text' placeholder="term"  value={term} onChange={self.onTermChange.bind(self, id)} />
	    			</Grid.Column>
	    			<Grid.Column width={6}>
	    				<Input fluid type='text' placeholder="definition" value={definition} onChange={self.onDefinitionChange.bind(self, id)}  />
	    			</Grid.Column>
	    			<Grid.Column width={4} >
	    				  <Button content='Remove' color="yellow" onClick={self.onRemoveClick.bind(self, id)}/>
	    			</Grid.Column>
    			</Grid.Row>
    			);
	}

	renderSubmit(){
		if(this.state.newFlashcards.length > 0){
			return(
				<div>
					<Grid>
						<Grid.Row key="submit">
			    			<Grid.Column width={12} textAlign="center">
			    				<Button type='text' content="Submit New Flashcards" onClick={this.onSubmit} color="blue"/>
			    			</Grid.Column>
			    		</Grid.Row>
			    	</Grid>
		    		<Divider section />
		    	</div>);
		} else {
			return('');
		}

	}

	renderErrors(){


		const errors = this.state.errors;
		if(errors.length>0){
			return( 
				<Message
			    	error
			    	header='Please fix the following problems'
			    	list={errors} 
			    />
			);
		} else{
			return null;
		}

	}


	renderAddButton(){
		return(
			<Button content='Add New Flashcard' icon={<Icon name="add" color="green"/>} onClick={this.onAddClick}/>
		);
	}

	onAddClick(){
		const addIncrement = this.state.addIncrement;
		const newEmptyFlashcards = [];
		for(let i=0; i<addIncrement; i++){
			const newEmptyFlashcard = {id: shortid.generate(), term: '', definition: '' };
			newEmptyFlashcards.push(newEmptyFlashcard);
		}
	
		
		const newFlashcards = update(this.state.newFlashcards, {$push: newEmptyFlashcards});
		this.setState({newFlashcards});
	}

	onRemoveClick(id){
		const newFlashcards = this.state.newFlashcards;
		const index = newFlashcards.findIndex((flashcard)=>{
			return flashcard.id === id;
		});
		if(index || index === 0){
			const newFlashcards = update(this.state.newFlashcards, {$splice: [[index, 1]]});
			this.setState({newFlashcards});
		}
	}

	onDefinitionChange(id, event){
		const definition = event.target.value;
		const index = this.state.newFlashcards.findIndex( flashcard => flashcard.id === id);
		const newFlashcards = update(this.state.newFlashcards, {[index]: { definition: {$set: definition} }});
		this.setState({newFlashcards});
	}

	onTermChange(id, event){
		const term = event.target.value;
		const index = this.state.newFlashcards.findIndex( flashcard => flashcard.id === id);
		const newFlashcards = update(this.state.newFlashcards, {[index]: { term: {$set: term} }});
		this.setState({newFlashcards});
	}

	onShowChangeIncrement(){
		this.setState({showIncrementInput: true});
	}

	onChangeIncrement(output){
		this.setState({addIncrement: output.value});
	}

	onSubmit(){
		const flashcardSetId = this.props.flashcardSetId;
		const newFlashcards = this.state.newFlashcards;
		const self = this;
		const errors = this.errorCheck();
		if(errors.length > 0){
			return this.setState({errors});
		} else {
		this.setState({hasSubmitted: true}, ()=>{
			self.props.addFlashcardInBulk(flashcardSetId, newFlashcards);
		});
		}

	}

	errorCheck(){
		const newFlashcards = this.state.newFlashcards;
		let errors = [];
		let hasEmptyFields = false;
		for(let i=0;i<newFlashcards.length;i++){
			const {term, definition} = newFlashcards[i];
			if(term.trim().length === 0 || definition.trim().length === 0){
				hasEmptyFields = true;
				break;
			}
		}

		if(hasEmptyFields){
			errors.push("Oops! You might have missed a fields.");
		} 
		return errors;
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.flashcards.length > this.props.flashcards.length){
			this.resetNewFlashcards();
		}
	}

	resetNewFlashcards(){
		this.setState({newFlashcards: [], errors: []});
	}

}

export default connect(null, {addFlashcardInBulk})(NewFlashcardFields);