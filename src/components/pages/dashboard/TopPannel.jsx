import React from "react";
import { Button, Container, Menu, Dropdown, Image } from "semantic-ui-react";
import { signout } from "../../../API";
import { withRouter } from "react-router-dom";

function TopPannel({ fixed, activeItem, history }) {
  return (
    <Menu className="navBar gradient" size="large" fluid>
      <Container>
        <Menu.Item>
          <Image size="medium" src="/images/header.png" />
        </Menu.Item>

        <Menu.Menu position="right">
          <Dropdown item icon="user outline" pointing="up">
            <Dropdown.Menu>
              <Dropdown.Item
                as="a"
                // inverted={!fixed}
                // primary={fixed}
                style={{ marginLeft: "0.5em" }}
                onClick={() => signout().then(history.push("/signedout"))}
              >
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

//should combine with navbar? or call it alternate nav bar and then have one component to switch?
export default withRouter(TopPannel);
