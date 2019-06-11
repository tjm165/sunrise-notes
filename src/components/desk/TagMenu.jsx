import React, { Component } from "react";
import { Button, Divider, Grid, Menu } from "semantic-ui-react";
import Search from "../reuse/Search";

class TagMenu extends Component {
  render() {
    const { onChange, tagMap, defaultValue } = this.props;
    const tagKeys = [...tagMap.keys()];
    const searchOptions = tagKeys.map(key => ({
      key: key,
      value: key,
      text: tagMap.get(key).title
    }));

    return (
      <Menu borderless compact fluid inverted vertical>
        <Search options={searchOptions} onChange={onChange} />
        {tagKeys.map(key => (
          <Menu.Item>
            <Button>{tagMap.get(key).title}</Button>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default TagMenu;
