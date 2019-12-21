import React, { useState } from "react";
import { Menu, Icon, Segment, Loader } from "semantic-ui-react";

export default function List({ children, subtitle, title, isListLoading }) {
  return (
    <>
      {title && <h1>{title}</h1>}
      {subtitle && <h5>{subtitle}</h5>}

      {isListLoading ? (
        <Loader active={isListLoading} inline="centered" />
      ) : (
        <Menu pointing vertical fluid>
          {children}
        </Menu>
      )}
    </>
  );
}

function noEntriesFound() {
  return <Segment placeholder>No Entries Found</Segment>;
}

export function Entry({ children, extraOptions, isSelected, onClick }) {
  const [shouldHideOptions, hideOptions] = useState(true);
  const props = {};
  props.onClick = false;
  if (onClick) {
    props.onClick = () => onClick();
  }

  return (
    <Menu.Item
      {...props}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
    >
      {children}
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
    </Menu.Item>
  );
}
