import React, { Component } from 'react';
import { changeCard } from '../../../../actions/standard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Progress } from 'semantic-ui-react';

class PrevNextButtons extends Component {
  onPrevClick() {
    this.props.changeCard(-1);
  }
  onNextClick() {
    this.props.changeCard(1);
  }
  render() {
    const prevDisabled = this.props.position === 0 || this.props.flashcards.length === 0;
    const nextDisabled = this.props.position === this.props.flashcards.length - 1;
    return (<div className="ui one column stackable center aligned page grid">
			  	<div className="column twelve wide">				    
				  	<Button content='Prev' disabled={prevDisabled} icon='left arrow' labelPosition='left' onClick={this.onPrevClick.bind(this)}/>
	    			<Button content='Next' disabled={nextDisabled} icon='right arrow' labelPosition='right' onClick={this.onNextClick.bind(this)}/>
    			</div>
			</div>);
  }
}

function mapStateToProps(state) {
  return {
    flashcards: state.standard.list,
    position: state.standard.position
  }
}

export default connect(mapStateToProps, {
  changeCard
})(PrevNextButtons);