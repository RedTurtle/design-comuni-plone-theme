import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StoresButtons from '../HeroImageLeft/StoresButtons';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mock_fields = {
  '@type': 'hero',
  moreHref: 'http://localhost:3000/argomenti',
  moreTitle: 'She spoke just like a baroness',
  show_block_bg: true,
  title: '',
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
      <MemoryRouter>
        <StoresButtons data={mock_fields} />
      </MemoryRouter>
    </Provider>,
  );

  //link ad altro
  expect(
    screen.getByText(/She spoke just like a baroness/i),
  ).toBeInTheDocument();
  //select filters
  // const selectFilters = document.getElementsByClassName('select-filter');
  // expect(selectFilters).toHaveLength(1);
  // const dateFilters = document.querySelector('.date-filter');
  // expect(dateFilters).toHaveLength(1);

  //bottone cerca
  expect(screen.getByRole('button', { name: /Cerca/i })).toBeInTheDocument();
});
