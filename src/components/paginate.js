import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Paginate extends Component {

  constructor(props) {
    super(props);

    this.onHandleLeftArrowClick = this.onHandleLeftArrowClick.bind(this);
    this.onHandleRightArrowClick = this.onHandleRightArrowClick.bind(this);
  }

  render() {
    const count = this.props.count;
    const limit = this.props.limit;
    const currentPage = this.getCurrentPage();
    const leftArrowDisabled = currentPage === 1;
    const rightArrowDisabled = count / limit <= currentPage;
    return (
      <div className="ui one column stackable center aligned page grid">
			<div className="column twelve wide">
				<Button.Group>
				    <Button content='Prev' icon='left arrow' labelPosition='left' disabled={leftArrowDisabled} onClick={this.onHandleLeftArrowClick}  />
				    <Button>{currentPage}</Button>
					<Button content='Next' icon='right arrow' labelPosition='right' disabled={rightArrowDisabled} onClick={this.onHandleRightArrowClick} />
  				</Button.Group>
  			</div>
	  </div>
    );
  }



  onHandleLeftArrowClick() {
    const currentPage = this.getCurrentPage();
    const limit = this.props.limit;
    this.props.fetchFunction({
      limit: 10,
      offset: (limit * (currentPage - 2))
    });
  }
  onHandleRightArrowClick() {
    const currentPage = this.getCurrentPage();
    const limit = this.props.limit;
    this.props.fetchFunction({
      limit: 10,
      offset: (limit * (currentPage))
    });
  }

  getCurrentPage() {
    const count = this.props.count;
    const limit = this.props.limit;
    const offset = this.props.offset;
    const currentPage = Math.floor((offset) / (limit)) + 1;
    return currentPage;
  }
}


export default Paginate;