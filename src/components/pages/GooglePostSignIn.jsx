import React from "react";
import { withRouter } from "react-router-dom";
import Amplify, { Auth, Hub } from "aws-amplify";

const Google = props => {
  Hub.listen("auth", data => {
    switch (data.payload.event) {
      case "signIn":
        this.setState({ authState: "signedIn", authData: data.payload.data });
        break;
      case "signIn_failure":
        this.setState({
          authState: "signIn",
          authData: null,
          authError: data.payload.data
        });
        break;
      default:
        break;
    }
  });

  return (
    <button
      onClick={() =>
        Auth.currentAuthenticatedUser().then(user => {
          document.cookie = `idToken=${user.signInUserSession.idToken.jwtToken}`;
          props.history.push("/dashboard");
        })
      }
    >
      Google
    </button>
  );
};

export default withRouter(Google);
