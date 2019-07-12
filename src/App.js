import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/dashboard/SmartDashboard";
import Auth from "./components/auth/index";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* //eventually home page */}
        <Route exact path="/" render={props => <Auth {...props} />} />
        <Route exact path="/auth" render={props => <Auth {...props} />} />
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
