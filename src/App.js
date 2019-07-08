import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/dashboard/SmartDashboard";
import Signin from "./components/auth/Signin";
import Register from "./components/auth/Register";
import Welcome from "./components/auth/Welcome";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/register" component={Register} />
        <Route path="/signin" component={Signin} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/dashboard" component={SmartDashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
