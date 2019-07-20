import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/dashboard/SmartDashboard";
import Landing from "./components/landing/index";
import Login from "./components/landing/Login";
import Signup from "./components/landing/Signup";

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
        <Route exact path="/signup" render={props => <Signup {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
      </BrowserRouter>
    );
  }
}

export default App;
