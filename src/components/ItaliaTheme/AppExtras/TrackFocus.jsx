import React, { useEffect, useState } from 'react';

const DATA_FOCUS_MOUSE = 'data-focus-mouse';
const CLASS_NAME_MOUSE_FOCUS = 'focus--mouse';

const TrackFocus = () => {
  const [usingMouse, setUsingMouse] = useState(false);

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
        if (usingMouse) {
          e.target.classList.add(CLASS_NAME_MOUSE_FOCUS);
          e.target.setAttribute(DATA_FOCUS_MOUSE, true);
        } else {
          e.target.classList.remove(CLASS_NAME_MOUSE_FOCUS);
          e.target.setAttribute(DATA_FOCUS_MOUSE, false);
        }
      }
    };

    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusChange);

    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusChange);
    };
  }, [usingMouse]);

  return null;
};

export default TrackFocus;
