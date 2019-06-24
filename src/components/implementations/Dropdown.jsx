import React, { Component } from "react";
import { Label, Dropdown, Header, Icon } from "semantic-ui-react";

export class TagDropdown extends Component {
  render() {
    const { tagMap, ...rest } = this.props;
    const tagKeys = [...tagMap.keys()];

    //the choices
    const options = tagKeys.map(key => {
      const rgb = tagMap.get(key).rgb;
      const rgbString = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
      const text = tagMap.get(key).title;
      return {
        key: key,
        value: key,
        text: text,
        rgbString: rgbString,
        content: (
          // A: needs to be a separate component
          <Header size="tiny">
            <Icon name="tag" style={{ color: rgbString }} />
            {text}
          </Header>
        )
      };
    });

    const renderLabel = label => ({
      color: label.color,
      content: `${label.text}`,
      icon: { name: "tag", style: { color: label.rgbString } }
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
