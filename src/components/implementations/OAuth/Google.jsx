import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import { googleSignIn } from "../../../API";
import { Button } from "semantic-ui-react";

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
    setGoogleLoading(true);
    googleSignIn();
  };
  const [isGoogleLoading, setGoogleLoading] = useState(false);

  return (
    <Button
      positive
      onClick={() => handleGoogleSubmit()}
      loading={isGoogleLoading}
    >
      Sign In With Google
    </Button>
  );
}
