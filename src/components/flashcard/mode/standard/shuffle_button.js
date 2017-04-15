import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { shuffleList } from '../../../../actions/standard';

class ShuffleButton extends Component {

  render() {
    return (
      <Button color="yellow" onClick={this.onHandleClick.bind(this)}>
					<Icon name="shuffle"/>
						Shuffle
				</Button>
    );
  }

  onHandleClick() {
    this.props.shuffleList();
  }
}


export default connect(null, {
  shuffleList
})(ShuffleButton);