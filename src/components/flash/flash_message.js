import React, { Component } from 'react';
import classnames from 'classnames';
import { Message } from 'semantic-ui-react';
class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render() {
        const {id, type, text} = this.props.message;
        const success = type === 'success';
        const negative = type === 'negative';
        const headerMessage = success ? "Success!" : "Error!";

        return (
            <Message
            success={success}
            negative={negative}
            onDismiss={this.onClick}
            header={headerMessage}
            content={text}
            />
        );
    }

}

export default FlashMessage;