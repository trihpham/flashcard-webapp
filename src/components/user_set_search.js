import React, { Component } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react';
import SearchBar from './search_bar';
import FlashcardSetList from './flashcard/flashcard_set_list';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchFlashcardSetsByUser } from '../actions/index';
import UserFlashcardSetListHeaderContainer from './user_flashcard_set_list_header_container';
//uses clientside searching after taking in all user flashcardSets
class UserSetSearch extends Component {

    componentWillMount() {
        const userId = this.props.params.userId || localStorage.getItem('userId');
        this.props.fetchFlashcardSetsByUser({
            userId
        });
    }

    render() {
        const userId = this.props.params.userId || localStorage.getItem('userId');
        const isOwner = localStorage.getItem('userId') === this.props.params.userId;
        const self = this;
        const fetchFunction = ({searchTerm}) => {
            const defaultValues = {
                userId
            };
            self.props.fetchFlashcardSetsByUser({
                ...defaultValues,
                searchTerm
            });
        };
        const flashcardSetList = this.props.flashcardSetList;
        const count = flashcardSetList.length;
        return (<div>

        <UserFlashcardSetListHeaderContainer userId={userId} />
        <SearchBar fetchFunction={fetchFunction}/>
        {`${count} results`}
        <FlashcardSetList flashcardSetList={flashcardSetList} isUserSet={true}/>
    </div>);
    }
}


function mapStateToProps(state) {
    const {flashcardSetList} = state.flashcard;
    return {
        flashcardSetList
    };
}

export default connect(mapStateToProps, {
    fetchFlashcardSetsByUser
})(UserSetSearch);