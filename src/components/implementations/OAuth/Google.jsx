import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import { googleSignIn } from "../../../API";

import GoogleButton from "react-google-button";

function GooglePostSignIn(props) {
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      document.cookie = `idToken=${user.signInUserSession.idToken.jwtToken}`;
      props.history.push("/dashboard");
    });
  });

  return <div>Please wait while authenticating with Google</div>;
}

export default withRouter(GooglePostSignIn);

export function GoogleOAuthButton() {
  const handleGoogleSubmit = () => {
    googleSignIn();
  };

  return <GoogleButton onClick={() => handleGoogleSubmit()} />;
}
