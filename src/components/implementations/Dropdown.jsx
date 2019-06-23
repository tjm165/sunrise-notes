import React, { Component } from "react";
import { Dropdown, Header } from "semantic-ui-react";

export class TagDropdown extends Component {
  render() {
    const { tagMap, ...rest } = this.props;
    const tagKeys = [...tagMap.keys()];

    //the choices
    const options = tagKeys.map(key => ({
      key: key,
      value: key,
      text: tagMap.get(key).title,
      rgb: tagMap.get(key).rgb
    }));

    //when it is selected
    const renderLabel = label => ({
      content: label.text,
      icon: "tag",
      style: {
        backgroundColor:
          "rgb(" + label.rgb.r + "," + label.rgb.g + "," + label.rgb.b + ")"
      }
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