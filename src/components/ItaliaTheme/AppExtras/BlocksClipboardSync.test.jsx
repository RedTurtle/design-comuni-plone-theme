/**
 * Tests for BlocksClipboardSync: for logged-in users the blocks clipboard
 * follows the changes made to it by other tabs, and changes to unrelated
 * localStorage keys leave it alone; anonymous users get no listener.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-20
 */
import React from 'react';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import config from '@plone/volto/registry';
import blocksClipboard from '@plone/volto/reducers/blocksClipboard/blocksClipboard';
import BlocksClipboardSync from './BlocksClipboardSync';

const COPY_KEY = 'redux_localstorage_simple_blocksClipboard.copy';
const copiedBlocks = [{ '@type': 'slate', plaintext: 'copied' }];

// Simulates a change made by another tab: the storage event never fires in
// the tab that wrote the value.
const changeFromOtherTab = (key, value) => {
  if (value === null) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  window.dispatchEvent(
    new StorageEvent('storage', { key, storageArea: window.localStorage }),
  );
};

const userSession = (state = { token: null }, action) =>
  action.type === 'SET_TOKEN' ? { token: action.token } : state;

const renderWithClipboard = (initialClipboard, token = 'jwt-token') => {
  const store = createStore(combineReducers({ blocksClipboard, userSession }), {
    blocksClipboard: initialClipboard,
    userSession: { token },
  });
  const view = render(
    <Provider store={store}>
      <BlocksClipboardSync />
    </Provider>,
  );
  return { store, ...view };
};

describe('BlocksClipboardSync', () => {
  let persistentReducers;

  beforeEach(() => {
    persistentReducers = config.settings.persistentReducers;
    config.settings.persistentReducers = [
      'blocksClipboard.cut',
      'blocksClipboard.copy',
    ];
    window.localStorage.clear();
  });

  afterEach(() => {
    config.settings.persistentReducers = persistentReducers;
    window.localStorage.clear();
  });

  it('loads the blocks copied in another tab', () => {
    const { store } = renderWithClipboard({});
    changeFromOtherTab(COPY_KEY, copiedBlocks);
    expect(store.getState().blocksClipboard).toEqual({ copy: copiedBlocks });
  });

  it('empties the clipboard when another tab pastes or resets it', () => {
    const { store } = renderWithClipboard({ copy: copiedBlocks });
    changeFromOtherTab(COPY_KEY, null);
    expect(store.getState().blocksClipboard).toEqual({});
  });

  it('ignores changes to unrelated localStorage keys', () => {
    window.localStorage.setItem(COPY_KEY, JSON.stringify(copiedBlocks));
    const { store } = renderWithClipboard({ copy: copiedBlocks });
    changeFromOtherTab('some_other_key', 'value');
    expect(store.getState().blocksClipboard).toEqual({ copy: copiedBlocks });
  });

  it('does not listen for anonymous users', () => {
    const { store } = renderWithClipboard({}, null);
    changeFromOtherTab(COPY_KEY, copiedBlocks);
    expect(store.getState().blocksClipboard).toEqual({});
  });

  it('stops listening after logout', () => {
    const { store } = renderWithClipboard({});
    act(() => {
      store.dispatch({ type: 'SET_TOKEN', token: null });
    });
    changeFromOtherTab(COPY_KEY, copiedBlocks);
    expect(store.getState().blocksClipboard).toEqual({});
  });
});
