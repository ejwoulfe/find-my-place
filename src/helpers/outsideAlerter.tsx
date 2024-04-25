import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

interface WrapperProps {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}
function OutsideAlerter({ setter, children }: WrapperProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        const preferenceButtonClassName = "nav__svg preferences__button";
        // Check to see if the click is the modal toggle button or not, if it isn't then just close the modal
        if (ref.current && !ref.current.contains(event.target)) {
          if (!(event.target.className === preferenceButtonClassName)) {
            setter(false);
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return <div ref={wrapperRef}>{children}</div>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
