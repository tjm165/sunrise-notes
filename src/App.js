import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SmartDashboard from "./components/dashboard/SmartDashboard";
import Signin from "./components/Signin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/signin" component={Signin} />
        <Route path="/dashboard" component={SmartDashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
