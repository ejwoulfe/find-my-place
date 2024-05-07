import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

interface WrapperProps {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}
interface refObj {
  current: HTMLElement | null;
}
function OutsideAlerter({ setter, children }: WrapperProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: refObj) {
    console.log(ref);
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const preferenceButtonClassName = "preferences__button";
        const preferenceButtonSVGClassName = "nav__svg button__svg";
        const target = event.target as HTMLElement;
        // Check to see if the click is the modal toggle button or not, if it isn't then just close the modal
        if (ref.current && !ref.current.contains(target)) {
          if (!(target.className === preferenceButtonClassName || target.className === preferenceButtonSVGClassName)) {
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
