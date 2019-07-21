import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Form, Button, Header } from "semantic-ui-react";
import Desktop from "../implementations/Layout/Desktop";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      signupPassed: false
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
      this.setState({ signupPassed: true });
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
    const { signupPassed, email, password, confirmPassword } = this.state;
    const passwordError =
      password.length === 0 || password === confirmPassword
        ? false
        : { content: "Passwords do not match" };

    return (
      <Desktop hideFooter activeItem="Signup">
        {!signupPassed ? (
          <>
            <Header as="h2">We're really excited that you're joining!</Header>
            <Form>
              <Form.Input
                label="Email"
                placeholder="Email"
                value={email}
                onChange={event => this.setEmail(event.target.value)}
              />
              <Form.Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={event => this.setPassword(event.target.value)}
              />
              <Form.Input
                error={passwordError}
                label="Confirm password"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={event => this.setConfirmPassword(event.target.value)}
              />

              <Button positive onClick={e => this.handleSubmit(e)}>
                Register
              </Button>
            </Form>
          </>
        ) : (
          <div>
            <Header as="h1">Thank you for chosing Sunrise Notes!</Header>A
            verification link has been sent to {email}
            <br />
            Please click the link to finish the registration process!
          </div>
        )}
      </Desktop>
    );
  }
}

export default Signup;
