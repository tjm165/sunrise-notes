import React, { Component } from "react";
import { Divider, Grid, Segment } from "semantic-ui-react";
import Search from "../reuse/Search";

class TagSelector extends Component {
  render() {
    const { onChange, tagMap, defaultValue } = this.props;
    const searchOptions = [...tagMap.keys()].map(key => ({
      key: key,
      value: key,
      text: tagMap.get(key).title
    }));

    return (
      <Segment>
        <Search options={searchOptions} onChange={onChange} />
      </Segment>
    );
  }
}

export default TagSelector;
