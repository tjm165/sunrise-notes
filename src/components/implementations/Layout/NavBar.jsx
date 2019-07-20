import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar({ fixed, hideSignIn, hideLogin }) {
  return (
    <Menu
      fixed={fixed ? "top" : null}
      pointing={!fixed}
      secondary={!fixed}
      size="large"
    >
      <Container>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Features</Menu.Item>
        <Menu.Item as="a">Contribute</Menu.Item>
        <Menu.Item as="a">About</Menu.Item>
        <Menu.Item position="right">
          {hideLogin || (
            <Link to="/login">
              <Button as="a" inverted={!fixed}>
                Sign in
              </Button>
            </Link>
          )}

          {hideSignIn || (
            <Link to="/signup">
              <Button
                as="a"
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: "0.5em" }}
              >
                Sign Up
              </Button>
            </Link>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
}
