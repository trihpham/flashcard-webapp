import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const UserFlashcardSetListHeader = (props) => {
  const user = props.isLoggedInUser ? 'My' : 'User';
  const ownerName = props.ownerName;
  const flashcardSetCount = props.flashcardSetCount;
  return (
    <Card fluid>
     <Card.Content>
      <Card.Header>
        {user} Flashcard Sets
      </Card.Header>
    </Card.Content>

    <Card.Content>
      <Card.Header>
        {ownerName}
      </Card.Header>
      <Card.Meta>
        <span>
           {flashcardSetCount} Flashcard Sets
        </span>
      </Card.Meta>
    </Card.Content>
  </Card>
  );
};

export default UserFlashcardSetListHeader;