import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Form, Button } from "semantic-ui-react";
import Desktop from "../implementations/Layout/Desktop";
import Paragraph from "../implementations/Layout/Paragraph";

export default function Signup() {
  return (
    <Desktop hideFooter activeItem="Signup">
      <SignupComponent />
    </Desktop>
  );
}

export class SignupComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      signupPassed: false,
      isLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  handleSubmit = async event => {
    this.setState({ isLoading: true });

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
    } finally {
      this.setState({ isLoading: false });
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
      <>
        {!signupPassed ? (
          <Paragraph headerText="We're really excited that you're joining!">
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

              <Button
                positive
                onClick={e => this.handleSubmit(e)}
                loading={this.state.isLoading}
              >
                Register
              </Button>
            </Form>
          </Paragraph>
        ) : (
          <Paragraph headerText="Thank you for chosing Sunrise Notes!">
            verification link has been sent to {email}
            <br />
            Please click the link to finish the registration process!
          </Paragraph>
        )}
      </>
    );
  }
}
