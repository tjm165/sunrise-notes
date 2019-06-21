import React, { Component } from "react";
import { TagDropdown } from "../../implementations/Dropdown";

//When we change to query column we can get rid of this component
class TagMenu extends Component {
  render() {
    const { onChange, tagMap } = this.props;

    return (
      <TagDropdown
        placeholder="Search for tags"
        tagMap={tagMap}
        onChange={onChange}
      />
    );
  }
}

export default TagMenu;
