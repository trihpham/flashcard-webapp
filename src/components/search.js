import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlashcardSetsByUser } from '../../actions/index';
import { Link } from 'react-router';

class FlashcardSetListSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  render() {
    const fetchFunction = this.props.fetchFunction;
    return (
      <div>
			<SearchBar />
			<FlashcardSetList flashcardSetList={flashcardSetList}/>	
	</div>
    );
  }

  componentWillMount() {
    this.props.refreshSearch();
  }

}



export default connect(mapStateToProps, {
  fetchFlashcardSetsByUser
})(FlashcardSetListSearch);