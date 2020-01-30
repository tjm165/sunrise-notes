import React, { Component } from "react";
import { Auth } from "aws-amplify";
import {
  Form,
  Button,
  List,
  Message,
  Segment,
  Grid,
  Divider
} from "semantic-ui-react";
import Desktop from "../implementations/Layout/Desktop";
import Paragraph from "../implementations/Layout/Paragraph";
import { GoogleOAuthButton } from "../implementations/OAuth/Google";

function getActiveItem(login) {
  return login ? "Login" : "Signup";
}

function getHeaderString(login) {
  return login ? "Welcome Back!" : "We're Glad You're Joining Us!";
}

export default function AuthorizationPage({ login }) {
  return (
    <Desktop hideFooter activeItem={getActiveItem(login)}>
      <Paragraph headerText={getHeaderString(login)}>
        <SignComponent login={login} />
      </Paragraph>
    </Desktop>
  );
}

export function SignupComponent() {
  return <SignComponent />;
}

export function LoginComponent() {
  return <SignComponent login />;
}

function SignComponent({ login }) {
  <Segment placeholder>
    <Grid columns={2} relaxed="very" stackable>
      <Grid.Column>
        {login ? <LoginWithSunrise /> : <SignupWithSunrise />}
      </Grid.Column>

      <Grid.Column verticalAlign="middle">
        <GoogleOAuthButton />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>;
}

const LoginWithSunrise = props => {
  <Paragraph headerText="Sign In">
    {error && <Header as="h4">{error}</Header>}
    <Grid columns="equal">
      <Grid.Column>
        <Container>
          <Form>
            <Form.Input
              label="Email"
              placeholder="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Form.Input
              label="Enter Password"
              type="password"
              placeholder="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <Button positive onClick={e => handleSubmit(e)} loading={isLoading}>
              Sign in
            </Button>
          </Form>
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Container>
          <GoogleOAuthButton />
        </Container>
      </Grid.Column>
    </Grid>
  </Paragraph>;
};

class SignupWithSunrise extends Component {
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

  responseGoogle = async response => {
    this.setState({ isLoading: true });

    console.log(response);
  };

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
