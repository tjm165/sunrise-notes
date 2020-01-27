import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/pages/dashboard/index";
import Contribute from "./components/pages/contribute";
import AboutTeam from "./components/pages/AboutTeam";

import Landing from "./components/pages/landing";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Google from "./components/pages/GooglePostSignIn";

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
        <Route exact path="/signup" render={props => <Signup {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route
          exact
          path="/googlepostsignin"
          render={props => <Google {...props} />}
        />
      </BrowserRouter>
    );
  }
}

export default App;
