import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useOutsideCaller(ref, getIsModalOpen, onOutsideClick, exception) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event, onOutsideClick) {
    if (ref.current && !ref.current.contains(event.target)) {
      if (!getIsModalOpen()) {
        if (!event.target.className.includes(exception)) {
          console.log(event.target.className);
          onOutsideClick();
        }
      }
    }
  }

  //TODO
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", event =>
      handleClickOutside(event, onOutsideClick, exception)
    );
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", event =>
        handleClickOutside(event, onOutsideClick, exception)
      );
    };
  });
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideCaller({
  children,
  getIsModalOpen,
  onOutsideClick,
  exception
}) {
  const wrapperRef = useRef(null);
  useOutsideCaller(wrapperRef, getIsModalOpen, onOutsideClick, exception);

  return <div ref={wrapperRef}>{children}</div>;
}

OutsideCaller.propTypes = {
  children: PropTypes.element.isRequired
};

export default OutsideCaller;
