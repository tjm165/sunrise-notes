import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Form, Button, Header } from "semantic-ui-react";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log("hey");
    const { email, password } = this.state;
    const username = email;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      console.log(signUpResponse);
      this.props.history.push("/dashboard");
    } catch (error) {
      console.log(error); //more info in part 2 at 8:15
    }
  };

  setEmail(email) {
    this.setState({ email });
  }

  setPassword(password) {
    this.setState({ password });
  }

  setConfirmPassword(confirmPassword) {
    this.setState({ confirmPassword });
  }

  render() {
    return (
      <>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Input
            label="Email"
            placeholder="email"
            value={this.state.email}
            onChange={event => this.setEmail(event.target.value)}
          />
          <Form.Input
            label="Create a Password"
            type="password"
            placeholder="Create a Password"
            value={this.state.password}
            onChange={event => this.setPassword(event.target.value)}
          />
          Password rules:
          <Form.Input
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            onChange={event => this.setConfirmPassword(event.target.value)}
          />
          {this.state.password === this.state.confirmPassword
            ? "passwords match"
            : "passwords do not match"}
          <Button onClick={e => this.handleSubmit(e)}>Register</Button>
        </Form>
      </>
    );
  }
}

export default Signin;
