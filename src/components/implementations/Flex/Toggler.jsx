import React from "react";

export default function Toggler({ children, indexToShow = 0 }) {
  return <>{children.length === 0 ? children : children[indexToShow]}</>;
}
