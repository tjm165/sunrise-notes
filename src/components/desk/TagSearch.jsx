import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Container } from "semantic-ui-react";

class DeskSearch extends Component {
  render() {
    const { onChange, tagObjects, defaultValue } = this.props;
    var i = 0;

    return (
      <Container>
        <Dropdown
          placeholder="Select Tag"
          defaultValue={defaultValue}
          fluid
          search
          multiple
          selection
          allowAdditions
          onChange={(e, DropdownProps) => onChange(DropdownProps.value)}
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
