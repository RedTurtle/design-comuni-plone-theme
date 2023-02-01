import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TrasparenzaView from '../TrasparenzaView/TrasparenzaView';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Warning: An update to Icon inside a test was not wrapped in act(...).
// When testing, code that causes React state updates should be wrapped into act(...):
jest.mock('design-comuni-plone-theme/components/ItaliaTheme/Icons/Icon');
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

const mock_mandatory = {
  '@components': {
    actions: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@actions',
    },
    aliases: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@aliases',
    },
    breadcrumbs: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@breadcrumbs',
    },
    contextnavigation: {
      '@id':
        'http://localhost:3000/amministrazione/trasparenza/@contextnavigation',
    },
    navigation: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@navigation',
    },
    subsite: {},
    translations: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@translations',
    },
    types: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@types',
    },
    workflow: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@workflow',
    },
  },
  '@id': 'http://localhost:3000/amministrazione/trasparenza',
  '@type': 'Document',
  UID: '688cfca7ba0f42b49fcd7e5c8b6983e8',
  title: 'Trasparenza',
};

const mock_allfields = {
  ...mock_mandatory,
  '@components': {
    actions: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@actions',
    },
    aliases: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@aliases',
    },
    breadcrumbs: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@breadcrumbs',
    },
    contextnavigation: {
      '@id':
        'http://localhost:3000/amministrazione/trasparenza/@contextnavigation',
    },
    navigation: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@navigation',
    },
    subsite: {},
    translations: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@translations',
    },
    types: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@types',
    },
    workflow: {
      '@id': 'http://localhost:3000/amministrazione/trasparenza/@workflow',
    },
  },
  allow_discussion: false,
  blocks: {
    '336e4c46-d55d-4790-8e3b-144d52b15e0b': {
      '@type': 'text',
    },
    'aa791609-cae9-4da6-86bb-da50f1dafdf9': {
      '@type': 'title',
    },
  },
  blocks_layout: {
    items: [
      'aa791609-cae9-4da6-86bb-da50f1dafdf9',
      '336e4c46-d55d-4790-8e3b-144d52b15e0b',
    ],
  },
  changeNote: '',
  contributors: [],
  correlato_in_evidenza: [],
  created: '2023-01-31T14:47:20+00:00',
  creators: ['admin'],
  description: 'Is this the real life',
  design_italia_meta_type: 'Pagina',
  effective: null,
  exclude_from_nav: false,
  expires: null,
  id: 'trasparenza',
  image: {
    'content-type': 'image/webp',
    download:
      'http://localhost:3000/amministrazione/trasparenza/@@images/image-2000-58bce741812574efe26df29bbb2809f4.webp',
    filename:
      'business-teamwork-join-hands-together-business-teamwork-concept_1150-1804.webp',
    height: 1333,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-250-21c281ae68f201e90a9acdde2b8591b8.webp',
        height: 166,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-1200-ec5ea7e8b7e34867fdeebc00cb6ae47f.webp',
        height: 799,
        width: 1200,
      },
      huge: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-1600-a0169ed33e9b9820adcfea856c550251.webp',
        height: 1066,
        width: 1600,
      },
      icon: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-32-7a336e7a7f9017ccd3faa4386782d0fa.webp',
        height: 21,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-800-12d0cdfc5c37269599d67c2fb599784e.webp',
        height: 533,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-1000-9924f21338210bf5306365bbda12b1c7.webp',
        height: 666,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-16-6c92f7c36500a2564e01b2131189e841.webp',
        height: 10,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-300-a76b5bfb669863e6bdc75ed9613930f2.webp',
        height: 199,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-200-a1c5d482447b2c9bdf131c517db73ce2.webp',
        height: 133,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-400-f3d0ba4a73b2c323247449e03b4ec462.webp',
        height: 266,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-600-e74da05202082e2a9e272b03d28feef1.webp',
        height: 399,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-128-d27a6508841ab1955f60079c2caeec56.webp',
        height: 85,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/amministrazione/trasparenza/@@images/image-64-dd3ba2ee6cb0d37def578d0b832bb296.webp',
        height: 42,
        width: 64,
      },
    },
    size: 202972,
    width: 2000,
  },
  image_caption: 'Is this just fantasy?',
  info_testata: {
    'content-type': 'text/html',
    data: '<p><br></p>',
    encoding: 'utf8',
  },
  is_folderish: true,
  items: [],
  items_total: 0,
  language: {
    title: 'Italiano',
    token: 'it',
  },
  layout: 'trasparenza_view',
  lock: {
    locked: false,
    stealable: true,
  },
  modified: '2023-01-31T14:47:20+00:00',
  mostra_bottoni_condivisione: false,
  mostra_navigazione: true,
  next_item: {},
  opengraph_description: null,
  opengraph_image: null,
  opengraph_title: null,
  parent: {
    '@id': 'http://localhost:3000/amministrazione',
    '@type': 'Document',
    description:
      'Tutte le informazioni sulla struttura amministrativa del Comune. Scopri gli organi politici, gli uffici e il personale e consulta i documenti pubblici, le statistiche e i bandi di gara.',
    design_italia_meta_type: 'Pagina',
    has_children: true,
    id: 'amministrazione',
    image_field: null,
    image_scales: null,
    review_state: 'published',
    title: 'Amministrazione',
  },
  preview_caption: null,
  preview_image: null,
  previous_item: {
    '@id': 'http://localhost:3000/amministrazione/punti-di-contatto',
    '@type': 'Document',
    description: '',
    title: 'Punti di Contatto',
  },
  relatedItems: [],
  review_state: 'private',
  ricerca_in_testata: true,
  rights: '',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  show_modified: true,
  subjects: [],
  table_of_contents: null,
  tassonomia_argomenti: [
    {
      '@id': 'http://localhost:3000/argomenti/sport',
      '@type': 'Pagina Argomento',
      description:
        'Informazioni su eventi sportivi, impianti comunali, servizi dedicati allo sport',
      design_italia_meta_type: 'Argomento',
      effective: null,
      has_children: false,
      icona: 'child',
      id: 'sport',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Sport',
    },
  ],
  version: 'current',
  versioning_enabled: true,
  working_copy: null,
  working_copy_of: null,
};

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

