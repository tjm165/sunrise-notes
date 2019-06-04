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
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Search options={searchOptions} onChange={onChange} />
          </Grid.Column>
          <Grid.Column>
            <Search options={searchOptions} onChange={onChange} />
          </Grid.Column>
        </Grid>

        <Divider vertical>And</Divider>
      </Segment>
    );
  }
}

export default TagSelector;
