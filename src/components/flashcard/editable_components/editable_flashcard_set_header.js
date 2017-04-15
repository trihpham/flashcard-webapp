import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { Button, Input, Form, Message, Grid, Icon, TextArea } from 'semantic-ui-react';
import { updateFlashcardSet } from '../../../actions/index';
class EditableFlashcardSetHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      editable: props.editable || false,
      editMode: false
    }

    this.onHandleEdit = this.onHandleEdit.bind(this);
    this.onHandleConfirm = this.onHandleConfirm.bind(this);
    this.onHandleCancel = this.onHandleCancel.bind(this);
    this.onHandleTitleChange = this.onHandleTitleChange.bind(this);
    this.onHandleDescriptionChange = this.onHandleDescriptionChange.bind(this);
  }

  render() {
    return (
      <div>
		{this.renderInputs()}
		{this.renderEditButtons()}	
	</div>
    );


  }

  renderInputs() {
    const {title, description, editMode} = this.state;

    return (<Form>
			<Form.Field>
			  <label>Title</label>
			  <Input type='text'  value={title} onChange={this.onHandleTitleChange} disabled={!editMode}/>
			</Form.Field>

			<Form.Field>
			  <label>Description</label>
			  <TextArea type='text'  value={description} onChange={this.onHandleDescriptionChange} disabled={!editMode}/>
			</Form.Field>
			</Form>);
  }

  renderEditButtons() {
    const self = this;
    const {editable} = this.props;
    const {editMode} = this.state;
    if (editable) {
      if (editMode) {
        return (
          <div>
				<Button icon={<Icon name="check" color="green" />} content="Okay" onClick={self.onHandleConfirm}/>
				<Button icon={<Icon name="cancel" color="yellow" />} content="Cancel" onClick={self.onHandleCancel}/>
		</div>
        );
      } else {
        return (
          <Button icon={<Icon name="edit" color="blue" />} content="Edit"onClick={self.onHandleEdit}/>
        );
      }
    }
    return null;
  }
  onHandleEdit() {
    this.setState({
      editMode: true
    });
  }

  onHandleTitleChange(event) {
    const title = event.target.value;
    this.setState({
      title
    });
  }

  onHandleDescriptionChange(event) {
    const description = event.target.value;
    this.setState({
      description
    });
  }

  onHandleConfirm() {
    const self = this;
    const {title, description} = this.state;
    const {flashcardSetId} = this.props;

    this.setState({
      editMode: false
    }, () => {
      self.props.updateFlashcardSet(flashcardSetId, {
        title,
        description
      });
    });
  }
  onHandleCancel() {
    const originalTitle = this.props.title;
    const originalDescription = this.props.description;
    this.setState(
      {
        title: originalTitle,
        description: originalDescription,
        editMode: false
      }
    );
  }

}




export default connect(null, {
  updateFlashcardSet
})(EditableFlashcardSetHeader);