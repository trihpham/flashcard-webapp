import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
class GameModeLinks extends Component {
    render() {
        const {flashcardSet} = this.props;
        const flashcardSetId = this.props.params.flashcardsetId;
        const standardModeLink = `/flashcardsets/${flashcardSetId}/standard`;
        const quizModeLink = `/flashcardsets/${flashcardSetId}/quiz`;
        const MatchingModeLink = `/flashcardsets/${flashcardSetId}/matching`;
        const FlashcardSetLink = `/flashcardsets/${flashcardSetId}`;
        let title = flashcardSet ? flashcardSet.title : null;
        title = title && title.length > 28 ? (title.substring(0, 25) + '...') : title;
        const activeItem = null;
        return (
            <Menu icon='labeled'>  
		<Menu.Item name='student' as={Link} to={standardModeLink} active={activeItem === 'student'} >
			<Icon name='student' />
			Study Flashcards
		</Menu.Item>
				        
		<Menu.Item name='clone' as={Link} to={MatchingModeLink} active={activeItem === 'clone'} >
			<Icon name='clone' />
			 Matching Game
		</Menu.Item>

		<Menu.Item name='write' as={Link} to={quizModeLink}  active={activeItem === 'write'} >
			<Icon name='write' />
			Practice Test
		</Menu.Item>
    	<Menu.Menu position='right'>
			<Menu.Item name='write' as={Link} to={FlashcardSetLink}  active={activeItem === 'image'} >
				<Icon name='image' />
				<span><b>{title}</b></span>
			</Menu.Item>
		</Menu.Menu>
	</Menu>
        );

    }

}

function mapStateToProps(state) {
    const flashcardSet = state.flashcard.flashcardSet;
    return {
        flashcardSet
    };
}

export default connect(mapStateToProps)(GameModeLinks);