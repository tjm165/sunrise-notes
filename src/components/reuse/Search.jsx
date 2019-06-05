import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class DeskSearch extends Component {
  render() {
    const { onChange, options, defaultValue } = this.props;

    return (
      <Container>
        <Dropdown
          placeholder="Select Tag"
          defaultValue={defaultValue}
          fluid
          search
          multiple
          clearable
          selection
          allowAdditions
          onChange={(e, DropdownProps) => onChange(DropdownProps.value)}
          options={options}
        />
      </Container>
    );
  }
}

export default DeskSearch;
