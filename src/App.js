import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/dashboard/SmartDashboard";
import Auth from "./components/auth/index";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          path="/auth"
          render={props => <Auth {...props} name="tommy" />}
        />
        <Route path="/dashboard" component={SmartDashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
