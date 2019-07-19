import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/dashboard/SmartDashboard";
import Landing from "./components/landing/index";

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
      </BrowserRouter>
    );
  }
}

export default App;
