import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlashcardSet } from '../../actions/index';

class FlashcardSet extends Component {

  constructor(props) {
    super(props);

    this.renderflashcard = this.renderflashcard.bind(this);
  }

  render() {
    if (this.props.flashcardSet === null) {
      return (<div>sadasd</div>);
    }
    const {title, description} = this.props.flashcardSet;

    return (<div>
				{title}
				{description}
				{this.renderflashcards()}
			</div>
    );
  }

  renderflashcard(flashcard) {
    const {term, definition} = flashcard;
    return (
      <div>
			<div>Term:{term}</div>
			<div>Definition:{definition}</div>
		</div>
    );
  }

  renderflashcards() {

    const flashcardList = this.props.flashcardSet.flashcards;
    return flashcardList.map((flashcard) => {
      return this.renderflashcard(flashcard);
    });
  }
}


function mapStateToProps(state) {
  const flashcardSet = state.flashcard.flashcardSet;
  return {
    flashcardSet
  };
}

export default connect(mapStateToProps, {
  fetchFlashcardSet
})(FlashcardSet);