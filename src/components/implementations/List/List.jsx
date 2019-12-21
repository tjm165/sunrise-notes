import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";

export default function List({ children, subtitle, title, isListLoading }) {
  return (
    <>
      {title && <h1>{title}</h1>}
      {subtitle && <h5>{subtitle}</h5>}

      <Menu pointing vertical fluid>
        {children}
      </Menu>
    </>
  );
}

export function Entry({ extraOptions, title, isSelected, onClick }) {
  // const rgbstring = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2`;
  const [shouldHideOptions, hideOptions] = useState(true);
  return (
    <Menu.Item
      // style={{ backgroundColor: isSelected ? rgbstring : "#fff" }}
      onClick={() => onClick()}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
    >
      {title}
      {extraOptions.map(([iconName, onClick]) => (
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
      {/* this part will deal with actions */}
    </Menu.Item>
  );
}
