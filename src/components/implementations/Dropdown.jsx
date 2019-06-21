import React, { Component } from "react";
import { Dropdown, Header } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

//call this tag dropdown
export class TagDropdown extends Component {
  render() {
    const { tagMap, ...rest } = this.props;
    const tagKeys = [...tagMap.keys()];
    const options = tagKeys.map(key => ({
      key: key,
      value: key,
      text: tagMap.get(key).title,
      content: <Header content={tagMap.get(key).title} />,
      //label= { color: 'red', empty: true, circular: true },
      color: tagMap.get(key).hex
    }));
    const renderLabel = label => ({
      color: label.color,
      content: `${label.text}`,
      icon: "tag"
    });

    return (
      <Dropdown
        fluid
        search
        multiple
        clearable
        selection
        options={options}
        renderLabel={renderLabel}
        {...rest}
      />
    );
  }
}
