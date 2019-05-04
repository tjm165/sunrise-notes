import React, { Component } from "react";
import { Dropdown } from "../../../node_modules/semantic-ui-react";

class DeskSearch extends Component {
  render() {
    const { state, functions } = this.props;
    var i = 0;

    return (
      <div>
        DeskSearch
        <Dropdown
          placeholder="Select Tag"
          fluid
          search
          multiple
          selection
          onChange={functions.setContextTags}
          options={state.tagObjects.map(tag => ({
            key: i,
            value: i++,
            text: tag.value
          }))}
        />
      </div>
    );
  }
}

export default DeskSearch;
