import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router';
import { deleteFlashcardSet } from '../../../actions/index';
import { connect } from 'react-redux';
class FlashcardSetTitleCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleting: false
    };
    this.onHandleDelete = this.onHandleDelete.bind(this);
  }

  render() {
    const {name, flashcardSetId, editable, ownerId} = this.props;
    const link = `/flashcardsets/${flashcardSetId}/edit`;
    const ownerLink = `/user/${ownerId}/flashcardsets`;
    const metaTitle = editable ?
      <span>You created this</span> :
      <span>Created by <Link to={ownerLink}>{name}</Link></span>;
    const {isDeleting} = this.state;
    return (
      <Card fluid>
			<Card.Content>
			    <Card.Header>Flashcard Set</Card.Header>
			    <Card.Meta>{metaTitle}</Card.Meta>
			</Card.Content>
			{editable ?
        <Card.Content extra>
			    <Button as={Link} to={link} icon="edit" content='Edit' color="blue"/>
			    <Button icon="trash" loading={isDeleting} content='Delete'color="red" onClick={this.onHandleDelete}/>
			</Card.Content>
        : ''
      }
 		</Card>
    );
  }

  onHandleDelete() {
    const self = this;
    const {flashcardSetId} = this.props;
    this.setState({
      isDeleting: true
    }, () => {
      self.props.deleteFlashcardSet(flashcardSetId);
    }
    );
  }

}

export default connect(null, {
  deleteFlashcardSet
})(FlashcardSetTitleCard);



