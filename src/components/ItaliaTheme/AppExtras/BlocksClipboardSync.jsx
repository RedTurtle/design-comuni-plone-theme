/**
 * Keeps the blocks clipboard (copy/cut) in sync across browser tabs.
 * Volto persists it in localStorage, but every tab rewrites it with its own
 * state on each redux action: a tab opened before the copy (even a view page)
 * wiped it, and Paste disappeared in the editor. It is an appExtra so that
 * every tab listens, not only the ones with an open editor.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-20
 */
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { load } from 'redux-localstorage-simple';
import isEqual from 'lodash/isEqual';
import config from '@plone/volto/registry';
import { setBlocksClipboard } from '@plone/volto/actions/blocksClipboard/blocksClipboard';

// redux-localstorage-simple default namespace, as used by Volto's store
const STORAGE_KEY_PREFIX = 'redux_localstorage_simple_blocksClipboard';

const getClipboardStates = () =>
  (config.settings.persistentReducers || []).filter(
    (state) =>
      state === 'blocksClipboard' || state.startsWith('blocksClipboard.'),
  );

export const loadBlocksClipboard = () =>
  load({ states: getClipboardStates(), disableWarnings: true })
    ?.blocksClipboard || {};

const BlocksClipboardSync = () => {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (getClipboardStates().length === 0) return;

    const onStorage = (event) => {
      if (event.storageArea !== window.localStorage) return;
      // key is null when another tab calls localStorage.clear()
      if (event.key !== null && !event.key.startsWith(STORAGE_KEY_PREFIX)) {
        return;
      }
      const clipboard = loadBlocksClipboard();
      if (!isEqual(clipboard, store.getState().blocksClipboard || {})) {
        dispatch(setBlocksClipboard(clipboard));
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [dispatch, store]);

  return null;
};

export default BlocksClipboardSync;
