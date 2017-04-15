import React, { Component } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home'
        };

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    renderLinks() {
        if (this.props.authenticated) {
            return (<li className="nav-item">
        <Link className="nav-link" to="/signout">Sign Out</Link>
      </li>);
        } else {

            return [
                <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signin">Log In</Link>
      </li>,
                <li className="nav-item" key={2}>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>
            ];
        }
    }

    handleItemClick(e, {name}) {
        this.setState({
            activeItem: name
        })
    }
    handleButtonClick() {
        this.setState({
            activeItem: 'home'
        });
    }

    renderAuthenticatedUserHeader() {
        const activeItem = this.state.activeItem;
        return (
            <Menu size="large" >
      <Menu.Item name='home' as={Link} to="/" active={activeItem === 'home'} onClick={this.handleItemClick} />
      <Menu.Item name='search' as={Link} to="/search" active={activeItem === 'search'} onClick={this.handleItemClick} />
      <Menu.Item name='create set' as={Link} to="/create" active={activeItem === 'create set'} onClick={this.handleItemClick} />
      <Menu.Item name='my sets' as={Link} to="/mySets" active={activeItem === 'my sets'} onClick={this.handleItemClick} />

      <Menu.Menu position='right'>
         <Menu.Item>
              <Button as={Link} to="/signout" primary>Log out</Button>
               </Menu.Item>
      </Menu.Menu>
    </Menu>
        );
    }

    renderNonUserHeader() {
        const activeItem = this.state.activeItem;
        return (<div>
          <Menu size="large" >
              <Menu.Item name='home' as={Link} to="/home" active={activeItem === 'home'} onClick={this.handleItemClick} />
              <Menu.Item name='search' as={Link} to="/search" active={activeItem === 'search'} onClick={this.handleItemClick} />

              <Menu.Menu position='right'>
             <Menu.Item>
                <Button primary as={Link} to="/signup">Sign up</Button>
             </Menu.Item>
             <Menu.Item>
              <Button as={Link} to="/signin" onClick={this.handleButtonClick}>Log in</Button>
             </Menu.Item>
              </Menu.Menu>
          </Menu>
      </div>
        );
    }

    render() {
        const authenticated = this.props.authenticated;
        let flashcardNavigation = '';
        const activeItem = this.state.activeItem;
        if (authenticated) {

            return (
                <div>
      {this.renderAuthenticatedUserHeader()}
    </div>
            );
        } else {
            return (
                <div>
      {this.renderNonUserHeader()}
    </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);

