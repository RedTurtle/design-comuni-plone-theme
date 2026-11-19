/**
 * Tests for the Alert block validity period (startDate / endDate): status
 * computation and what anonymous visitors and editors see in the block view.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-10-27
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import AlertView from '../Alert/View';
import { getAlertValidity } from '../Alert/AlertWrapper';

const mockStore = configureStore([thunk]);

const DAY = 24 * 60 * 60 * 1000;
const past = new Date(Date.now() - DAY).toISOString();
const future = new Date(Date.now() + DAY).toISOString();

const alertData = (dates) => ({
  '@type': 'alert',
  bg_color: 'warning',
  text: [{ type: 'p', children: [{ text: 'Avviso di prova' }] }],
  ...dates,
});

const renderView = (data, { canEdit = false } = {}) =>
  render(
    <Provider
      store={mockStore({
        intl: { locale: 'it', messages: {} },
        actions: {
          actions: { object: canEdit ? [{ id: 'view' }, { id: 'edit' }] : [] },
        },
      })}
    >
      <AlertView id="alert-1" data={data} />
    </Provider>,
  );

describe('getAlertValidity', () => {
  const now = new Date('2026-08-20T12:00:00Z').getTime();

  test('no dates is always active', () => {
    expect(getAlertValidity({}, now)).toBe('active');
  });

  test('inside the period is active', () => {
    expect(
      getAlertValidity(
        { startDate: '2026-08-20T08:00:00Z', endDate: '2026-08-20T16:00:00Z' },
        now,
      ),
    ).toBe('active');
  });

  test('before the start is future', () => {
    expect(getAlertValidity({ startDate: '2026-08-21T08:00:00Z' }, now)).toBe(
      'future',
    );
  });

  test('after the end is expired', () => {
    expect(getAlertValidity({ endDate: '2026-08-20T11:59:00Z' }, now)).toBe(
      'expired',
    );
  });

  test('end before start is an error', () => {
    expect(
      getAlertValidity(
        { startDate: '2026-08-21T08:00:00Z', endDate: '2026-08-20T16:00:00Z' },
        now,
      ),
    ).toBe('error');
  });
});

describe('Alert block view with validity period', () => {
  test('alert without dates is shown with no status', () => {
    renderView(alertData({}));
    expect(screen.getByText('Avviso di prova')).toBeInTheDocument();
    expect(document.querySelector('.alert-info-dates')).toBeNull();
  });

  test('active alert is shown to visitors with no status', () => {
    renderView(alertData({ startDate: past, endDate: future }));
    expect(screen.getByText('Avviso di prova')).toBeInTheDocument();
    expect(document.querySelector('.alert-info-dates')).toBeNull();
  });

  test('expired alert is hidden from visitors', () => {
    renderView(alertData({ endDate: past }));
    expect(screen.queryByText('Avviso di prova')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  test('scheduled alert is hidden from visitors', () => {
    renderView(alertData({ startDate: future }));
    expect(screen.queryByText('Avviso di prova')).toBeNull();
  });

  test('expired alert is shown to editors with its status', () => {
    renderView(alertData({ endDate: past }), { canEdit: true });
    expect(screen.getByText('Avviso di prova')).toBeInTheDocument();
    expect(screen.getByText(/Non visibile. E' scaduto il/)).toBeInTheDocument();
  });

  test('active alert shows editors when it will expire', () => {
    renderView(alertData({ startDate: past, endDate: future }), {
      canEdit: true,
    });
    expect(
      screen.getByText(/Pubblicazione attiva. Scadrà il/),
    ).toBeInTheDocument();
  });
});
