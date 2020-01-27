import React, { Component } from "react";
import { Dropdown, Header, Icon } from "semantic-ui-react";
import { NEW_INSTANCE_UUID } from "../../../API";

export class TagDropdown extends Component {
  render() {
    const {
      tagMap,
      defaultValue,
      setAsActiveTag,
      isLoading,
      setTagUUIDs,
      ...rest
    } = this.props;
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
            <TagFragment text={text} rgb={rgb} />
          </Header>
        )
      };
    });

    const renderLabel = label => ({
      content: <TagFragment text={label.text} rgb={label.rgb} />,
      onClick: () => setAsActiveTag(label.value)
    });

    const onAddItem = value => {
      setTagUUIDs(defaultValue);
      setAsActiveTag(NEW_INSTANCE_UUID, value);
    };

    return (
      <Dropdown
        loading={isLoading.fetchUserTags}
        search
        multiple
        clearable
        allowAdditions
        selection
        options={options}
        renderLabel={renderLabel}
        defaultValue={defaultValue}
        onChange={(e, DropdownProps) => setTagUUIDs(DropdownProps.value)}
        onAddItem={(e, { value }) => onAddItem(value)}
        {...rest}
      />
    );
  }
}

function TagFragment({ rgb, text }) {
  const rgbstring = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

  return (
    <>
      <Icon name="tag" style={{ color: rgbstring }} />
      {text}
    </>
  );
}
