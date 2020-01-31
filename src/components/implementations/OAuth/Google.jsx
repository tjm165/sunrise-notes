import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { Auth, Hub } from "aws-amplify";

import { googleSignIn } from "../../../API";

import GoogleButton from "react-google-button";

function GooglePostSignIn(props) {
  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log(user);
          props.history.push("/dashboard");
        })
        .catch(error => googleSignIn());
    });
  });

  return (
    <div>
      Please wait while authenticating with Google. If this page lasts for more
      than 10 seconds then please reload.
    </div>
  );
}

export default withRouter(GooglePostSignIn);