test('renders all mandatory fields in the page', async () => {
  const { getByText, getByRole, debug } = render(
    <Provider store={store}>
      <MemoryRouter>
        <TrasparenzaView content={mock_mandatory} />
      </MemoryRouter>
    </Provider>,
  );

  //title
  expect(
    screen.getByRole('heading', { name: /Trasparenza/i }),
  ).toBeInTheDocument();
});

test('renders all non-mandatory fields in the page', async () => {
  const { getByText, getByRole, debug } = render(
    <Provider store={store}>
      <MemoryRouter>
        <TrasparenzaView content={mock_allfields} />
      </MemoryRouter>
    </Provider>,
  );

  // descrizione
  expect(screen.getByText(/Is this the real life/i)).toBeInTheDocument();

  //immagine di testata --> non compare
  expect(screen.getByAltText(/Is this just fantasy?/i)).toBeInTheDocument();
  expect(screen.getByText(/Is this just fantasy?/i)).toBeInTheDocument();

  //ricerca in testata --> non compare
  expect(
    screen.getByText(/Cerca contenuti/i, { exact: false }),
  ).toBeInTheDocument();
  // mostra i bottoni --> compaiono sempre a prescindere dal checkbox
  expect(
    screen.getByRole('button', { name: /Condividi/i }),
  ).not.toBeInTheDocument();

  //informazioni aggiuntive --> non compare
  expect(screen.getByText(/No escape from reality/i)).toBeInTheDocument();
  //navigazione in testata --> non compare
  expect(screen.getByText(/In questa sezione/i)).toBeInTheDocument();

  //tassonomia argomenti
  expect(screen.getByText(/Argomenti/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Sport/i })).toBeInTheDocument();
});
