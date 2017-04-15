import React, { Component } from 'react';
import Header from './header';
import FlashMessagesList from './flash/flash_messages_list';
import { Container, Divider } from 'semantic-ui-react';

export default class App extends Component {
    render() {

        return (
            <div>
        <Header />
         <FlashMessagesList />
        <Divider hidden/>
        <Container className="website-body">
            {this.props.children}
           </Container>
      </div>
        );
    }
}
