import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Container } from "semantic-ui-react";

class DeskSearch extends Component {
  render() {
    const { onChange, tagObjects } = this.props;
    var i = 0;

    return (
      <Container>
        <Dropdown
          placeholder="Select Tag"
          fluid
          search
          multiple
          selection
          onChange={onChange}
          options={tagObjects.map(tag => ({
            key: i,
            value: i++,
            text: tag.value
          }))}
        />
      </Container>
    );
  }
}

export default DeskSearch;
