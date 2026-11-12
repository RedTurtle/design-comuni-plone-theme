import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';
import RichTextHtml from '../RichTextHtml';

const mockStore = configureStore([]);

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  userSession: { token: null },
});

beforeAll(() => {
  config.settings = {
    ...config.settings,
    publicURL: 'http://localhost:3000',
    apiPath: 'http://localhost:8080/Plone',
    openExternalLinkInNewTab: true,
    externalRoutes: [],
    siteProperties: {
      ...(config.settings.siteProperties ?? {}),
      markSpecialLinks: true,
    },
  };
});

const renderHtml = (html) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RichTextHtml html={html} className="wrapper" />
      </MemoryRouter>
    </Provider>,
  );

// HTML as saved by HtmlSlateWidget (renderToStaticMarkup of UniversalLink)
const savedExternalLink =
  '<p>Vai al <a href="https://www.example.com" title="Apre in un nuovo tab" target="_blank" rel="noopener noreferrer" class="with-external-link-icon">sito esterno<span style="width:1rem;height:1rem;background-color:transparent" class="icon ms-1 align-sub external-link icon-xs xs"></span></a></p>';

it('renders external links through UniversalLink without the saved placeholder', () => {
  const { container } = renderHtml(savedExternalLink);

  const links = container.querySelectorAll('a');
  expect(links).toHaveLength(1);

  const link = links[0];
  expect(link).toHaveAttribute('href', 'https://www.example.com');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveTextContent('sito esterno');
  // title is computed again by UniversalLink, not duplicated
  expect(link.getAttribute('title')).toBe('Apre in un nuovo tab');
  expect(link.className).toBe('with-external-link-icon');
  // only the live icon rendered by UniversalLink, not the saved placeholder
  expect(link.querySelectorAll('.external-link')).toHaveLength(1);
});

it('renders internal links as app links', () => {
  const { container } = renderHtml(
    '<p><a href="http://localhost:8080/Plone/le-scuole">Le scuole</a></p>',
  );

  const link = container.querySelector('a');
  expect(link).toHaveAttribute('href', '/le-scuole');
  expect(link).not.toHaveAttribute('target');
  expect(link.querySelector('.external-link')).toBeNull();
});

it('keeps the rest of the markup', () => {
  const { container } = renderHtml(
    '<h3 id="title">Contatti</h3><p><strong>Tel</strong> 051 123456</p><table><tbody><tr><td>A</td></tr></tbody></table>',
  );

  expect(container.querySelector('.wrapper > h3#title')).toHaveTextContent(
    'Contatti',
  );
  expect(container.querySelector('strong')).toHaveTextContent('Tel');
  expect(container.querySelector('table td')).toHaveTextContent('A');
});

it('renders nothing for empty html', () => {
  const { container } = renderHtml('');
  expect(container.querySelector('.wrapper')).toBeEmptyDOMElement();
});
