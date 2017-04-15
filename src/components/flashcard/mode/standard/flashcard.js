import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flipCard } from '../../../../actions/standard';
import { setUpStandardMode } from '../../../../actions/index';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { Icon } from 'semantic-ui-react';
class Flashcard extends Component {

    componentWillMount() {
        const flashcardSetId = this.props.flashcardSetId;
        this.props.setUpStandardMode(flashcardSetId);
    }

    onFlashcardClick() {
        this.props.flipCard();
    }


    render() {
        if (this.props.flashcards.length === 0) {
            return (<div>Loading...</div>);
        }
        const flashcards = this.props.flashcards;
        const position = this.props.position;
        const flashcard = flashcards[position];
        const cardFlipped = this.props.cardFlipped;

        const shownFlashcardText = this.props.cardFlipped ? flashcard.term : flashcard.definition;
        return (
            <div className="layered-paper">
      <ReactCSSTransitionReplace
            transitionName="example"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
        <div key={position + flashcard.term + flashcard.definition} className="container flashcard-container" onClick={this.onFlashcardClick.bind(this)}>
            <div key={position} className={`cardx  ${cardFlipped ? 'flip' : '' }`}>
              <div className="photo-desc side-a">
                <p>{flashcard.term}</p>
                <Icon name="undo" className="flashcard-flip-icon"  flipped="horizontally"/>
            </div>
            <div className="photo-desc side-b">
                <p>{flashcard.definition}</p>
                <Icon name="undo" className="flashcard-flip-icon"  />
            </div>
          </div>
        </div>
      </ReactCSSTransitionReplace>
    </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        flashcards: state.standard.list,
        position: state.standard.position,
        cardFlipped: state.standard.cardFlipped
    };
}


export default connect(mapStateToProps, {
    flipCard,
    setUpStandardMode
})(Flashcard);
