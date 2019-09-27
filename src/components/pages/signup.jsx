import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Form, Button, List, Message } from "semantic-ui-react";
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

    this.check = { name: "check", color: "green" };
    this.x = { name: "minus" };
  }

  handleSubmit = async event => {
    this.setState({ isLoading: true });

    event.preventDefault();
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
    const doPasswordsMatch = password === confirmPassword;
    const passwordHasNumber = /\d/.test(password);
    const passwordIsMinLength = password.length >= 8;
    const error =
      !passwordHasNumber || !passwordIsMinLength || !doPasswordsMatch;

    return (
      <>
        {!signupPassed ? (
          <Paragraph headerText="We're so excited that you're signing up!">
            <Form error={error}>
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
                label="Confirm password"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={event => this.setConfirmPassword(event.target.value)}
              />

              {error && (
                <Message>
                  <List>
                    Passwords must:
                    <List.Item
                      icon={
                        password.length > 0 && doPasswordsMatch
                          ? this.check
                          : this.x
                      }
                      content="Match"
                    />
                    <List.Item
                      icon={passwordIsMinLength ? this.check : this.x}
                      content="Be at least 8 characters"
                    />
                    <List.Item
                      icon={passwordHasNumber ? this.check : this.x}
                      content="Contain a number"
                    />
                  </List>
                </Message>
              )}

              <Button
                positive
                onClick={e => this.handleSubmit(e)}
                loading={this.state.isLoading}
                disabled={error}
              >
                Register
              </Button>
            </Form>
          </Paragraph>
        ) : (
          <Paragraph headerText="Welcome!">
            You have successfully registered a new account.
            <br />
            We've sent you an email. Please click the link to verify your
            account.
          </Paragraph>
        )}
      </>
    );
  }
}
