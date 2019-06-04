import React, { Component } from "react";
import { Button, Popup, Icon } from "semantic-ui-react";

class Ellipsis extends Component {
  render() {
    return (
      <Popup trigger={<Icon name="ellipsis vertical" />} on="click">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Popup>
    );
  }
}

export default Ellipsis;
