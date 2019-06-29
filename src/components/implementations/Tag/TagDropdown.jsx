import React, { Component } from "react";
import { Label, Dropdown, Header } from "semantic-ui-react";
import TagSegment from "./TagSegment";

export class TagDropdown extends Component {
  render() {
    const { tagMap, ...rest } = this.props;
    const tagKeys = [...tagMap.keys()];

    //the choices
    const options = tagKeys.map(key => {
      const rgb = tagMap.get(key).rgb;
      const text = tagMap.get(key).title;
      return {
        key: key,
        value: key,
        text: text,
        rgb: rgb,
        content: (
          <Header size="tiny">
            <TagSegment text={text} rgb={rgb} />
          </Header>
        )
      };
    });

    const renderLabel = label => ({
      content: <TagSegment text={label.text} rgb={label.rgb} />
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
