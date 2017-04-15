import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';
class FlashcardProgress extends Component {
  render() {

    return (<div className="ui one column stackable center aligned page grid">
			  	<div className="column twelve wide">
			  		<Progress value={this.props.position + 1} total={this.props.flashcards.length} progress='ratio' />
				</div>
			</div>);
  }
}

function mapStateToProps(state) {
  return {
    flashcards: state.standard.list,
    position: state.standard.position
  };
}
export default connect(mapStateToProps)(FlashcardProgress);