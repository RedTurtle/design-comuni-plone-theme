import { useState, useRef, useEffect } from 'react';

/**
 * Manage the activation of a semantic-ui Embed video (a fake play button shown
 * over a preview/cover image) and move focus to the real video iframe as soon
 * as it is rendered.
 *
 * When a cover image is set, the only focusable element is the fake play button;
 * once activated, semantic-ui hides the placeholder and the play icon
 * (display: none), which would otherwise drop focus on the <body>. Screen
 * reader and keyboard users would then lose the context and not realize a video
 * appeared. Controlling the `active` state lets us move focus into the freshly
 * mounted iframe instead.
 *
 * Usage:
 * const { wrapperRef, active, activate } = useVideoEmbedFocus();
 * <div ref={wrapperRef}>
 *   <Embed active={active} onClick={activate} ... />
 * </div>
 */
export const useVideoEmbedFocus = () => {
  const wrapperRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || !wrapperRef.current) {
      return;
    }
    const iframe = wrapperRef.current.querySelector('iframe');
    if (iframe) {
      iframe.setAttribute('tabindex', '0');
      iframe.focus();
    }
  }, [active]);

  const activate = () => setActive(true);

  return { wrapperRef, active, activate };
};
