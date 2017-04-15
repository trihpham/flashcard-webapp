import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashMesage from './flash_message';
import { deleteFlashMessage } from  '../../actions/flash_messages';

class FlashMessagesList extends Component {
	constructor(props){
		super(props);
	}
	render(){
		const messages = this.props.messages.map(message =>
			<FlashMesage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage}/>
		);
		return(
			<div>
				{messages}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		messages: state.flashMessages
	};
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);