import React, { useEffect, useState } from 'react';

const DATA_FOCUS_MOUSE = 'data-focus-mouse';
const CLASS_NAME_MOUSE_FOCUS = 'focus--mouse';
const CLASS_NAME_MOUSE_ACTIVE = 'active';

const TrackFocus = () => {
  const [usingMouse, setUsingMouse] = useState(false);

  useEffect(() => {
    const handleEvent = (e) => {
      setUsingMouse(e.type === 'mousedown' ? true : false);
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
        if (usingMouse) {
          e.target.classList.add(CLASS_NAME_MOUSE_FOCUS);
          e.target.classList.add(CLASS_NAME_MOUSE_ACTIVE);
          e.target.setAttribute(DATA_FOCUS_MOUSE, true);
        } else {
          e.target.classList.remove(CLASS_NAME_MOUSE_FOCUS);
          e.target.classList.remove(CLASS_NAME_MOUSE_ACTIVE);
          e.target.setAttribute(DATA_FOCUS_MOUSE, false);
        }
      }
    };

    const handleFocusOut = (e) => {
      if (e.target) {
        e.target.classList.remove(CLASS_NAME_MOUSE_FOCUS);
        e.target.classList.remove(CLASS_NAME_MOUSE_ACTIVE);
        e.target.setAttribute(DATA_FOCUS_MOUSE, false);
      }
    };

    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [usingMouse]);

  return null;
};

export default TrackFocus;
