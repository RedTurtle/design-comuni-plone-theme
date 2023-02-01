import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CartellaModulisticaView from '../CartellaModulisticaView/CartellaModulisticaView';
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
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@actions',
    },
    aliases: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@aliases',
    },
    breadcrumbs: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@breadcrumbs',
    },
    contextnavigation: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@contextnavigation',
    },
    'modulistica-items': {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@modulistica-items',
    },
    navigation: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@navigation',
    },
    subsite: {},
    translations: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@translations',
    },
    types: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@types',
    },
    workflow: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@workflow',
    },
  },
  '@id': 'http://localhost:3000/documenti-e-dati/cartella-modulistica',
  '@type': 'CartellaModulistica',
  UID: '830cf10073274489b7dc836b2f7ceaa5',
  title: 'Cartella modulistica',
  items: [],
};

const mock_allfields = {
  ...mock_mandatory,
  '@components': {
    actions: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@actions',
    },
    aliases: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@aliases',
    },
    breadcrumbs: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@breadcrumbs',
    },
    contextnavigation: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@contextnavigation',
    },
    'modulistica-items': {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@modulistica-items',
    },
    navigation: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@navigation',
    },
    subsite: {},
    translations: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@translations',
    },
    types: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@types',
    },
    workflow: {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/@workflow',
    },
  },
  '@id': 'http://localhost:3000/documenti-e-dati/cartella-modulistica',
  '@type': 'CartellaModulistica',
  UID: '830cf10073274489b7dc836b2f7ceaa5',
  allow_discussion: false,
  blocks: {
    '7030f852-c6c6-4d8b-a8a7-924eca8425ec': {
      '@type': 'title',
    },
    'd2043aa9-157f-4393-a51c-05811f6e760e': {
      '@type': 'text',
    },
  },
  blocks_layout: {
    items: [
      '7030f852-c6c6-4d8b-a8a7-924eca8425ec',
      'd2043aa9-157f-4393-a51c-05811f6e760e',
    ],
  },
  changeNote: '',
  contributors: [],
  created: '2023-01-30T11:13:06+00:00',
  creators: ['admin'],
  description: 'Is this the real life?',
  design_italia_meta_type: 'Cartella Modulistica',
  effective: null,
  exclude_from_nav: false,
  expires: null,
  id: 'cartella-modulistica',
  image: {
    'content-type': 'image/jpeg',
    download:
      'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-6240-55d3b20593dd0bc7b5896078c8f4e719.jpeg',
    filename: 'woman-having-online-meeting-work.jpg',
    height: 4160,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-250-898d9ffd0bdf76c03897db43d1d80ba5.jpeg',
        height: 166,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-1200-e3403535d4a8b98393402557d99a3f12.jpeg',
        height: 800,
        width: 1200,
      },
      huge: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-1600-c31b2feb3804a05fe8eedfdd536ca70a.jpeg',
        height: 1066,
        width: 1600,
      },
      icon: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-32-48a104f43dc2b16330e806641b07f361.jpeg',
        height: 21,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-800-324468051a4489ebeac4f3c03efdd291.jpeg',
        height: 533,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-1000-9a448d55ba29e463db28ec120d491c18.jpeg',
        height: 666,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-16-420ee82391b08ac55d735d1192b64b42.jpeg',
        height: 10,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-300-0374c5018e056a5a83a3e98beac34704.jpeg',
        height: 200,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-200-a20acc18f89df7c54c69096e388a93ef.jpeg',
        height: 133,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-400-dfb422c8d44f096f0bfc8920cbbbf639.jpeg',
        height: 266,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-600-d5b9935df00ef8309478ec1e79efd5b0.jpeg',
        height: 400,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-128-4376443d1a6699dd63b79faa0df6e67c.jpeg',
        height: 85,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/@@images/image-64-bc00e470a493a3df12d97ddae2a1173b.jpeg',
        height: 42,
        width: 64,
      },
    },
    size: 1195679,
    width: 6240,
  },
  image_caption: 'Is this just fantasy?',
  is_folderish: true,
  items: [
    {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova',
      '@type': 'Documento',
      description: 'No escape from reality',
      design_italia_meta_type: 'Documento',
      has_children: true,
      id: 'doc-prova',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Doc prova',
    },
  ],
  items_total: 0,
  language: {
    title: 'Italiano',
    token: 'it',
  },
  layout: 'modulistica_view',
  lock: {
    locked: false,
    stealable: true,
  },
  modified: '2023-01-30T11:13:06+00:00',
  next_item: {},
  opengraph_description: null,
  opengraph_image: null,
  opengraph_title: null,
  parent: {
    '@id': 'http://localhost:3000/documenti-e-dati',
    '@type': 'Document',
    description:
      'Donec in consequat nunc. Duis semper fermentum lacus, ac condimentum justo auctor a. Nam erat erat, porta vel pharetra in, ullamcorper vel turpis.',
    design_italia_meta_type: 'Pagina',
    has_children: true,
    id: 'documenti-e-dati',
    image_field: null,
    image_scales: null,
    review_state: 'published',
    title: 'Documenti e dati',
  },
  preview_caption: null,
  preview_image: null,
  previous_item: {
    '@id': 'http://localhost:3000/documenti-e-dati/bandi',
    '@type': 'Document',
    description: '',
    title: 'Bandi',
  },
  related_news: [],
  review_state: 'private',
  rights: '',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  servizi_collegati: [],
  subjects: [],
  title: 'Cartella modulistica',
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
  modulisticaItems: {
    error: null,
    data: {
      items: [
        {
          '@id':
            'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova',
          '@type': 'Documento',
          description: 'No escape from reality',
          design_italia_meta_type: 'Documento',
          id: 'doc-prova',
          image_field: null,
          image_scales: null,
          review_state: 'private',
          title: 'Doc prova',
        },
      ],
    },
    loading: false,
    loaded: true,
  },
});

test('renders all mandatory fields in the page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CartellaModulisticaView content={mock_mandatory} />
      </MemoryRouter>
    </Provider>,
  );

  //title
  expect(
    screen.getByRole('heading', { name: /Cartella modulistica/i }),
  ).toBeInTheDocument();
});

test('renders all non-mandatory fields in the page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CartellaModulisticaView content={mock_allfields} />
      </MemoryRouter>
    </Provider>,
  );

  //descrizione
  expect(screen.getByText(/Is this the real life?/i)).toBeInTheDocument();
  //immagine di testata
  expect(screen.getByAltText(/Cartella modulistica/i)).toBeInTheDocument();
  //didascalia immagine di testata --> non appare
  expect(screen.getByText(/Is this just fantasy?/i)).toBeInTheDocument();

  //items
  expect(screen.getByRole('link', { name: /Doc prova/i })).toBeInTheDocument();
});
