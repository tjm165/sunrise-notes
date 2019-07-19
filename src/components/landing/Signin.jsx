import React, { useState } from "react";
import { signin } from "../../API";
import { Form, Button, Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const Signin = props => {
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
        <Button onClick={e => handleSubmit(e)}>Sign in</Button>
      </Form>
    </>
  );
};

export default withRouter(Signin);
