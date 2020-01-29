import React, { useState } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { signin, googleSignIn } from "../../API";
import Desktop from "../implementations/Layout/Desktop";
import { withRouter } from "react-router-dom";
import Paragraph from "../implementations/Layout/Paragraph";
import OAuthButton from "../implementations/OAuth/OAuthButton";
import Amplify, { Auth, Hub } from "aws-amplify";

const Login = props => {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const responseGoogle = response => {
    console.log(response);
  };

  const handleGoogleSubmit = () => {
    setLoading(true);

    console.log("hey google");

    googleSignIn()
      .then(user => {
        document.cookie = `idToken=${user.signInUserSession.idToken.jwtToken}`;
        props.history.push("/googlepostsignin");
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

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
    <Desktop hideFooter activeItem="Login">
      <Button
        positive
        onClick={() => handleGoogleSubmit()}
        loading={isLoading}
        disabled={error}
      >
        Google Sign In
      </Button>
      <Paragraph headerText="Sign In">
        {error && <Header as="h4">{error}</Header>}

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
      </Paragraph>
    </Desktop>
  );
};

export default withRouter(Login);
