import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../HTML/Sidebar';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mock_fields = {
  '@type': 'html',
};

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

test('View renders all fields', async () => {
  render(
    <Provider store={store}>
      <Sidebar
        data={mock_fields}
        block="82b85da3-ccd2-4d89-a7de-802965c5db24"
      />
    </Provider>,
  );
  //campi sidebar
  // CheckboxWidget is lazy-loaded via @loadable/component (Volto 18.35.0),
  // so its content only appears after the initial synchronous render;
  // findByText retries until the lazy chunk resolves.
  expect(
    await screen.findByText(/Mostra lo sfondo del blocco/i),
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/Mostra lo sfondo a tutta larghezza/i),
  ).toBeInTheDocument();
});
