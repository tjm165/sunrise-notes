import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class DeskSearch extends Component {
  render() {
    const { onChange, options, defaultValue, open } = this.props;

    const renderLabel = label => ({
      color: label.color,
      content: `${label.text}`,
      icon: "tag"
    });

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
          onChange={(e, DropdownProps) => onChange(DropdownProps.value)}
          options={options}
          open={open}
          renderLabel={renderLabel}
        />
      </Container>
    );
  }
}

export default DeskSearch;
