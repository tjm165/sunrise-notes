import React, { useState } from "react";
import { Menu, Image, Icon, Segment, Loader } from "semantic-ui-react";

// should be an all in one container than can deal with different types of data and serve multiple purposes
export default function FlexContainer({
  children,
  extraOptions,
  optionPosition,
  rgb,
  selectedRGB,
  isSelected,
  onClick,
  type,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  shouldColorWhenSelected,
  ...rest
}) {
  const [shouldHideOptions, hideOptions] = useState(true);
  const props = {};
  rgb = rgb || { r: "FFF", g: "FFF", b: "FFF" };
  const rgbstring = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const border = `2px solid ${rgbstring}`;

  props.onClick = false;
  if (onClick) {
    props.onClick = () => onClick();
  }

  var mainChild = children[0] || children;
  if (type === "image") {
    mainChild = <Image src={children[0] || children} {...rest} />;
  }

  return (
    <Segment
      {...props}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
      {...rest}
      style={{
        borderTop: borderTop && border,
        borderBottom: borderBottom && border,
        borderLeft: borderLeft && border,
        borderRight: borderRight && border,
        backgroundColor: isSelected && shouldColorWhenSelected && rgbstring
      }}
    >
      {/* Perhaps in future versions it can switch between multiple children instead of just toggle between 2 */}

      {isSelected && children[1] ? children[1] : mainChild}

      {extraOptions && (
        <span style={{ float: "right" }}>
          <Options
            shouldHideOptions={shouldHideOptions}
            extraOptions={extraOptions}
          />
        </span>
      )}
    </Segment>
  );
} //split this into multiple pieces and then some conditionals on the as

function Options({ extraOptions, shouldHideOptions }) {
  return extraOptions.map(([iconName, onClick]) => (
    <>
      <Icon
        name={shouldHideOptions || iconName}
        onClick={event => {
          event.stopPropagation();
          onClick();
        }}
      />
    </>
  ));
}

function ItemBullet({ item, onSubmit }) {
  return <Icon name="circle outline" />;
}
