import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useOutsideCaller(ref, onOutsideClick) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event, onOutsideClick) {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick();
    }
  }

  //TODO
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", event =>
      handleClickOutside(event, onOutsideClick)
    );
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", event =>
        handleClickOutside(event, onOutsideClick)
      );
    };
  });
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideCaller({ children, onOutsideClick }) {
  const wrapperRef = useRef(null);
  useOutsideCaller(wrapperRef, onOutsideClick);

  return <div ref={wrapperRef}>{children}</div>;
}

OutsideCaller.propTypes = {
  children: PropTypes.element.isRequired
};

export default OutsideCaller;
