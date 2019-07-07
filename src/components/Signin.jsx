import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signin extends Component {
  render() {
    return (
      <div>
        SIGN IN
        <Link to="/dashboard">
          <button>click</button>
        </Link>
      </div>
    );
  }
}

export default Signin;
