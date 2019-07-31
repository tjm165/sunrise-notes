import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Container, Menu, Image } from "semantic-ui-react";

function NavBar({ fixed, activeItem, history }) {
  return (
    <Menu
      fixed={fixed ? "top" : null}
      pointing={!fixed}
      secondary={!fixed}
      className="navBar"
      size="large"
      fluid
    >
      <Container>
        <Menu.Item
          as="a"
          active={activeItem === "Home"}
          onClick={() => history.push("/")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => history.push("/contribute")}
          active={activeItem === "Contribute"}
        >
          Contribute
        </Menu.Item>
        <Menu.Item position="right">
          {activeItem === "Login" || (
            <Button
              as="a"
              inverted={!fixed}
              onClick={() => history.push("/login")}
            >
              Sign in
            </Button>
          )}

          {activeItem === "Signup" || (
            <Button
              as="a"
              inverted={!fixed}
              primary={fixed}
              style={{ marginLeft: "0.5em" }}
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default withRouter(NavBar);
