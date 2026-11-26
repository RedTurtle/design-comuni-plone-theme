import { Component } from 'react';
import { render, cleanup } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import '@testing-library/jest-dom';

import BodyClass from '../customizations/volto/helpers/BodyClass/BodyClass';

/**
 * Il registro delle istanze e l'elenco delle classi gia' scritte sono stato di
 * modulo: alcuni test hanno bisogno di un modulo appena inizializzato, come
 * accade nel browser subito dopo l'idratazione.
 */
const freshBodyClass = () => {
  jest.resetModules();
  // eslint-disable-next-line global-require
  return require('../customizations/volto/helpers/BodyClass/BodyClass').default;
};

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <span>fallback</span> : this.props.children;
  }
}

const Boom = () => {
  throw new Error('boom');
};

afterEach(() => {
  cleanup();
  document.body.className = '';
});

it('aggiunge al body tutti i token di un className', () => {
  render(<BodyClass className="section-contents cms-ui" />);

  expect(document.body).toHaveClass('section-contents', 'cms-ui');
});

it('rimuove le classi quando l istanza viene smontata', () => {
  const { unmount } = render(<BodyClass className="cms-ui" />);
  expect(document.body).toHaveClass('cms-ui');

  unmount();

  expect(document.body).not.toHaveClass('cms-ui');
});

it('sostituisce le classi quando cambia la prop className', () => {
  const { rerender } = render(<BodyClass className="view-viewview" />);
  expect(document.body).toHaveClass('view-viewview');

  rerender(<BodyClass className="view-contentsview" />);

  expect(document.body).toHaveClass('view-contentsview');
  expect(document.body).not.toHaveClass('view-viewview');
});

it('deduplica i token richiesti da piu istanze', () => {
  render(
    <>
      <BodyClass className="public-ui" />
      <BodyClass className="public-ui" />
    </>,
  );

  expect(BodyClass.peek()).toEqual(['public-ui']);
});

it('applica remove anche se montato prima dell add', () => {
  render(
    <>
      <BodyClass className="cms-ui" remove />
      <BodyClass className="cms-ui" />
    </>,
  );

  expect(document.body).not.toHaveClass('cms-ui');
});

it('applica remove anche se montato dopo l add', () => {
  render(
    <>
      <BodyClass className="cms-ui" />
      <BodyClass className="cms-ui" remove />
    </>,
  );

  expect(document.body).not.toHaveClass('cms-ui');
});

/**
 * Test di regressione del bug delle doppie classi sul body.
 *
 * Con la registrazione in fase di render (UNSAFE_componentWillMount, come fa
 * react-side-effect) un albero renderizzato ma mai committato lascia la propria
 * istanza nel registro per sempre, congelata sulle props di allora: le sue
 * classi si sommano a quelle delle istanze vive e il body finisce per avere
 * insieme, ad esempio, public-ui e cms-ui.
 */
it('non registra le istanze di un albero mai committato', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <BodyClass className="fantasma" />
      <Boom />
    </ErrorBoundary>,
  );

  expect(document.body).not.toHaveClass('fantasma');
  expect(BodyClass.peek()).toEqual([]);

  consoleError.mockRestore();
});

it('adotta le classi renderizzate dall SSR e le rimuove quando non servono piu', () => {
  const Fresh = freshBodyClass();
  expect(Fresh).not.toBe(BodyClass);
  document.body.className = 'view-viewview section-evento is-authenticated';

  render(<Fresh className="view-contentsview is-authenticated" />);

  expect(document.body).toHaveClass('view-contentsview', 'is-authenticated');
  expect(document.body).not.toHaveClass('view-viewview');
  expect(document.body).not.toHaveClass('section-evento');
});

it('non cancella le classi impostate da terzi dopo la prima scrittura', () => {
  // La prima scrittura sul documento adotta le classi gia' presenti (quelle
  // dell'SSR): la esauriamo qui, cosi' il test non dipende dall'ordine.
  render(<BodyClass className="primer" />).unmount();

  document.body.classList.add('search-modal-opened');
  const { unmount } = render(<BodyClass className="cms-ui" />);

  expect(document.body).toHaveClass('search-modal-opened', 'cms-ui');

  unmount();

  expect(document.body).toHaveClass('search-modal-opened');
  expect(document.body).not.toHaveClass('cms-ui');
});

it('sul server registra in fase di render e rewind restituisce lo stato', () => {
  BodyClass.canUseDOM = false;
  try {
    const markup = renderToStaticMarkup(
      <>
        <BodyClass className="view-viewview public-ui" />
        <BodyClass className="cms-ui" />
        <BodyClass className="cms-ui" remove />
      </>,
    );

    expect(markup).toBe('');
    expect(BodyClass.rewind()).toEqual(['view-viewview', 'public-ui']);
    expect(BodyClass.peek()).toBeUndefined();
  } finally {
    BodyClass.canUseDOM = true;
  }
});

it('rewind non e utilizzabile sul client', () => {
  expect(() => BodyClass.rewind()).toThrow(/only call rewind\(\) on the server/);
});
