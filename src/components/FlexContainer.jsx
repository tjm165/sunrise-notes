import React, { useState } from "react";
import { Menu, Image, Icon, Segment, Loader } from "semantic-ui-react";

// should be an all in one container than can deal with different types of data and serve multiple purposes
export default function FlexContainer({
  children,
  extraOptions,
  optionPosition,
  color,
  isSelected,
  onClick,
  type,
  ...rest
}) {
  const [shouldHideOptions, hideOptions] = useState(true);
  const props = {};
  props.onClick = false;
  if (onClick) {
    props.onClick = () => onClick();
  }

  var mainChild = children[0];
  if (type === "image") {
    mainChild = <Image src={children[0]} {...rest} />;
  }

  return (
    <Segment
      {...props}
      onMouseOver={() => hideOptions(false)}
      onMouseOut={() => hideOptions(true)}
      {...rest}
    >
      {/* Perhaps in future versions it can switch between multiple children instead of just toggle between 2 */}
      {isSelected && children[1] ? children[1] : mainChild}
      {extraOptions && (
        <Options
          shouldHideOptions={shouldHideOptions}
          extraOptions={extraOptions}
        />
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
