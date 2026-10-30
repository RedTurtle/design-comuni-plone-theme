/**
 * Tests for HtmlLangDir: lang/dir on <html> follow the content language and
 * win over a Helmet mounted before it (as the ones in App/LanguageSelector).
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-10-26
 */
import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';
import { Helmet } from '@plone/volto/helpers';
import HtmlLangDir from './HtmlLangDir';

const mockStore = configureStore();

const renderAt = (pathname, language) =>
  render(
    <Provider
      store={mockStore({
        intl: { locale: 'it', messages: {} },
        content: {
          data: {
            '@id': 'http://localhost:8080/Plone/test/pagina',
            language,
          },
        },
      })}
    >
      <MemoryRouter initialEntries={[pathname]}>
        <Helmet>
          <html lang="it" />
        </Helmet>
        <HtmlLangDir />
      </MemoryRouter>
    </Provider>,
  );

beforeEach(() => {
  config.settings.apiPath = 'http://localhost:8080/Plone';
  config.settings.isMultilingual = false;
  config.settings.defaultLanguage = 'it';
});

it('sets lang and dir of an rtl content', () => {
  renderAt('/test/pagina', { token: 'ar', title: 'العربية (ar)' });
  expect(Helmet.peek().htmlAttributes).toEqual({ lang: 'ar', dir: 'rtl' });
});

it('sets dir="ltr" for ltr languages too', () => {
  renderAt('/test/pagina', { token: 'en', title: 'English (en)' });
  expect(Helmet.peek().htmlAttributes).toEqual({ lang: 'en', dir: 'ltr' });
});

it('falls back to the site language outside the content view', () => {
  renderAt('/test/pagina/edit', { token: 'ar', title: 'العربية (ar)' });
  expect(Helmet.peek().htmlAttributes).toEqual({ lang: 'it', dir: 'ltr' });
});
