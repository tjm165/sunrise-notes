import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Form, Button, Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
      const user = await Auth.signIn(username, password);
      console.log(user);

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

  render() {
    return (
      <>
        <Header as="h2">Sign in</Header>
        <Form>
          <Form.Input
            label="Email"
            placeholder="email"
            value={this.state.email}
            onChange={event => this.setEmail(event.target.value)}
          />
          <Form.Input
            label="Enter Password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={event => this.setPassword(event.target.value)}
          />
          <Button onClick={e => this.handleSubmit(e)}>Sign in</Button>
        </Form>
      </>
    );
  }
}

export default withRouter(Signin);
