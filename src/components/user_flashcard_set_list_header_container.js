import React, { Component } from 'react';
import axios from 'axios';
import { ROOT_URL } from '../actions/index';
import UserFlashcardSetListHeader from './user_flashcard_set_list_header';
export default class UserFlashcardSetListHeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcardSetCount: 0,
      ownerName: '',
      isLoggedInUser: false
    };
  }

  componentWillMount() {
    const userId = this.props.userId;
    const isLoggedInUser = userId === localStorage.getItem('userId');
    const self = this;
    axios.get(`${ROOT_URL}/user/${userId}`).then((response) => {
      const {name, flashcardSetCount} = response.data;
      self.setState({
        ownerName: name,
        flashcardSetCount,
        isLoggedInUser
      });
    });
  }

  render() {
    const {flashcardSetCount, ownerName, isLoggedInUser} = this.state;
    return (<UserFlashcardSetListHeader flashcardSetCount={flashcardSetCount} ownerName={ownerName} isLoggedInUser={isLoggedInUser}/>);
  }
}