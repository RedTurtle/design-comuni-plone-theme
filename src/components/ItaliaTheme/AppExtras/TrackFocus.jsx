import React, { useEffect, useState } from 'react';

const DATA_FOCUS_MOUSE = 'data-focus-mouse';
const CLASS_NAME_MOUSE_FOCUS = 'focus--mouse';
const CLASS_NAME_MOUSE_ACTIVE = 'active';

const TrackFocus = () => {
  const [usingMouse, setUsingMouse] = useState(false);
  const [activeElement, setActiveElement] = useState(null);

  useEffect(() => {
    const handleEvent = (e) => {
      setUsingMouse(e.type === 'mousedown');
    };

    document.addEventListener('keydown', handleEvent);
    document.addEventListener('mousedown', handleEvent);

    return () => {
      document.removeEventListener('keydown', handleEvent);
      document.removeEventListener('mousedown', handleEvent);
    };
  }, []);

  useEffect(() => {
    const handleFocusChange = (e) => {
      if (e.target) {
        const isLinkOrButton =
          e.target.tagName === 'A' || e.target.tagName === 'BUTTON';

        if (usingMouse) {
          e.target.classList.add(CLASS_NAME_MOUSE_FOCUS);
          if (isLinkOrButton) {
            if (activeElement && activeElement !== e.target) {
              activeElement.classList.remove(CLASS_NAME_MOUSE_ACTIVE);
            }
            e.target.classList.add(CLASS_NAME_MOUSE_ACTIVE);
            setActiveElement(e.target);
          }
          e.target.setAttribute(DATA_FOCUS_MOUSE, true);
        } else {
          e.target.classList.remove(CLASS_NAME_MOUSE_FOCUS);
          e.target.removeAttribute(DATA_FOCUS_MOUSE);
        }
      }
    };

    const handleFocusOut = (e) => {
      if (e.target) {
        e.target.classList.remove(CLASS_NAME_MOUSE_FOCUS);
        e.target.removeAttribute(DATA_FOCUS_MOUSE);
      }
    };

    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [usingMouse, activeElement]);

  return null;
};

export default TrackFocus;
