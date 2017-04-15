import React, { Component } from 'react';
import { Menu, Segment, Button, Divider } from 'semantic-ui-react';
import SearchBar from './search_bar';
import Paginate from './paginate';
import FlashcardSetList from './flashcard/flashcard_set_list';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchFlashcardSets } from '../actions/index';

class IndexSetSearch extends Component {

  componentWillMount() {
    this.props.fetchFlashcardSets({});
  }
  render() {
    const self = this;
    const fetchFunction = ({offset, limit, searchTerm}) => {
      const defaultValues = {
        offset: 0,
        limit: 10
      };
      self.props.fetchFlashcardSets({
        ...defaultValues,
        offset,
        limit,
        searchTerm
      });
    };
    const {offset, limit, count, flashcardSetList} = this.props;

    return (
      <div>
			<SearchBar fetchFunction={fetchFunction}/>
			{`${count} results found`}
			<FlashcardSetList flashcardSetList={flashcardSetList}/>
			<Divider hidden/>
			<Paginate fetchFunction={fetchFunction} offset={offset} count={count} limit={limit}/>	
	</div>
    );
  }
}

function mapStateToProps(state) {
  const {offset, count, limit, flashcardSetList} = state.flashcard;
  return {
    offset,
    count,
    limit,
    flashcardSetList
  };
}


export default connect(mapStateToProps, {
  fetchFlashcardSets
})(IndexSetSearch);