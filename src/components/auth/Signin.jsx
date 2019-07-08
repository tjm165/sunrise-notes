import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      username: "testTommy",
      email: "tom.moawad@gmail.com",
      password: "Abcdefg1!"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log("hey");

    const { username, email, password } = this.state;
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);

      this.props.history.push("/dashboard");
    } catch (error) {
      console.log(error); //more info in part 2 at 8:15
    }
  };

  render() {
    return (
      <div>
        Login
        <button onClick={e => this.handleSubmit(e)}>click</button>
      </div>
    );
  }
}

export default Signin;
