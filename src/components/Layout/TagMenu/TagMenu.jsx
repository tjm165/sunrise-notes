import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import Search from "../../reuse/Search";

class TagMenu extends Component {
  render() {
    const { onChange, tagMap, defaultValue, open } = this.props;
    const tagKeys = [...tagMap.keys()];
    const searchOptions = tagKeys.map(key => ({
      key: key,
      value: key,
      text: tagMap.get(key).title,
      content: <Header icon="mobile" content={tagMap.get(key).title} />,
      color: tagMap.get(key).hex
    }));

    return <Search options={searchOptions} onChange={onChange} open={open} />;
  }
}

export default TagMenu;
