import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameModeLinks from './mode/game_mode_links';

export default class FlashcardSetPageContainer extends Component {
  render() {
    return (
      <div>
			<GameModeLinks params={this.props.params}/>
			{this.props.children}
	</div>
    );
  }
}