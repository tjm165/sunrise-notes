import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

class Register extends Component {
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
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log(signUpResponse);
      this.props.history.push("/welcome");
    } catch (error) {
      console.log(error); //more info in part 2 at 8:15
    }
  };

  render() {
    return (
      <div>
        Register
        <button onClick={e => this.handleSubmit(e)}>click</button>
      </div>
    );
  }
}

export default Register;
