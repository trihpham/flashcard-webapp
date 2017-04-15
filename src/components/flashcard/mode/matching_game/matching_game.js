import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMatchingCardList, chosenCard, startGame, startTimer, stopTimer, restartGame, endGame } from '../../../../actions/matching_game';
import classNames from 'classnames';
import { setUpMatchingGameMode } from '../../../../actions/index';
import { Button, Icon } from 'semantic-ui-react';

const FRONT_SIDE = 'FRONT_SIDE';
const BACK_SIDE = 'BACK_SIDE';

const GAME_STATE_NOT_STARTED = 'GAME_STATE_NOT_STARTED';
const GAME_STATE_STARTED = 'GAME_STATE_STARTED';
const GAME_STATE_FINISH = 'GAME_STATE_FINISH';

const CHOICE_RESULT_ONE_SELECTION = 'CHOICE_RESULT_ONE_SELECTION';
const CHOICE_RESULT_WRONG_SELECTIONS = 'CHOICE_RESULT_WRONG_SELECTIONS';
const CHOICE_RESULT_CORRECT_SELECTIONS = 'CHOICE_RESULT_CORRECT_SELECTIONS';

class MatchingGame extends Component {

  componentWillMount() {
    const flashcardSetId = this.props.params.flashcardsetId
    this.props.setUpMatchingGameMode(flashcardSetId);
  }

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      matchedList: [],
      gameState: GAME_STATE_NOT_STARTED,
      cardSelect: null,
      prevCardFirstSelect: null,
      prevCardSecondSelect: null,
      choiceResult: null
    };
  }



  renderCards() {
    const self = this;
    const array = this.state.list;
    const matchedList = this.state.matchedList;

    const {cardSelect, choiceResult} = this.state;

    return array.map((card, index) => {
      const disabledState = self.checkDisabledCard(index);
      const disabledStateCss = disabledState && !self.isOneOfPrevSelectedCard(card);
      const isSelectedCard = card === cardSelect;
      const wasCorrectGuess = self.isOneOfPrevSelectedCard(card) && choiceResult === CHOICE_RESULT_CORRECT_SELECTIONS;
      const wasWrongGuess = self.isOneOfPrevSelectedCard(card) && choiceResult === CHOICE_RESULT_WRONG_SELECTIONS;
      const className = classNames(
        'matching-game-card',
        {
          'selected-card': isSelectedCard,
          'wrong-card-guess': wasWrongGuess,
          'correct-card-guess': wasCorrectGuess,
          'disabled-state': disabledStateCss
        }

      );

      return (
        <div
        key={card.id + card.cardSide}
        data-card-id={card.id}
        onClick={disabledState ? null : () => {
          self.onSelectCard(card)
        }}
        className={className}>
						<div className="matching-game-text">{card.text}</div>
				</div>);
    });

  }

  onSelectCard(card) {
    const {cardSelect} = this.state;

    if (!cardSelect) {
      this.setState({
        cardSelect: card,
        prevCardFirstSelect: null,
        prevCardSecondSelect: null,
        choiceResult: CHOICE_RESULT_ONE_SELECTION
      });
    } else if (this.sameCard(cardSelect, card)) {
      this.setState({
        cardSelect: null
      });
    } else if (this.matchCard(cardSelect, card)) {
      this.onCardMatch(card.id);
      this.setState({
        cardSelect: null,
        prevCardFirstSelect: cardSelect,
        prevCardSecondSelect: card,
        choiceResult: CHOICE_RESULT_CORRECT_SELECTIONS
      });
    } else {
      this.setState({
        cardSelect: null,
        prevCardFirstSelect: cardSelect,
        prevCardSecondSelect: card,
        choiceResult: CHOICE_RESULT_WRONG_SELECTIONS
      });
    }

  }


  sameCard(card1, card2) {
    return (card1 === card2);
  }

  matchCard(card1, card2) {
    return (card1.id === card2.id && card1 !== card2);
  }

  onCardMatch(cardId) {
    const newMatchedList = this.state.matchedList.slice();
    const cardList = this.state.list;
    cardList.forEach((card, index) => {
      if (card.id === cardId) {
        newMatchedList[index] = true;
      }
    });
    if (this.isGameFinished(newMatchedList)) {
      this.endGame();
    } else {
      this.setState({
        matchedList: newMatchedList
      });
    }
  }


  isOneOfPrevSelectedCard(card) {
    const {prevCardFirstSelect, prevCardSecondSelect} = this.state;
    if (card === prevCardFirstSelect || card === prevCardSecondSelect) {
      return true;
    } else {
      return false;
    }
  }

  isGameFinished(matchedList) {
    return matchedList.every((match) => {
      return match === true;
    });
  }

  checkDisabledCard(index) {
    return this.state.matchedList[index] === true;
  }

  checkAlreadySelectedCard(card) {
    const {firstSelect} = this.props;
    if (!firstSelect) {
      return false;
    }
    if (card.id === firstSelect.id && card.cardSide === firstSelect.cardSide) {
      return true;
    } else {
      return false;
    }
  }


  startGame() {
    this.setState({
      gameState: GAME_STATE_STARTED
    });
    this.props.startTimer();
  }

  endGame() {
    this.setState(
      {
        cardSelect: null,
        prevCardFirstSelect: null,
        prevCardSecondSelect: null,
        choiceResult: null,
        gameState: GAME_STATE_FINISH
      });
    this.props.stopTimer();
  }

  restartGame() {
    this.props.restartGame();
    this.setState({
      gameState: GAME_STATE_STARTED
    });
  }


  render() {
    const {gameState} = this.state;
    const {elapsedTime} = this.props;
    if (gameState === GAME_STATE_NOT_STARTED) {
      return (<Button icon={<Icon name="play" />} color="green" labelPosition='left' content="Start Game" onClick={this.startGame.bind(this)}/>);
    } else if (gameState === GAME_STATE_STARTED) {
      return (
        <div>
						<div>{elapsedTime}</div>
						<div className="matching-game-container">{this.renderCards()}</div>
				</div>
      );
    } else if (gameState === GAME_STATE_FINISH) {
      return (
        <div>
						<div>Your total time is {elapsedTime} seconds!</div>	
									<div className="matching-game-container">{this.renderCards()}</div>				
							<Button icon={<Icon name="undo" />} labelPosition='left' content="Restart Game" color="green" onClick={this.restartGame.bind(this)} />		
				</div>);
    }
  }



  componentWillReceiveProps(nextProps) {
    const {list, matchedList, gameState} = nextProps;
    if (list !== this.state.list) {
      this.setState({
        list,
        matchedList
      });
    }
  }

  componentWillUnmount() {
    //end games prematurely requires clock to shut down
    this.props.stopTimer();
  }


}

function mapStateToProps(state) {
  const {list, matchedList, elapsedTime} = state.matchingGame;
  return {
    list,
    matchedList,
    elapsedTime
  };
}

export default connect(mapStateToProps, {
  getMatchingCardList,
  chosenCard,
  startGame,
  setUpMatchingGameMode,
  startTimer,
  stopTimer,
  restartGame
})(MatchingGame);
