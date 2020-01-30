import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { withOAuth } from "aws-amplify-react";

import { googleSignIn } from "../../../API";

import GoogleButton from "react-google-button";

export function GoogleOAuthButton() {
  const handleGoogleSubmit = () => {
    googleSignIn();
  };

  return <GoogleButton onClick={() => handleGoogleSubmit()} />;
}

export default withOAuth(GoogleOAuthButton);
