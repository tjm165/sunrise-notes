import React, { useState } from "react";
import { Menu, Icon, Segment, Loader } from "semantic-ui-react";

// should be an all in one container than can deal with different types of data and serve multiple purposes
export default function FlexContainer({
  children,
  extraOptions,
  color,
  isSelected,
  onClick
}) {
  const [shouldHideOptions, hideOptions] = useState(true);
  const props = {};
  props.onClick = false;
  if (onClick) {
    props.onClick = () => onClick();
  }

  return (
    <Segment
      {...props}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
    >
      {isSelected && children[1] ? children[1] : children[0]}
      {extraOptions &&
        extraOptions.map(([iconName, onClick]) => (
          <>
            <Icon
              name={shouldHideOptions || iconName}
              onClick={event => {
                event.stopPropagation();
                onClick();
              }}
            />
          </>
        ))}
    </Segment>
  );
}
