import React, { useState } from "react";
import { Menu, Image, Icon, Segment, Loader } from "semantic-ui-react";

// should be an all in one container than can deal with different types of data and serve multiple purposes
export default function FlexContent({
  children,
  leftExtraOptions,
  rightExtraOptions,
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
  threed,
  fade,
  fadeWithColor,
  shouldColorOptions,
  shouldNeverHideOptions,
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

  var className = "FlexContent";
  if (threed) {
    className = className.concat(" threed");
  } else if (fade) {
    className = className.concat(" fade");
  } else if (fadeWithColor) {
    className = className.concat(" fadeWithColor");
  }

  return (
    <Segment
      className={className}
      {...props}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
      {...rest}
      style={{
        "--fadeColor": rgbstring,
        fadeColor: rgbstring,
        borderTop: borderTop && border,
        borderBottom: borderBottom && border,
        borderLeft: borderLeft && border,
        borderRight: borderRight && border,
        backgroundColor: isSelected && shouldColorWhenSelected && rgbstring
      }}
    >
      {/* TODO: Get rid of toggle */}
      {leftExtraOptions && (
        <span style={{ float: "left" }}>
          <Options
            shouldHideOptions={!shouldNeverHideOptions && shouldHideOptions}
            extraOptions={leftExtraOptions}
            rgbString={shouldColorOptions && rgbstring}
          />
        </span>
      )}

      {isSelected && children[1] ? children[1] : mainChild}

      {rightExtraOptions && (
        <span style={{ float: "right" }}>
          <Options
            shouldHideOptions={!shouldNeverHideOptions && shouldHideOptions}
            extraOptions={rightExtraOptions}
            rgbString={shouldColorOptions && rgbstring}
          />
        </span>
      )}
    </Segment>
  );
} //split this into multiple pieces and then some conditionals on the as

function Options({ extraOptions, shouldHideOptions, rgbString }) {
  const style = {};
  if (rgbString) {
    style["color"] = rgbString;
  }

  return extraOptions.map(([iconName, onClick]) => (
    <>
      <Icon
        style={style}
        className="grow"
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
