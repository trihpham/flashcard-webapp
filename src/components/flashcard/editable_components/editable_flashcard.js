import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { updateFlashcard, removeFlashcard } from '../../../actions/index'; 
import {Button, Input, Form, Message, Grid, Icon} from 'semantic-ui-react';
class EditableFlashcard extends Component {
	constructor(props){
		super(props);
		const { term, definition} = props.flashcard;
		this.state = {
			term,
			definition,
			editMode: false
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.onTermChange = this.onTermChange.bind(this);
		this.onDefinitionChange = this.onDefinitionChange.bind(this);
	}

	componentWillReceiveProps(nextProps){
		const { term, definition } = nextProps.flashcard;
		this.setState({
			term,
			definition
		});
	}
	render(){
		const id = this.props.flashcard._id;
		return(
			<Grid.Row>
				{this.renderInputContent()}
				{this.renderEditButtons()}
			</Grid.Row>
		);
	}

	renderInputContent(){
		const { term, definition, editMode } = this.state;
		const self = this;
		const width = 6;
		const id = this.props.flashcard._id;
			return(
    			[<Grid.Column width={width} key={id + 'term'}>
    				<Input fluid type='text' placeholder="term" value={term}  disabled={!editMode} onChange={self.onTermChange} />
    			</Grid.Column>,
    			<Grid.Column width={width} key={id + 'definition'}>
    				<Input fluid type='text' placeholder="definition" value={definition}  disabled={!editMode} onChange={self.onDefinitionChange}  />
    			</Grid.Column>]
    		);

	}

	renderEditButtons(){
		const editable = this.props.editable;
		const editMode = this.state.editMode;
		const id = this.props.flashcard._id;		
		if(!editMode){
			return([<Grid.Column width={2} key={id + 'edit'}>
    				  <Button fluid icon={<Icon name="edit" color="blue"/>} content='Edit' onClick={this.handleEdit}/>
    			</Grid.Column>,
    			   <Grid.Column width={2}  key={id + 'delete'}>
    				  <Button fluid  icon={<Icon name="trash"  color="red"/>} content='Delete' onClick={this.handleDelete}/>
    			</Grid.Column>]);
		} else if(editMode){
			return(
				[<Grid.Column width={2}  key={id + 'edit'}>
					 <Button.Group fluid>
					    <Button attached='left'   onClick={this.handleConfirm} icon={<Icon name="check" color="green"/>}/>
					    <Button attached='right'  onClick={this.handleCancel} icon={<Icon name="cancel" color="yellow"/>}/>
					</Button.Group>
				</Grid.Column>,
    			   <Grid.Column width={2} key={id + 'delete'}>
    				  <Button fluid  icon={<Icon name="trash"  color="red"/>} content='Delete' onClick={this.handleDelete}/>
    			</Grid.Column>]
			);
		} 
	}

	handleEdit(){
		this.setState({editMode: true});
	}
	handleDelete(){
		const flashcardId = this.props.flashcard._id;
		const flashcardSetId = this.props.flashcardSetId;
		const self = this;
		this.setState({
			term: 'Deleting...',
			definition: 'Deleting...',
			editMode: false
		},
		() => {
			self.props.removeFlashcard(flashcardSetId,flashcardId);
		});
	}

	handleConfirm(){
		const { term, definition } = this.state;
		const flashcardId = this.props.flashcard._id;
		const flashcardSetId = this.props.flashcardSetId;
		const flashcardProps =  {term, definition};
		const self = this;
		this.setState({
			term: 'Updating...',
			definition: 'Updating...',
			editMode: false
		},
		() => {
			self.props.updateFlashcard(flashcardSetId,flashcardId, flashcardProps);
		});
	}

	handleCancel(){
		const { term, definition } = this.props.flashcard;
		this.setState(
			{	term,
				definition,
				editMode: false
			}
		);
	}

	onTermChange(event){
		const term = event.target.value;
		this.setState({term});
	}

	onDefinitionChange(event){
		const definition = event.target.value;
		this.setState({definition});
	}

}



export default connect(null, {updateFlashcard, removeFlashcard})(EditableFlashcard);

