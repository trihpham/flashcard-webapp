import React, { Component } from 'react';
import { connect } from 'react-redux';
import Flashcard from './flashcard';
import PrevNextButtons from './prev_next_buttons';
import FlashcardProgress from './flashcard_progress';
import { Divider, Container } from 'semantic-ui-react';
import ShuffleButton from './shuffle_button';
export default class FlashcardLearningGame extends Component {


  render() {
    const flashcardSetId = this.props.params.flashcardsetId;
    return (<div>
				<Container>
				<FlashcardProgress />
				<Flashcard flashcardSetId={flashcardSetId}/>
				</Container>
				<Divider clearing hidden/>
				<PrevNextButtons />
				<Divider clearing hidden/>
				<Divider clearing hidden/>
				<ShuffleButton />
			</div>);
  }
}