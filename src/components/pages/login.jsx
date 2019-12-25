import React, { useState } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { signin } from "../../API";
import Desktop from "../implementations/Layout/Desktop";
import { withRouter } from "react-router-dom";
import Paragraph from "../implementations/Layout/Paragraph";
import GoogleLogin from "react-google-login";

const Login = props => {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const responseGoogle = response => {
    console.log(response);
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
      bo
      <GoogleLogin
        clientId="647453733657-82tcdpdimrrubgo1hi5glp1cdlrvo3it.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      om
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
