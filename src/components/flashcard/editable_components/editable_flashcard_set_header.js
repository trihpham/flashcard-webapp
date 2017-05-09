import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { Button, Input, Form, Message, Grid, Icon, TextArea, Label, Divider } from 'semantic-ui-react';
import { updateFlashcardSet } from '../../../actions/index';
import TagList from '../view_components/tag_list';
class EditableFlashcardSetHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description,
            tags: props.tags,
            tagField: '',
            editable: props.editable || false,
            editMode: false
        }

        this.onHandleEdit = this.onHandleEdit.bind(this);
        this.onHandleConfirm = this.onHandleConfirm.bind(this);
        this.onHandleCancel = this.onHandleCancel.bind(this);
        this.onHandleTitleChange = this.onHandleTitleChange.bind(this);
        this.onHandleDescriptionChange = this.onHandleDescriptionChange.bind(this);
        this.onHandleDeleteTag = this.onHandleDeleteTag.bind(this);
        this.onHandleAddTag = this.onHandleAddTag.bind(this);
        this.onHandleTagFieldKeyPress = this.onHandleTagFieldKeyPress.bind(this);
        this.onHandleAddTagFieldChange = this.onHandleAddTagFieldChange.bind(this);
    }

    render() {
        return (
            <div>
    {this.renderInputs()}
    {this.renderTagList()}
    {this.renderEditButtons()}  
  </div>
        );


    }

    renderTagList() {
        if (this.state.editMode) {
            return this.renderEditModeTagList();
        } else {
            return this.renderNonEditModeTagList();
        }
    }

    renderNonEditModeTagList() {
        const tags = this.state.tags;
        return (<div className="tag-field">
              <TagList tags={tags} deletable={false} />
              </div>);
    }

    renderEditModeTagList() {
        const tagField = this.state.tagField;
        const tags = this.state.tags;
        const tagListComp = tags.length > 0 ? <TagList tags={tags} deletable={true} deleteFunction={this.onHandleDeleteTag} /> : <Divider hidden />;
        return (
            <div>
            <div className="tag-field">
              {tagListComp}
                </div>
              
            <Input
            icon='tags'
            iconPosition='left'
            label={  <Label as='a' color="green" tag onClick={this.onHandleAddTag}>Add Tag</Label> }
            labelPosition='right'
            placeholder='Enter tags'
            value={tagField}
            onChange={this.onHandleAddTagFieldChange}
            onKeyPress={this.onHandleTagFieldKeyPress}
            />
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
        console.log("editMode", editMode);

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

        return null;
    }
    onHandleEdit() {
        this.setState({
            editMode: true
        });
    }

    onHandleDeleteTag(tagIndex) {
        const tags = this.state.tags;
        const newTags = tags.filter((item, index) => index !== tagIndex);
        console.log(newTags);
        this.setState({
            tags: newTags
        });
    }

    onHandleAddTag() {
        const tagField = this.state.tagField;
        const newTags = this.state.tags.slice();
        newTags.push(tagField);
        this.setState({
            tags: newTags,
            tagField: ''
        });
    }

    onHandleAddTagFieldChange(event) {
        const tagField = event.target.value;
        this.setState({
            tagField
        });
    }

    onHandleTagFieldKeyPress(event) {
        if (event.key === 'Enter') {
            this.onHandleAddTag();
        }
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
        const {title, description, tags} = this.state;
        const {flashcardSetId} = this.props;

        this.setState({
            editMode: false
        }, () => {
            self.props.updateFlashcardSet(flashcardSetId, {
                title,
                description,
                tags
            });
        });
    }
    onHandleCancel() {
        const originalTitle = this.props.title;
        const originalDescription = this.props.description;
        const originalTags = this.props.tags;
        this.setState(
            {
                title: originalTitle,
                description: originalDescription,
                tags: originalTags,
                editMode: false
            }
        );
    }



}




export default connect(null, {
    updateFlashcardSet
})(EditableFlashcardSetHeader);