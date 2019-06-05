import React, { Component } from "react";
import { Button, Popup, Icon } from "semantic-ui-react";

class Ellipsis extends Component {
  render() {
    const { components } = this.props;

    return (
      <Popup trigger={<Icon name="ellipsis vertical" />} on="click">
        {components == undefined ? "" : components.map(component => component)}
      </Popup>
    );
  }
}

export default Ellipsis;
