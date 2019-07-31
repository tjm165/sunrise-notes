import React, { useState } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { signin } from "../../API";
import Desktop from "../implementations/Layout/Desktop";
import { withRouter } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [error, setError] = useState(null);

  const handleSubmit = event => {
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
      });
  };

  return (
    <Desktop hideFooter activeItem="Login">
      <>
        <Header as="h2">Sign in</Header>
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
          <Button positive onClick={e => handleSubmit(e)}>
            Sign in
          </Button>
        </Form>
      </>
    </Desktop>
  );
};

export default withRouter(Login);
