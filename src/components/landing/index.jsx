import React, { useState } from "react";
import Register from "./Register";
import Signin from "./Signin";
import { Button, Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

function Landing() {
  const [isRegistering, setRegistering] = useState(true);

  return (
    <Container>
      {" "}
      <Button onClick={() => setRegistering(false)} disabled={!isRegistering}>
        Sign in
      </Button>
      <Button onClick={() => setRegistering(true)} disabled={isRegistering}>
        Register
      </Button>
      {isRegistering ? <Register /> : <Signin />}
    </Container>
  );
}

export default withRouter(Landing);
