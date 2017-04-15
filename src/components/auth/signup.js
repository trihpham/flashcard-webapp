import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/authentication';
import { connect } from 'react-redux';
import { Message, Form, Button } from 'semantic-ui-react';

const renderField = ({input, label, type, meta: {touched, error}}) => (

  <Form.Field>
		<label>{label}</label>
		<input {...input} placeholder={label} type={type} />
			{touched && error &&
  <Message Warning>
				<Message.Header>Hint</Message.Header>
				<p>{error}</p>
			</Message>
  }
	</Form.Field>
);


class Signup extends Component {


  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (<Message negative>
				<Message.Header>Oops there was a problem!</Message.Header>
				<p>{this.props.errorMessage}</p>
			</Message>);
    }
  }

  render() {
    const {handleSubmit, email, password, firstName, lastName, passwordConfirm, error} = this.props;
    return (

      <Form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<Field name="firstName" component={renderField} type="text" label="First Name"  />
				<Field name="lastName" component={renderField} type="text" label="Last Name"  />
				<Field name="email" component={renderField} type="email" label="Email"  />
				<Field name="password" component={renderField} type="password" label="Password"  />
				<Field name="passwordConfirm" component={renderField} type="password" label="Password Confirmation"  />

			    {this.renderAlert()}
			    <Button type='submit'>Submit</Button>
			  </Form>


    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Password must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

const SignupForm = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default connect(mapStateToProps, actions)(SignupForm);


