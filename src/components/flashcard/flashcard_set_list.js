import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchFlashcardSetsByUser } from '../../actions/index';
import { Link } from 'react-router';
import TagList from './view_components/tag_list';

class FlashcardSetList extends Component {

    constructor(props) {
        super(props);
        this.renderflashcardSet = this.renderflashcardSet.bind(this);
    }

    render() {
        const flashcardSetList = this.props.flashcardSetList;
        if (!flashcardSetList || flashcardSetList.length === 0) {
            return (<div>No flashcards here</div>);
        } else {
            return (
                <div>
      {this.renderflashcardSets()}
    </div>
            );
        }
    }

    renderflashcardSet(flashcardSet) {
        const {title, description, tags} = flashcardSet;
        const link = "/flashcardsets/" + flashcardSet._id;
        const flashcardsCount = flashcardSet.flashcards.length;
        const ownerName = flashcardSet._creator.name;
        const ownerId = flashcardSet._creator._id;
        const isOwner = localStorage.getItem("userId") === ownerId;

        const ownerMessage = isOwner ? "You created this" : ownerName;
        const ownerLink = isOwner ? '/mySets' : `/user/${ownerId}/flashcardsets`;

        const userContent = this.props.isUserSet ? '' :
            <Card.Content extra>
              <Link to={ownerLink}>
                  <Icon name='user' />
                  {ownerMessage}
              </Link>    
            </Card.Content>;
        return (
            <Card.Group key={flashcardSet._id}>
      <Card fluid color='red' header='Option 1'>
        <Card.Content>
          <Card.Header><Link className="nav-link" to={link}>{title}</Link></Card.Header>
          <Card.Meta>{flashcardsCount} Flashcards</Card.Meta>
          <Card.Description>{description}</Card.Description>
         <TagList tags={tags} />
         </Card.Content> 
         {userContent}
     
          
          
      </Card>
    </Card.Group>
        );
    }

    renderflashcardSets() {
        const list = this.props.flashcardSetList;
        return list.map((flashcardSet) => {
            return this.renderflashcardSet(flashcardSet);
        });
    }

}


export default connect(null, {
    fetchFlashcardSetsByUser
})(FlashcardSetList);