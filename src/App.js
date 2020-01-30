import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/pages/dashboard/index";
import Contribute from "./components/pages/contribute";
import AboutTeam from "./components/pages/AboutTeam";

import Landing from "./components/pages/landing";
import AuthorizationPage from "./components/pages/Authorization";
import GooglePostSignIn from "./components/implementations/OAuth/Google";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* //eventually home page */}
        <Route exact path="/" render={props => <Landing {...props} />} />
        <Route
          exact
          path="/index.html"
          render={props => <Landing {...props} />}
        />
        <Route
          exact
          path="/dashboard"
          render={props => <SmartDashboard {...props} />}
        />
        <Route exact path="/contribute" render={props => <Contribute />} />
        <Route exact path="/about-team" render={props => <AboutTeam />} />
        <Route
          exact
          path="/signup"
          render={props => <AuthorizationPage {...props} />}
        />
        <Route
          exact
          path="/login"
          render={props => <AuthorizationPage login {...props} />}
        />
        <Route
          exact
          path="/googlepostsignin"
          render={props => <GooglePostSignIn {...props} />}
        />
        <Route
          exact
          path="/privacypolicy"
          render={props => <PrivacyPolicy {...props} />}
        />
      </BrowserRouter>
    );
  }
}

export default App;
