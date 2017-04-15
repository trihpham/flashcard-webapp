import React, { Component } from 'react';
import { Input, Icon, Divider, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        };

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSearch = this.onHandleSearch.bind(this);
    }

    render() {
        return (
            <div>
      <Divider hidden/>
      <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide">
          <Input onChange={this.onHandleChange} action={
            <Button icon onClick={this.onHandleSearch}>
                <Icon name='search'/>
            </Button>
            } placeholder='Search...'
            />
        </div>
        </div>
    <Divider hidden/>
   </div>
        );
    }

    onHandleChange(event) {
        this.setState({
            searchTerm: event.target.value || ''
        });
    }
    onHandleSearch() {
        const searchTerm = this.state.searchTerm;
        this.props.fetchFunction({
            searchTerm
        });
    }

}