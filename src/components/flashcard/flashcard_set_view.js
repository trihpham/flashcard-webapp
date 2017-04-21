import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import FlashcardList from './view_components/flashcard_list';
import FlashcardSetHeader from './view_components/flashcard_set_header';
import FlashcardSetTitleCard from './view_components/flashcard_set_title_card';


import GameModeLinks from './mode/game_mode_links';
import { fetchFlashcardSetById } from '../../actions/index';
import { Divider } from 'semantic-ui-react';

class FlashcardSetView extends Component {

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
        const editable = currentUserId === flashcardSetOwner._id;
        const ownerId = flashcardSetOwner._id;
        const name = flashcardSetOwner.name;

        const {title, description, flashcards} = this.props.flashcardSet;
        return (
            <div>
    <FlashcardSetTitleCard title={title} flashcardSetId={flashcardSetId} editable={editable} name={name} ownerId={ownerId}/>
    <Divider hidden/>
    <FlashcardSetHeader title={title} description={description}/>
    <Divider hidden/>
    <FlashcardList flashcards={flashcards}/>
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
})(FlashcardSetView);