import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';
export default (props) => {
  const flashcardSetId = props.params.flashcardsetId;
  const standardModeLink = `/flashcardsets/${flashcardSetId}/standard`;
  const quizModeLink = `/flashcardsets/${flashcardSetId}/quiz`;
  const MatchingModeLink = `/flashcardsets/${flashcardSetId}/matching`;
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
	</Menu>
  );

}