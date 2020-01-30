import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Amplify, { Auth, Hub } from "aws-amplify";

function Google(props) {
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      document.cookie = `idToken=${user.signInUserSession.idToken.jwtToken}`;
      props.history.push("/dashboard");
    });
  });

  return <div>Please wait while authenticating with Google</div>;
}

export default withRouter(Google);
