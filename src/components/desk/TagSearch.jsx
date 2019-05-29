import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class DeskSearch extends Component {
  render() {
    const { onChange, tagMap, defaultValue, submit } = this.props;
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
          options={[...tagMap.keys()].map(key => ({
            key: key,
            value: key,
            text: tagMap.get(key).value
          }))}
        />
        <Button onClick={submit}>Submit Search</Button>
      </Container>
    );
  }
}

export default DeskSearch;
