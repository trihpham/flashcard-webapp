import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions/authentication';
import { Message, Form, Button } from 'semantic-ui-react';

class Signin extends Component {

    handleFormSubmit({email, password}) {
        this.props.signinUser({
            email,
            password
        });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <Message negative>
          <Message.Header>Oops there was a problem!</Message.Header>
          <p>{this.props.errorMessage}</p>
        </Message>);
        }
    }
    render() {
        const {handleSubmit} = this.props;

        return (


            <Form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Form.Field>
            <label>Email</label>
             <Field name="email" component="input" type="email"/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
                         <Field name="password" component="input" type="password"/>
          </Form.Field>
          {this.renderAlert()}
          <Button type='submit'>Submit</Button>
        </Form>


        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

const SigninForm = reduxForm({
    form: 'signin'
})(Signin);

export default connect(mapStateToProps, {
    signinUser
})(SigninForm);

