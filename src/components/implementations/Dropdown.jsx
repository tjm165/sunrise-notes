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
      return {
        key: key,
        value: key,
        text: tagMap.get(key).title,
        rgbString: rgbString,
        content: (
          // A: needs to be a separate component along with B
          <Header size="tiny">
            <Icon name="tag" style={{ color: rgbString }} />
            option
          </Header>
        )
      };
    });

    const renderLabel = label => (
      // B: needs to be a separate component along with A
      <Label>
        <Icon name="tag" style={{ color: label.rgbString }} />
        {label.text}
      </Label>
    );

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
