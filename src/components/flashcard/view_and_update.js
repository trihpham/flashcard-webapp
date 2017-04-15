import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import EditableFlashcardSetHeader from './editable_components/editable_flashcard_set_header';
import EditableFlashcardList from './editable_components/editable_flashcard_list';
import NewFlashcardFields from './editable_components/new_flashcard_fields';
import EditableFlashcardSetTitleCard from './editable_components/flashcard_set_title_card';
import GameModeLinks from './mode/game_mode_links';
import { fetchFlashcardSetById } from '../../actions/index';
import { Divider } from 'semantic-ui-react';


class ViewAndUpdateSet extends Component {

  componentWillMount() {
    const flashcardsetId = this.props.params.flashcardsetId;
    this.props.fetchFlashcardSetById(flashcardsetId);
  }

  constructor(props) {
    super(props);
  }

  render() {
    const flashcardSet = this.props.flashcardSet;
    if (!flashcardSet) {
      return (<div>Loading Set...</div>);
    }
    const currentUserId = localStorage.getItem('userId');
    const flashcardSetId = this.props.params.flashcardsetId;
    const flashcardSetOwner = this.props.flashcardSet._creator;
    const ownerId = flashcardSetOwner._id;
    const editable = currentUserId === flashcardSetOwner._id;
    const {title, description, flashcards} = this.props.flashcardSet;
    return (
      <div>
		<EditableFlashcardSetTitleCard flashcardSetId={flashcardSetId}/>
		<EditableFlashcardSetHeader title={title} flashcardSetId={flashcardSetId} description={description} editable={editable} />
		<Divider section/>
		<EditableFlashcardList flashcards={flashcards} flashcardSetId={flashcardSetId} editable={editable} />
		<NewFlashcardFields flashcardSetId={flashcardSetId} editable={editable} flashcards={flashcards}/>
	  </div>
    );
  }
}


function mapStateToProps(state) {
  const flashcardSet = state.flashcard.flashcardSet;
  return {
    flashcardSet
  };
}

export default connect(mapStateToProps, {
  fetchFlashcardSetById
})(ViewAndUpdateSet);