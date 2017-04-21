import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router';
export default class EditableFlashcardSetTitleCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, flashcardSetId, title} = this.props;
        const link = `/flashcardsets/${flashcardSetId}`;
        return (
            <Card fluid>
			    <Card.Content>
			      <Card.Header>{title}</Card.Header>
			      <Card.Meta>You created this</Card.Meta>

			    </Card.Content>
			    <Card.Content extra>
			      <Button as={Link} to={link} icon="arrow left" content="View" color="green"/>
			    </Card.Content>
 			 </Card>);
    }

}


