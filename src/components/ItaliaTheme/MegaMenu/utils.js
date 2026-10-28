/**
 * Keyboard navigation for MegaMenu.
 */

import { useEffect, useRef } from 'react';

export const useMegaMenuKeyboard = ({
  menuStatus,
  setMenuStatus,
  toggleId,
  panelId,
}) => {
  const pendingFocus = useRef(null);

  const getPanel = () => document.getElementById(panelId);
  const getPanelLinks = () => [
    ...(getPanel()?.querySelectorAll('.link-list a[href]') ?? []),
  ];

  const focusLink = (position) => {
    const links = getPanelLinks();
    const link = position === 'last' ? links[links.length - 1] : links[0];
    link?.focus();
  };

  useEffect(() => {
    if (!menuStatus) {
      return;
    }
    if (pendingFocus.current) {
      focusLink(pendingFocus.current);
      pendingFocus.current = null;
    } else {
      getPanel()?.focus();
    }
  }, [menuStatus]);

  useEffect(() => {
    if (!menuStatus) {
      return;
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuStatus(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuStatus, setMenuStatus]);

  const closeAndFocusToggle = () => {
    setMenuStatus(false);
    document.getElementById(toggleId)?.focus();
  };

  const onToggleKeyDown = (e) => {
    e.stopPropagation();
    switch (e.key) {
      case ' ':
        e.preventDefault();
        setMenuStatus(!menuStatus);
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (menuStatus) {
          focusLink(e.key === 'ArrowUp' ? 'last' : 'first');
        } else {
          pendingFocus.current = e.key === 'ArrowUp' ? 'last' : 'first';
          setMenuStatus(true);
        }
        break;
      case 'Escape':
        if (menuStatus) {
          e.preventDefault();
          setMenuStatus(false);
        }
        break;
      default:
        break;
    }
  };

  const onPanelKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      closeAndFocusToggle();
      return;
    }
    if (
      /input|textarea|select/i.test(e.target.tagName) ||
      e.target.isContentEditable
    ) {
      return;
    }
    const links = getPanelLinks();
    const currentIndex = links.indexOf(e.target);
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        links[Math.min(currentIndex + 1, links.length - 1)]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        links[
          currentIndex < 0 ? links.length - 1 : Math.max(currentIndex - 1, 0)
        ]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        focusLink('first');
        break;
      case 'End':
        e.preventDefault();
        focusLink('last');
        break;
      default:
        break;
    }
  };

  return { onToggleKeyDown, onPanelKeyDown };
};
