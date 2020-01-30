import React, { Component, useState } from "react";
import { signin } from "../../API";

import { Auth } from "aws-amplify";
import {
  Form,
  Button,
  List,
  Message,
  Segment,
  Grid,
  Divider,
  Header,
  Container
} from "semantic-ui-react";
import Desktop from "../implementations/Layout/Desktop";
import Paragraph from "../implementations/Layout/Paragraph";
import { GoogleOAuthButton } from "../implementations/OAuth/Google";
import { withRouter } from "react-router-dom";

function getActiveItem(login) {
  return login ? "Login" : "Signup";
}

function getHeaderString(login) {
  return login ? "Welcome Back!" : "We're Glad To Have You Joining Us!";
}

function AuthorizationPage({ login, horizontal, ...rest }) {
  return (
    <Desktop hideFooter activeItem={getActiveItem(login)}>
      <Paragraph headerText={getHeaderString(login)}>
        <SignComponent login={login} horizontal={horizontal} {...rest} />
      </Paragraph>
    </Desktop>
  );
}

export default withRouter(AuthorizationPage);

export function SignupComponent(props) {
  return <SignComponent {...props} />;
}

export function LoginComponent(props) {
  return <SignComponent login {...props} />;
}

function SignComponent({ login, horizontal, ...rest }) {
  const numColumns = horizontal ? 1 : 2;

  return (
    <Segment placeholder>
      <Grid columns={numColumns} relaxed="very" stackable>
        <Grid.Column>
          {login ? (
            <LoginWithSunrise {...rest} />
          ) : (
            <SignupWithSunrise {...rest} />
          )}
          {horizontal && (
            <Divider horizontal={horizontal} vertical={!horizontal}>
              Or
            </Divider>
          )}
        </Grid.Column>

        {!horizontal && (
          <Grid.Column verticalAlign="middle">
            <GoogleOAuthButton />
          </Grid.Column>
        )}
      </Grid>

      {horizontal ? (
        <Grid.Column verticalAlign="middle">
          <GoogleOAuthButton />
        </Grid.Column>
      ) : (
        <Divider horizontal={horizontal} vertical={!horizontal}>
          Or
        </Divider>
      )}
    </Segment>
  );
}

const LoginWithSunrise = props => {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = event => {
    setLoading(true);

    event.preventDefault();
    console.log("hey");

    signin(email, password)
      .then(user => {
        document.cookie = `idToken=${user.signInUserSession.idToken.jwtToken}`;
        props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Paragraph headerText="Sign In" textAlign="center">
      {error && <Header as="h4">{error}</Header>}
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
    </Paragraph>
  );
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
          <Paragraph headerText="Sign Up" textAlign="center">
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
                      icon={passwordIsMinLength ? this.check : this.x}
                      content="Be at least 8 characters"
                    />
                    <List.Item
                      icon={passwordHasNumber ? this.check : this.x}
                      content="Contain a number"
                    />
                  </List>
                  <List.Item
                    icon={
                      password.length > 0 && doPasswordsMatch
                        ? this.check
                        : this.x
                    }
                    content="Match"
                  />
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
