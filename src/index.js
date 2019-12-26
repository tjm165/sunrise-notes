import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import config from "./config";
import Amplify from "aws-amplify";
import * as serviceWorker from "./serviceWorker";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const oauth = {
  domain: "tjmnotesapp.auth.us-east-2.amazoncognito.com",
  scope: [
    "phone",
    "email",
    "profile",
    "openid",
    "aws.cognito.signin.user.admin"
  ],
  redirectSignIn: "https://www.sunrisenotes.com/dashboard",
  redirectSignOut: "http://localhost:3000/",
  responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
};

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    redion: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  oauth
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
