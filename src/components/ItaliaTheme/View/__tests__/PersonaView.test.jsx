import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonaView from '../PersonaView/PersonaView';
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
  '@id':
    'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti',
  '@type': 'Persona',
  UID: '7c44aadc618442dda119259aabbd634a',
  title: 'Gianluca Luchetti',
  contact_info: [
    {
      '@id':
        'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
      '@type': 'PuntoDiContatto',
      description: '',
      design_italia_meta_type: 'Punto di Contatto',
      effective: null,
      has_children: false,
      id: 'arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title:
        "Arciconfraternita del Gonfalone sotto l’invocazione di Sant'Efisio martire",
      value_punto_contatto: [
        {
          pdc_type: 'phone',
          pdc_value: '+39 070 668632',
        },
        {
          pdc_type: 'web',
          pdc_value: 'www.festadisantelfisio.com',
        },
        {
          pdc_type: 'email',
          pdc_value: 'arcisantefisio@tiscali.it',
        },
      ],
    },
  ],
  items: [],
};

const mock_allfields = {
  ...mock_mandatory,
  '@id': 'http://loremipsum.it/aguzzoli-claudia-dana',
  atto_nomina: null,
  biografia: {
    blocks: {
      '49066162-9327-4aa7-930c-ebc24971bfef': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'att33',
              text: 'No escape from reality',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['49066162-9327-4aa7-930c-ebc24971bfef'],
    },
  },
  changeNote: '',
  competenze: {
    'content-type': 'text/html',
    data: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in pharetra nunc, in finibus sapien. Donec eu venenatis dolor, sit amet dignissim sem. Mauris vulputate, enim at vestibulum euismod, quam risus vulputate erat, a varius tortor tellus in metus. Nulla cursus lobortis metus. Pellentesque vehicula risus tincidunt, ornare nisl non, convallis turpis. Nam convallis nulla id neque condimentum hendrerit. Proin ac tincidunt eros, quis fringilla dolor. Duis vitae arcu nibh.</p>\n<p>Donec non urna enim. Nulla mattis accumsan mauris ut sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius lacus sed turpis mollis, in volutpat magna lobortis. Nam erat enim, placerat eget orci nec, consequat efficitur arcu. Nunc auctor, augue in egestas posuere, eros velit auctor dui, in lacinia urna dolor id libero. Proin ac tincidunt ligula. Ut dictum dignissim aliquet. Donec in quam fringilla, fringilla ante sit amet, faucibus libero. Pellentesque a metus ante. Mauris iaculis pellentesque nisl vel vehicula.</p>',
    encoding: 'utf-8',
  },
  curriculum_vitae: {
    'content-type': 'application/pdf',
    download: 'http://loremipsum.doc',
    filename: '907122.pdf',
    size: 57203,
  },
  // data_conclusione_incarico: '2020-03-13',
  // data_insediamento: '2020-03-12',
  deleghe: {
    blocks: {
      '792eac6b-5110-4878-9c11-31ef3de20c45': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '5hop7',
              text: 'Caught in a landside',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['792eac6b-5110-4878-9c11-31ef3de20c45'],
    },
  },
  description: 'Is this the real life?',
  design_italia_meta_type: 'Persona pubblica',
  effective: null,
  exclude_from_nav: false,
  expires: null,
  foto_persona: {
    'content-type': 'image/jpeg',
    download:
      'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-6240-d31400b093b5122378386bfcbfcbadef.jpeg',
    filename: 'woman-having-online-meeting-work.jpg',
    height: 4160,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-250-4415efecba55f5c3b7855d316c282803.jpeg',
        height: 166,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-1200-8362c0aa18afb393870557831338e877.jpeg',
        height: 800,
        width: 1200,
      },
      huge: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-1600-5870178455c80ebd71ab45f2ad13a723.jpeg',
        height: 1066,
        width: 1600,
      },
      icon: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-32-5ca5f6d23481ec4c66837ea5651e7d36.jpeg',
        height: 21,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-800-68fd8822e74c7ae1a2543164ddd90893.jpeg',
        height: 533,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-1000-9eff05079ce70e130cf0933f7a452d51.jpeg',
        height: 666,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-16-b38ed561b94559c62ae52844b0d1047b.jpeg',
        height: 10,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-300-a55ee7f9e782c431b17d7235120ed3d8.jpeg',
        height: 200,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-200-0709de767e7a6265ef39e5487a2e56a1.jpeg',
        height: 133,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-400-5eeb9a3af2c47d6706343b334c38961c.jpeg',
        height: 266,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-600-75da0c04427678563fc513045d897d12.jpeg',
        height: 400,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-128-3ae9e59c013b3ac965c5dd6b0ad1734b.jpeg',
        height: 85,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/@@images/foto_persona-64-beefd05f0c84aa0004daf27d1a940e6c.jpeg',
        height: 42,
        width: 64,
      },
    },
    size: 1195679,
    width: 6240,
  },
  id: 'gianluca-luchetti',
  incarichi_persona: [
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/incarichi/incaricone',
      '@type': 'Incarico',
      compensi: {
        blocks: {},
        blocks_layout: {
          items: [],
        },
      },
      data_inizio_incarico: '2023-01-01',
      description: '',
      design_italia_meta_type: 'Incarico',
      effective: null,
      has_children: true,
      id: 'incaricone',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      tipologia_incarico: 'Politico',
      title: 'Incaricone',
    },
  ],
  is_folderish: true,
  items: [
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/foto-e-attivita-politica',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'foto-e-attivita-politica',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Foto e attività politica',
    },
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/curriculum-vitae',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'curriculum-vitae',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Curriculum vitae',
    },
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/situazione-patrimoniale',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'situazione-patrimoniale',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Situazione patrimoniale',
    },
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/dichiarazione-dei-redditi',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'dichiarazione-dei-redditi',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Dichiarazione dei redditi',
    },
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/spese-elettorali',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'spese-elettorali',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Spese elettorali',
    },
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/variazione-situazione-patrimoniale',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'variazione-situazione-patrimoniale',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Variazione situazione patrimoniale',
    },
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/altre-cariche',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'altre-cariche',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Altre cariche',
    },
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti/incarichi',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'incarichi',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Incarichi',
    },
  ],
  items_total: 8,
  language: {
    title: 'Italiano',
    token: 'it',
  },
  layout: 'view',
  lock: {
    locked: false,
    stealable: true,
  },
  modified: '2023-01-26T14:28:10+00:00',
  next_item: {},
  opengraph_description: null,
  opengraph_image: null,
  opengraph_title: null,
  organizzazione_riferimento: [
    {
      '@id':
        'http://localhost:3000/amministrazione/enti-e-fondazioni/copy_of_arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
      '@type': 'UnitaOrganizzativa',
      address: '',
      circoscrizione: null,
      city: null,
      contact_info: [
        {
          '@id':
            'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
          '@type': 'PuntoDiContatto',
          description: '',
          design_italia_meta_type: 'Punto di Contatto',
          has_children: false,
          id: 'arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
          image_field: null,
          image_scales: null,
          review_state: 'private',
          title:
            "Arciconfraternita del Gonfalone sotto l’invocazione di Sant'Efisio martire",
          value_punto_contatto: [
            {
              pdc_type: 'phone',
              pdc_value: '+39 070 668632',
            },
            {
              pdc_type: 'web',
              pdc_value: 'www.festadisantelfisio.com',
            },
            {
              pdc_type: 'email',
              pdc_value: 'arcisantefisio@tiscali.it',
            },
          ],
        },
      ],
      description: '',
      design_italia_meta_type: 'Unita Organizzativa',
      effective: null,
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      has_children: true,
      id: 'copy_of_arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
      image_field: null,
      image_scales: null,
      nome_sede: null,
      quartiere: null,
      review_state: 'private',
      street: "Via Sant'Efisio, 14",
      title:
        "Arciconfraternita del Gonfalone sotto l’invocazione di Sant'Efisio martire",
      zip_code: '09124',
    },
  ],
  parent: {
    '@id': 'http://localhost:3000/amministrazione/personale-amministrativo',
    '@type': 'Document',
    description: '',
    design_italia_meta_type: 'Pagina',
    has_children: true,
    id: 'personale-amministrativo',
    image_field: null,
    image_scales: null,
    review_state: 'private',
    title: 'Personale Amministrativo',
  },
  previous_item: {
    '@id':
      'http://localhost:3000/amministrazione/personale-amministrativo/franco-franchini',
    '@type': 'Persona',
    description: '',
    title: 'Franco Franchini',
  },
  relatedItems: [
    {
      '@id':
        'http://localhost:3000/amministrazione/uffici/gestione-impianti-sportivi',
      '@type': 'UnitaOrganizzativa',
      address: '',
      circoscrizione: null,
      city: null,
      contact_info: {
        blocks: {
          '65589e29-7a43-4979-bf71-6f46503a70a2': {
            '@type': 'text',
          },
        },
        blocks_layout: {
          items: ['65589e29-7a43-4979-bf71-6f46503a70a2'],
        },
      },
      description: '',
      design_italia_meta_type: 'Unita Organizzativa',
      effective: null,
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      has_children: true,
      id: 'gestione-impianti-sportivi',
      image_field: null,
      image_scales: null,
      nome_sede: null,
      quartiere: null,
      review_state: 'private',
      street: 'Via Dei Transiti 21',
      title: 'Gestione impianti sportivi',
      zip_code: '50302',
    },
  ],
  related_news: [],
  review_state: 'private',
  rights: '',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  subjects: [],
  ulteriori_informazioni: {
    blocks: {
      'f11ecf5a-7248-49d5-95d8-970c05577860': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '71kmg',
              text: 'Open your eyes',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['f11ecf5a-7248-49d5-95d8-970c05577860'],
    },
  },
  version: 'current',
  versioning_enabled: true,
  working_copy: null,
  working_copy_of: null,
};

const mock_allfields_and_fine_rapporto = {
  ...mock_allfields,
  // data_conclusione_incarico: '2020-03-13',
};

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  search: {
    error: null,
    items: [],
    total: 0,
    loaded: false,
    loading: false,
    batching: {},
    subrequests: {},
  },
  content: {
    data: {
      is_folderish: true,
    },

    subrequests: {
      '/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire':
        {
          loading: false,
          loaded: true,
          error: null,
          data: {
            '@components': {
              actions: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@actions',
              },
              aliases: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@aliases',
              },
              breadcrumbs: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@breadcrumbs',
              },
              contextnavigation: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@contextnavigation',
              },
              navigation: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@navigation',
              },
              subsite: {},
              translations: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@translations',
              },
              types: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@types',
              },
              workflow: {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire/@workflow',
              },
            },
            '@id':
              'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
            '@type': 'PuntoDiContatto',
            UID: '148e587018dc453aaefa9d04895b18a4',
            allow_discussion: false,
            changeNote: '',
            contributors: [],
            created: '2023-01-04T13:22:45+00:00',
            creators: ['admin'],
            description: '',
            design_italia_meta_type: 'Punto di Contatto',
            effective: null,
            exclude_from_nav: false,
            expires: null,
            id: 'arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
            is_folderish: true,
            items: [],
            items_total: 0,
            language: {
              title: 'Italiano',
              token: 'it',
            },
            layout: 'view',
            lock: {
              locked: false,
              stealable: true,
            },
            modified: '2023-01-04T13:22:45+00:00',
            next_item: {
              '@id':
                'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire-1',
              '@type': 'PuntoDiContatto',
              description: '',
              title:
                "Arciconfraternita del Gonfalone sotto l’invocazione di Sant'Efisio martire",
            },
            opengraph_description: null,
            opengraph_image: null,
            opengraph_title: null,
            parent: {
              '@id': 'http://localhost:3000/amministrazione/enti-e-fondazioni',
              '@type': 'Document',
              description: '',
              design_italia_meta_type: 'Pagina',
              has_children: true,
              id: 'enti-e-fondazioni',
              image_field: null,
              image_scales: null,
              review_state: 'private',
              title: 'Enti e fondazioni',
            },
            persona: [],
            persone_correlate: [
              {
                '@id':
                  'http://localhost:3000/amministrazione/personale-amministrativo/gianluca-luchetti',
                '@type': 'Persona',
                description: '',
                design_italia_meta_type: 'Persona pubblica',
                has_children: true,
                id: 'gianluca-luchetti',
                image_field: 'foto_persona',
                image_scales: {
                  foto_persona: [null],
                },
                incarichi: '',
                review_state: 'private',
                title: 'Gianluca Luchetti',
              },
            ],
            previous_item: {},
            relatedItems: [],
            related_news: [
              {
                '@id':
                  'http://localhost:3000/notizie/sport-nel-verde-le-iniziative-della-prossima-edizione',
                '@type': 'News Item',
                description:
                  'Le informazioni per partecipare all’iniziativa rivolta a tutte le fasce d’età per promuovere l’attività motoria nelle aree verdi della città.',
                design_italia_meta_type: 'Notizia',
                effective: '2022-05-18T16:29:00+00:00',
                has_children: true,
                id: 'sport-nel-verde-le-iniziative-della-prossima-edizione',
                image_field: 'preview_image',
                image_scales: {
                  image: [
                    {
                      'content-type': 'image/jpeg',
                      download:
                        '@@images/image-5184-f5098a6120bf6d77120ade51613b2421.jpeg',
                      filename: 'national-cancer-institute.jpeg',
                      height: 3456,
                      scales: {
                        gallery: {
                          download:
                            '@@images/image-250-49e5f5fa9627f9d116e937bd76654091.jpeg',
                          height: 166,
                          width: 250,
                        },
                        great: {
                          download:
                            '@@images/image-1200-920af22d3d8bf83ea467faf60f9d1888.jpeg',
                          height: 800,
                          width: 1200,
                        },
                        huge: {
                          download:
                            '@@images/image-1600-20c3c7b9940aabb51143abaa6e0e50a3.jpeg',
                          height: 1066,
                          width: 1600,
                        },
                        icon: {
                          download:
                            '@@images/image-32-82fdf55155a2dd6ea29d4467222f2392.jpeg',
                          height: 21,
                          width: 32,
                        },
                        large: {
                          download:
                            '@@images/image-800-6348765c039dd3268da9c9d829e7ec19.jpeg',
                          height: 533,
                          width: 800,
                        },
                        larger: {
                          download:
                            '@@images/image-1000-e09f88650a7cbc0da9d4736b6d0d952c.jpeg',
                          height: 666,
                          width: 1000,
                        },
                        listing: {
                          download:
                            '@@images/image-16-c6380d7d7b8b4afd993b24ac200bc230.jpeg',
                          height: 10,
                          width: 16,
                        },
                        midi: {
                          download:
                            '@@images/image-300-8d4e411695d01225d8c6be3993ec3c30.jpeg',
                          height: 200,
                          width: 300,
                        },
                        mini: {
                          download:
                            '@@images/image-200-14acaa28232fb3c8309da5c5f7933e1e.jpeg',
                          height: 133,
                          width: 200,
                        },
                        preview: {
                          download:
                            '@@images/image-400-6e346e702da96058e48158d271e7043b.jpeg',
                          height: 266,
                          width: 400,
                        },
                        teaser: {
                          download:
                            '@@images/image-600-3975f8c82120189ece436677f5b3e6a9.jpeg',
                          height: 400,
                          width: 600,
                        },
                        thumb: {
                          download:
                            '@@images/image-128-f6ce4305a76b4511e1e10c50a1c1b4da.jpeg',
                          height: 85,
                          width: 128,
                        },
                        tile: {
                          download:
                            '@@images/image-64-19669a6cef991ed40ef389ceb5da32fd.jpeg',
                          height: 42,
                          width: 64,
                        },
                      },
                      size: 2026538,
                      width: 5184,
                    },
                  ],
                  preview_image: [
                    {
                      'content-type': 'image/jpeg',
                      download:
                        '@@images/preview_image-5184-3c6c2e4f0b75f9365405305f562fd0da.jpeg',
                      filename: 'national-cancer-institute.jpeg',
                      height: 3456,
                      scales: {
                        gallery: {
                          download:
                            '@@images/preview_image-250-785408520e6d7b9d05af2fedfee78d2a.jpeg',
                          height: 166,
                          width: 250,
                        },
                        great: {
                          download:
                            '@@images/preview_image-1200-d3de0810040f56632ddb5e9bbb96003b.jpeg',
                          height: 800,
                          width: 1200,
                        },
                        huge: {
                          download:
                            '@@images/preview_image-1600-8ea0c1ee6cbde7232a7124d084c81a18.jpeg',
                          height: 1066,
                          width: 1600,
                        },
                        icon: {
                          download:
                            '@@images/preview_image-32-d795572814924a541bee314c2c150084.jpeg',
                          height: 21,
                          width: 32,
                        },
                        large: {
                          download:
                            '@@images/preview_image-800-8ab6a0ebc1f0a2385fb37c1d9849f9b4.jpeg',
                          height: 533,
                          width: 800,
                        },
                        larger: {
                          download:
                            '@@images/preview_image-1000-427e67a155fac6e94a7a64a27f00a4dd.jpeg',
                          height: 666,
                          width: 1000,
                        },
                        listing: {
                          download:
                            '@@images/preview_image-16-12a9a305b32c8dd7ccccccb73dcf187a.jpeg',
                          height: 10,
                          width: 16,
                        },
                        midi: {
                          download:
                            '@@images/preview_image-300-ca5dac141c26dbfeda9ba058c401f76d.jpeg',
                          height: 200,
                          width: 300,
                        },
                        mini: {
                          download:
                            '@@images/preview_image-200-3f6749e2cdff7873580b38b38f8fe5cf.jpeg',
                          height: 133,
                          width: 200,
                        },
                        preview: {
                          download:
                            '@@images/preview_image-400-7973bb70be8915dd5731c5872144c2fc.jpeg',
                          height: 266,
                          width: 400,
                        },
                        teaser: {
                          download:
                            '@@images/preview_image-600-6f040ff8785b40296d1148a89821f4f7.jpeg',
                          height: 400,
                          width: 600,
                        },
                        thumb: {
                          download:
                            '@@images/preview_image-128-23aec0db095cf60152ee0eead83433d7.jpeg',
                          height: 85,
                          width: 128,
                        },
                        tile: {
                          download:
                            '@@images/preview_image-64-da2dbe6b589040648dd782cc4196fb25.jpeg',
                          height: 42,
                          width: 64,
                        },
                      },
                      size: 2026538,
                      width: 5184,
                    },
                  ],
                },
                review_state: 'published',
                title: 'Sport nel verde: le iniziative della prossima edizione',
                typology: 'Notizia',
              },
              {
                '@id':
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo',
                '@type': 'News Item',
                description:
                  'Donec in consequat nunc. Duis semper fermentum lacus, ac condimentum justo auctor a. Nam erat erat, porta vel pharetra in, ullamcorper vel turpis.',
                design_italia_meta_type: 'Notizia',
                effective: '2019-12-03T11:09:00+00:00',
                has_children: true,
                id: 'osservatorio-sul-turismo',
                image_field: 'preview_image',
                image_scales: {
                  image: [
                    {
                      'content-type': 'image/png',
                      download:
                        '@@images/image-1156-23a6d691013f38eef4da7c9070b860d5.png',
                      filename: 'foto-ospedale.png',
                      height: 940,
                      scales: {
                        gallery: {
                          download:
                            '@@images/image-250-3f30dc5a4b324c2c81c729af40b7946a.png',
                          height: 203,
                          width: 250,
                        },
                        icon: {
                          download:
                            '@@images/image-32-26f7b27a252798f783b662aa7e1cdb63.png',
                          height: 26,
                          width: 32,
                        },
                        large: {
                          download:
                            '@@images/image-800-1b51f5a02768c18c02eb317738eee4a2.png',
                          height: 650,
                          width: 800,
                        },
                        larger: {
                          download:
                            '@@images/image-1000-cd7ea607a71d3ffa94c5b612317bcfc2.png',
                          height: 813,
                          width: 1000,
                        },
                        listing: {
                          download:
                            '@@images/image-16-45bfce0601794216b233cbf5615d4d1d.png',
                          height: 13,
                          width: 16,
                        },
                        midi: {
                          download:
                            '@@images/image-300-3800583f32decd4246ffa329d0d934b6.png',
                          height: 243,
                          width: 300,
                        },
                        mini: {
                          download:
                            '@@images/image-200-4592c49fa47d209224518c591edcd956.png',
                          height: 162,
                          width: 200,
                        },
                        preview: {
                          download:
                            '@@images/image-400-948d0d5f2676802a905c31469aa0744d.png',
                          height: 325,
                          width: 400,
                        },
                        teaser: {
                          download:
                            '@@images/image-600-8fe093861a4edcbf0ff7b79220b5e838.png',
                          height: 487,
                          width: 600,
                        },
                        thumb: {
                          download:
                            '@@images/image-128-41b926e6735616e649d55d747c9c36a2.png',
                          height: 104,
                          width: 128,
                        },
                        tile: {
                          download:
                            '@@images/image-64-aae52bf50eb77e0e934256a6974037a0.png',
                          height: 52,
                          width: 64,
                        },
                      },
                      size: 1296882,
                      width: 1156,
                    },
                  ],
                  preview_image: [
                    {
                      'content-type': 'image/png',
                      download:
                        '@@images/preview_image-1156-ec9dea8625d8a5dfeb472feeeaf2b569.png',
                      filename: 'foto-ospedale.png',
                      height: 940,
                      scales: {
                        gallery: {
                          download:
                            '@@images/preview_image-250-4b13c28cf0aca436a602cd984d040a69.png',
                          height: 203,
                          width: 250,
                        },
                        icon: {
                          download:
                            '@@images/preview_image-32-cccba83547d44ee65113371774a6e9b2.png',
                          height: 26,
                          width: 32,
                        },
                        large: {
                          download:
                            '@@images/preview_image-800-1c9b8e39510a6ef2bbe0806cc7c1818d.png',
                          height: 650,
                          width: 800,
                        },
                        larger: {
                          download:
                            '@@images/preview_image-1000-be8bb924f3892cd2319c2e8a4503e850.png',
                          height: 813,
                          width: 1000,
                        },
                        listing: {
                          download:
                            '@@images/preview_image-16-d93ca5f96a5a3c8a554475e267ea332e.png',
                          height: 13,
                          width: 16,
                        },
                        midi: {
                          download:
                            '@@images/preview_image-300-b3daa8b10d5c2edf34e0378e811fc002.png',
                          height: 243,
                          width: 300,
                        },
                        mini: {
                          download:
                            '@@images/preview_image-200-1e874d5503c99c483643f1ef72e02dac.png',
                          height: 162,
                          width: 200,
                        },
                        preview: {
                          download:
                            '@@images/preview_image-400-27fb29056f75dbdab8252011dc243cd1.png',
                          height: 325,
                          width: 400,
                        },
                        teaser: {
                          download:
                            '@@images/preview_image-600-967d14e77d8e5293d36c32ed24d2f908.png',
                          height: 487,
                          width: 600,
                        },
                        thumb: {
                          download:
                            '@@images/preview_image-128-bcfbd8ee03a1e56a79ce1e557baec9ac.png',
                          height: 104,
                          width: 128,
                        },
                        tile: {
                          download:
                            '@@images/preview_image-64-519a94460297b1ab1f06411fcec19842.png',
                          height: 52,
                          width: 64,
                        },
                      },
                      size: 1296882,
                      width: 1156,
                    },
                  ],
                },
                review_state: 'private',
                title: 'Osservatorio sul turismo',
                typology: 'Notizia',
              },
              {
                '@id':
                  'http://localhost:3000/notizie/chiusa-per-ristrutturazione-la-piscina-minghetti',
                '@type': 'News Item',
                description:
                  'Partiti i lavori per l’adeguamento dell’impianto. La riapertura è prevista per giugno 2023.',
                design_italia_meta_type: 'avviso',
                effective: null,
                has_children: true,
                id: 'chiusa-per-ristrutturazione-la-piscina-minghetti',
                image_field: '',
                image_scales: null,
                review_state: 'private',
                title: 'Chiusa per ristrutturazione la piscina Minghetti',
                typology: 'avviso',
              },
            ],
            review_state: 'private',
            rights: '',
            seo_canonical_url: null,
            seo_description: null,
            seo_noindex: null,
            seo_title: null,
            strutture_correlate: [
              {
                '@id':
                  'http://localhost:3000/amministrazione/enti-e-fondazioni/copy_of_arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
                '@type': 'UnitaOrganizzativa',
                address: '',
                circoscrizione: null,
                city: null,
                contact_info: [
                  {
                    '@id':
                      'http://localhost:3000/amministrazione/enti-e-fondazioni/arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
                    '@type': 'PuntoDiContatto',
                    description: '',
                    design_italia_meta_type: 'Punto di Contatto',
                    has_children: false,
                    id: 'arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
                    image_field: null,
                    image_scales: null,
                    review_state: 'private',
                    title:
                      "Arciconfraternita del Gonfalone sotto l’invocazione di Sant'Efisio martire",
                    value_punto_contatto: [
                      {
                        pdc_type: 'phone',
                        pdc_value: '+39 070 668632',
                      },
                      {
                        pdc_type: 'web',
                        pdc_value: 'www.festadisantelfisio.com',
                      },
                      {
                        pdc_type: 'email',
                        pdc_value: 'arcisantefisio@tiscali.it',
                      },
                    ],
                  },
                ],
                description: '',
                design_italia_meta_type: 'Unita Organizzativa',
                geolocation: {
                  latitude: 0,
                  longitude: 0,
                },
                has_children: true,
                id: 'copy_of_arciconfraternita-del-gonfalone-sotto-linvocazione-di-santefisio-martire',
                image_field: null,
                image_scales: null,
                nome_sede: null,
                quartiere: null,
                review_state: 'private',
                street: "Via Sant'Efisio, 14",
                title:
                  "Arciconfraternita del Gonfalone sotto l’invocazione di Sant'Efisio martire",
                zip_code: '09124',
              },
            ],
            subjects: [],
            title:
              "Arciconfraternita del Gonfalone sotto l’invocazione di Sant'Efisio martire",
            value_punto_contatto: [
              {
                pdc_type: 'phone',
                pdc_value: '+39 070 668632',
              },
              {
                pdc_type: 'web',
                pdc_value: 'www.festadisantelfisio.com',
              },
              {
                pdc_type: 'email',
                pdc_value: 'arcisantefisio@tiscali.it',
              },
            ],
            version: 'current',
            versioning_enabled: true,
            working_copy: null,
            working_copy_of: null,
          },
        },

      '/amministrazione/uffici/ufficio-delle-attivita-produttive': {
        loading: false,
        loaded: true,
        error: null,
        data: {
          '@components': {
            actions: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@actions',
            },
            aliases: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@aliases',
            },
            breadcrumbs: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@breadcrumbs',
            },
            contextnavigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@contextnavigation',
            },
            navigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@navigation',
            },
            subsite: {},
            translations: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@translations',
            },
            types: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@types',
            },
            workflow: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive/@workflow',
            },
          },
          '@id':
            'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive',
          '@type': 'PuntoDiContatto',
          UID: '9f6029b4eb94454590c674f83158af5f',
          allow_discussion: false,
          changeNote: '',
          contributors: [],
          created: '2023-01-04T13:44:17+00:00',
          creators: ['admin'],
          description: '',
          design_italia_meta_type: 'Punto di Contatto',
          effective: null,
          exclude_from_nav: false,
          expires: null,
          id: 'ufficio-delle-attivita-produttive',
          is_folderish: true,
          items: [],
          items_total: 0,
          language: {
            title: 'Italiano',
            token: 'it',
          },
          layout: 'view',
          lock: {
            locked: false,
            stealable: true,
          },
          modified: '2023-01-04T13:44:17+00:00',
          next_item: {
            '@id':
              'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1',
            '@type': 'UnitaOrganizzativa',
            description: '',
            title: 'Ufficio delle Attività Produttive',
          },
          opengraph_description: null,
          opengraph_image: null,
          opengraph_title: null,
          parent: {
            '@id': 'http://localhost:3000/amministrazione/uffici',
            '@type': 'Document',
            description: '',
            design_italia_meta_type: 'Pagina',
            has_children: true,
            id: 'uffici',
            image_field: null,
            image_scales: null,
            review_state: 'private',
            title: 'Uffici',
          },
          persona: [],
          persone_correlate: [
            {
              '@id':
                'http://localhost:3000/amministrazione/personale-amministrativo/franco-franchini',
              '@type': 'Persona',
              description: '',
              design_italia_meta_type: 'Persona pubblica',
              has_children: true,
              id: 'franco-franchini',
              image_field: 'foto_persona',
              image_scales: {
                foto_persona: [null],
              },
              incarichi: '',
              review_state: 'private',
              title: 'Franco Franchini',
            },
            {
              '@id':
                'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi',
              '@type': 'Persona',
              description: 'Assessore allo sport',
              design_italia_meta_type: 'Persona pubblica',
              has_children: true,
              id: 'gabriele-bianchi',
              image_field: 'foto_persona',
              image_scales: {
                foto_persona: [
                  {
                    'content-type': 'image/jpeg',
                    download:
                      'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-5184-a0948b7d7c2e6ec2944ea4915f5d0c4f.jpeg',
                    filename: 'national-cancer-institute.jpeg',
                    height: 3456,
                    scales: {
                      gallery: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-250-d009f9ee6746d6ada973aeb0e99437eb.jpeg',
                        height: 166,
                        width: 250,
                      },
                      great: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-1200-db22dc3240b650dc494ea6412e5c4e8c.jpeg',
                        height: 800,
                        width: 1200,
                      },
                      huge: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-1600-1a281d1182b9422a0211cb7cc5e156f2.jpeg',
                        height: 1066,
                        width: 1600,
                      },
                      icon: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-32-92c4797637f83c00ac27cba86b37cff5.jpeg',
                        height: 21,
                        width: 32,
                      },
                      large: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-800-d85755d485e32d0a1deba313de75711b.jpeg',
                        height: 533,
                        width: 800,
                      },
                      larger: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-1000-e88f96e2a0ed91917f9d728caf2d4406.jpeg',
                        height: 666,
                        width: 1000,
                      },
                      listing: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-16-37154ce0fea872870103d5fae1a29f61.jpeg',
                        height: 10,
                        width: 16,
                      },
                      midi: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-300-458fd003c0d1576f66035dbc1e8ab87e.jpeg',
                        height: 200,
                        width: 300,
                      },
                      mini: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-200-830b17e7b02da4853b079bc80c1c4e34.jpeg',
                        height: 133,
                        width: 200,
                      },
                      preview: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-400-f9e5f2efc8120f6e3351536b3f287196.jpeg',
                        height: 266,
                        width: 400,
                      },
                      teaser: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-600-001ddce8166a4c8bb2839212f9fb2430.jpeg',
                        height: 400,
                        width: 600,
                      },
                      thumb: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-128-d97983d9975606ed88ec6d2029e10ea9.jpeg',
                        height: 85,
                        width: 128,
                      },
                      tile: {
                        download:
                          'http://localhost:3000/amministrazione/personale-amministrativo/gabriele-bianchi/@@images/foto_persona-64-f7765a9f78ff6e0725ebee3534a782c8.jpeg',
                        height: 42,
                        width: 64,
                      },
                    },
                    size: 2026538,
                    width: 5184,
                  },
                ],
              },
              incarichi: 'Incarico di Gabriele Bianchi',
              review_state: 'private',
              title: 'Gabriele Bianchi',
            },
          ],
          previous_item: {
            '@id':
              'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo',
            '@type': 'UnitaOrganizzativa',
            description: '',
            title: 'Assessorato al Turismo',
          },
          relatedItems: [],
          related_news: [
            {
              '@id':
                'http://localhost:3000/notizie/sport-nel-verde-le-iniziative-della-prossima-edizione',
              '@type': 'News Item',
              description:
                'Le informazioni per partecipare all’iniziativa rivolta a tutte le fasce d’età per promuovere l’attività motoria nelle aree verdi della città.',
              design_italia_meta_type: 'Notizia',
              effective: '2022-05-18T16:29:00+00:00',
              has_children: true,
              id: 'sport-nel-verde-le-iniziative-della-prossima-edizione',
              image_field: 'preview_image',
              image_scales: {
                image: [
                  {
                    'content-type': 'image/jpeg',
                    download:
                      '@@images/image-5184-f5098a6120bf6d77120ade51613b2421.jpeg',
                    filename: 'national-cancer-institute.jpeg',
                    height: 3456,
                    scales: {
                      gallery: {
                        download:
                          '@@images/image-250-49e5f5fa9627f9d116e937bd76654091.jpeg',
                        height: 166,
                        width: 250,
                      },
                      great: {
                        download:
                          '@@images/image-1200-920af22d3d8bf83ea467faf60f9d1888.jpeg',
                        height: 800,
                        width: 1200,
                      },
                      huge: {
                        download:
                          '@@images/image-1600-20c3c7b9940aabb51143abaa6e0e50a3.jpeg',
                        height: 1066,
                        width: 1600,
                      },
                      icon: {
                        download:
                          '@@images/image-32-82fdf55155a2dd6ea29d4467222f2392.jpeg',
                        height: 21,
                        width: 32,
                      },
                      large: {
                        download:
                          '@@images/image-800-6348765c039dd3268da9c9d829e7ec19.jpeg',
                        height: 533,
                        width: 800,
                      },
                      larger: {
                        download:
                          '@@images/image-1000-e09f88650a7cbc0da9d4736b6d0d952c.jpeg',
                        height: 666,
                        width: 1000,
                      },
                      listing: {
                        download:
                          '@@images/image-16-c6380d7d7b8b4afd993b24ac200bc230.jpeg',
                        height: 10,
                        width: 16,
                      },
                      midi: {
                        download:
                          '@@images/image-300-8d4e411695d01225d8c6be3993ec3c30.jpeg',
                        height: 200,
                        width: 300,
                      },
                      mini: {
                        download:
                          '@@images/image-200-14acaa28232fb3c8309da5c5f7933e1e.jpeg',
                        height: 133,
                        width: 200,
                      },
                      preview: {
                        download:
                          '@@images/image-400-6e346e702da96058e48158d271e7043b.jpeg',
                        height: 266,
                        width: 400,
                      },
                      teaser: {
                        download:
                          '@@images/image-600-3975f8c82120189ece436677f5b3e6a9.jpeg',
                        height: 400,
                        width: 600,
                      },
                      thumb: {
                        download:
                          '@@images/image-128-f6ce4305a76b4511e1e10c50a1c1b4da.jpeg',
                        height: 85,
                        width: 128,
                      },
                      tile: {
                        download:
                          '@@images/image-64-19669a6cef991ed40ef389ceb5da32fd.jpeg',
                        height: 42,
                        width: 64,
                      },
                    },
                    size: 2026538,
                    width: 5184,
                  },
                ],
                preview_image: [
                  {
                    'content-type': 'image/jpeg',
                    download:
                      '@@images/preview_image-5184-3c6c2e4f0b75f9365405305f562fd0da.jpeg',
                    filename: 'national-cancer-institute.jpeg',
                    height: 3456,
                    scales: {
                      gallery: {
                        download:
                          '@@images/preview_image-250-785408520e6d7b9d05af2fedfee78d2a.jpeg',
                        height: 166,
                        width: 250,
                      },
                      great: {
                        download:
                          '@@images/preview_image-1200-d3de0810040f56632ddb5e9bbb96003b.jpeg',
                        height: 800,
                        width: 1200,
                      },
                      huge: {
                        download:
                          '@@images/preview_image-1600-8ea0c1ee6cbde7232a7124d084c81a18.jpeg',
                        height: 1066,
                        width: 1600,
                      },
                      icon: {
                        download:
                          '@@images/preview_image-32-d795572814924a541bee314c2c150084.jpeg',
                        height: 21,
                        width: 32,
                      },
                      large: {
                        download:
                          '@@images/preview_image-800-8ab6a0ebc1f0a2385fb37c1d9849f9b4.jpeg',
                        height: 533,
                        width: 800,
                      },
                      larger: {
                        download:
                          '@@images/preview_image-1000-427e67a155fac6e94a7a64a27f00a4dd.jpeg',
                        height: 666,
                        width: 1000,
                      },
                      listing: {
                        download:
                          '@@images/preview_image-16-12a9a305b32c8dd7ccccccb73dcf187a.jpeg',
                        height: 10,
                        width: 16,
                      },
                      midi: {
                        download:
                          '@@images/preview_image-300-ca5dac141c26dbfeda9ba058c401f76d.jpeg',
                        height: 200,
                        width: 300,
                      },
                      mini: {
                        download:
                          '@@images/preview_image-200-3f6749e2cdff7873580b38b38f8fe5cf.jpeg',
                        height: 133,
                        width: 200,
                      },
                      preview: {
                        download:
                          '@@images/preview_image-400-7973bb70be8915dd5731c5872144c2fc.jpeg',
                        height: 266,
                        width: 400,
                      },
                      teaser: {
                        download:
                          '@@images/preview_image-600-6f040ff8785b40296d1148a89821f4f7.jpeg',
                        height: 400,
                        width: 600,
                      },
                      thumb: {
                        download:
                          '@@images/preview_image-128-23aec0db095cf60152ee0eead83433d7.jpeg',
                        height: 85,
                        width: 128,
                      },
                      tile: {
                        download:
                          '@@images/preview_image-64-da2dbe6b589040648dd782cc4196fb25.jpeg',
                        height: 42,
                        width: 64,
                      },
                    },
                    size: 2026538,
                    width: 5184,
                  },
                ],
              },
              review_state: 'published',
              title: 'Sport nel verde: le iniziative della prossima edizione',
              typology: 'Notizia',
            },
            {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo',
              '@type': 'News Item',
              description:
                'Donec in consequat nunc. Duis semper fermentum lacus, ac condimentum justo auctor a. Nam erat erat, porta vel pharetra in, ullamcorper vel turpis.',
              design_italia_meta_type: 'Notizia',
              effective: '2019-12-03T11:09:00+00:00',
              has_children: true,
              id: 'osservatorio-sul-turismo',
              image_field: 'preview_image',
              image_scales: {
                image: [
                  {
                    'content-type': 'image/png',
                    download:
                      '@@images/image-1156-23a6d691013f38eef4da7c9070b860d5.png',
                    filename: 'foto-ospedale.png',
                    height: 940,
                    scales: {
                      gallery: {
                        download:
                          '@@images/image-250-3f30dc5a4b324c2c81c729af40b7946a.png',
                        height: 203,
                        width: 250,
                      },
                      icon: {
                        download:
                          '@@images/image-32-26f7b27a252798f783b662aa7e1cdb63.png',
                        height: 26,
                        width: 32,
                      },
                      large: {
                        download:
                          '@@images/image-800-1b51f5a02768c18c02eb317738eee4a2.png',
                        height: 650,
                        width: 800,
                      },
                      larger: {
                        download:
                          '@@images/image-1000-cd7ea607a71d3ffa94c5b612317bcfc2.png',
                        height: 813,
                        width: 1000,
                      },
                      listing: {
                        download:
                          '@@images/image-16-45bfce0601794216b233cbf5615d4d1d.png',
                        height: 13,
                        width: 16,
                      },
                      midi: {
                        download:
                          '@@images/image-300-3800583f32decd4246ffa329d0d934b6.png',
                        height: 243,
                        width: 300,
                      },
                      mini: {
                        download:
                          '@@images/image-200-4592c49fa47d209224518c591edcd956.png',
                        height: 162,
                        width: 200,
                      },
                      preview: {
                        download:
                          '@@images/image-400-948d0d5f2676802a905c31469aa0744d.png',
                        height: 325,
                        width: 400,
                      },
                      teaser: {
                        download:
                          '@@images/image-600-8fe093861a4edcbf0ff7b79220b5e838.png',
                        height: 487,
                        width: 600,
                      },
                      thumb: {
                        download:
                          '@@images/image-128-41b926e6735616e649d55d747c9c36a2.png',
                        height: 104,
                        width: 128,
                      },
                      tile: {
                        download:
                          '@@images/image-64-aae52bf50eb77e0e934256a6974037a0.png',
                        height: 52,
                        width: 64,
                      },
                    },
                    size: 1296882,
                    width: 1156,
                  },
                ],
                preview_image: [
                  {
                    'content-type': 'image/png',
                    download:
                      '@@images/preview_image-1156-ec9dea8625d8a5dfeb472feeeaf2b569.png',
                    filename: 'foto-ospedale.png',
                    height: 940,
                    scales: {
                      gallery: {
                        download:
                          '@@images/preview_image-250-4b13c28cf0aca436a602cd984d040a69.png',
                        height: 203,
                        width: 250,
                      },
                      icon: {
                        download:
                          '@@images/preview_image-32-cccba83547d44ee65113371774a6e9b2.png',
                        height: 26,
                        width: 32,
                      },
                      large: {
                        download:
                          '@@images/preview_image-800-1c9b8e39510a6ef2bbe0806cc7c1818d.png',
                        height: 650,
                        width: 800,
                      },
                      larger: {
                        download:
                          '@@images/preview_image-1000-be8bb924f3892cd2319c2e8a4503e850.png',
                        height: 813,
                        width: 1000,
                      },
                      listing: {
                        download:
                          '@@images/preview_image-16-d93ca5f96a5a3c8a554475e267ea332e.png',
                        height: 13,
                        width: 16,
                      },
                      midi: {
                        download:
                          '@@images/preview_image-300-b3daa8b10d5c2edf34e0378e811fc002.png',
                        height: 243,
                        width: 300,
                      },
                      mini: {
                        download:
                          '@@images/preview_image-200-1e874d5503c99c483643f1ef72e02dac.png',
                        height: 162,
                        width: 200,
                      },
                      preview: {
                        download:
                          '@@images/preview_image-400-27fb29056f75dbdab8252011dc243cd1.png',
                        height: 325,
                        width: 400,
                      },
                      teaser: {
                        download:
                          '@@images/preview_image-600-967d14e77d8e5293d36c32ed24d2f908.png',
                        height: 487,
                        width: 600,
                      },
                      thumb: {
                        download:
                          '@@images/preview_image-128-bcfbd8ee03a1e56a79ce1e557baec9ac.png',
                        height: 104,
                        width: 128,
                      },
                      tile: {
                        download:
                          '@@images/preview_image-64-519a94460297b1ab1f06411fcec19842.png',
                        height: 52,
                        width: 64,
                      },
                    },
                    size: 1296882,
                    width: 1156,
                  },
                ],
              },
              review_state: 'private',
              title: 'Osservatorio sul turismo',
              typology: 'Notizia',
            },
            {
              '@id':
                'http://localhost:3000/notizie/chiusa-per-ristrutturazione-la-piscina-minghetti',
              '@type': 'News Item',
              description:
                'Partiti i lavori per l’adeguamento dell’impianto. La riapertura è prevista per giugno 2023.',
              design_italia_meta_type: 'avviso',
              effective: null,
              has_children: true,
              id: 'chiusa-per-ristrutturazione-la-piscina-minghetti',
              image_field: '',
              image_scales: null,
              review_state: 'private',
              title: 'Chiusa per ristrutturazione la piscina Minghetti',
              typology: 'avviso',
            },
          ],
          review_state: 'private',
          rights: '',
          seo_canonical_url: null,
          seo_description: null,
          seo_noindex: null,
          seo_title: null,
          strutture_correlate: [
            {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1',
              '@type': 'UnitaOrganizzativa',
              address: '',
              circoscrizione: null,
              city: null,
              contact_info: [
                {
                  '@id':
                    'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive',
                  '@type': 'PuntoDiContatto',
                  description: '',
                  design_italia_meta_type: 'Punto di Contatto',
                  has_children: false,
                  id: 'ufficio-delle-attivita-produttive',
                  image_field: null,
                  image_scales: null,
                  review_state: 'private',
                  title: 'Ufficio delle Attività Produttive',
                  value_punto_contatto: [
                    {
                      pdc_type: 'phone',
                      pdc_value: '+39 070 6776430',
                    },
                    {
                      pdc_type: 'email',
                      pdc_value: 'produttive@comune.cagliari.it',
                    },
                  ],
                },
              ],
              description: '',
              design_italia_meta_type: 'Unita Organizzativa',
              geolocation: {
                latitude: 0,
                longitude: 0,
              },
              has_children: true,
              id: 'ufficio-delle-attivita-produttive-1',
              image_field: null,
              image_scales: null,
              nome_sede: null,
              quartiere: null,
              review_state: 'private',
              street: null,
              title: 'Ufficio delle Attività Produttive',
              zip_code: null,
            },
          ],
          subjects: [],
          title: 'Ufficio delle Attività Produttive',
          value_punto_contatto: [
            {
              pdc_type: 'phone',
              pdc_value: '+39 070 6776430',
            },
            {
              pdc_type: 'email',
              pdc_value: 'produttive@comune.cagliari.it',
            },
          ],
          version: 'current',
          versioning_enabled: true,
          working_copy: null,
          working_copy_of: null,
        },
      },
    },
  },
});

test('expect to have all mandatory fields in page', async () => {
  const { getByText, getByRole, debug } = render(
    <Provider store={store}>
      <MemoryRouter>
        <PersonaView content={mock_mandatory} />
      </MemoryRouter>
    </Provider>,
  );

  // title
  expect(
    screen.getByRole('heading', { name: /Gianluca Luchetti/i }),
  ).toBeInTheDocument();

  // punti di contatto
  expect(
    screen.getByRole('heading', { name: /Contatti/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: /Arciconfraternita del Gonfalone sotto/i,
      exact: false,
    }),
  ).toBeInTheDocument();
});

test('expect to have all non-mandatory fields in page', async () => {
  const { getByText, getByAltText, debug } = render(
    <Provider store={store}>
      <MemoryRouter>
        <PersonaView content={mock_allfields} />
      </MemoryRouter>
    </Provider>,
  );

  // atto_nomina
  expect(getByText(/Atto di nomina/i)).toBeInTheDocument();

  //foto
  expect(screen.getByAltText(/Gianluca Luchetti/i)).toBeInTheDocument();

  //incarichi persona
  expect(
    screen.getByRole('heading', { name: /Incarico/, exact: true }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Incaricone/i)).toBeInTheDocument();

  // curriculum_vitae
  expect(getByText(/Curriculum vitae/i)).toBeInTheDocument();

  // competenze
  expect(
    screen.getByRole('heading', { name: /competenze/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Is this just fantasy?/i)).toBeInTheDocument();

  // deleghe
  expect(screen.getByRole('heading', { name: /deleghe/i })).toBeInTheDocument();
  expect(screen.getByText(/Caught in a landside/i)).toBeInTheDocument();

  // biografia
  expect(
    screen.getByRole('heading', { name: /biografia/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/No escape from reality/i)).toBeInTheDocument();

  // curriculum vitae
  expect(
    screen.getByRole('heading', { name: /Documenti/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /Curriculum vitae/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /doc-prova.pdf/i }),
  ).toBeInTheDocument();

  // ulteriori informazioni
  expect(screen.getByText(/Open your eyes/i)).toBeInTheDocument();

  //contenuti correlati
  expect(
    screen.getByRole('heading', { name: /Contenuti correlati/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Gestione impianti sportivi/i }),
  ).toBeInTheDocument();
});

// test('Specific fields not in page if data_conclusione_incarico compiled', async () => {
//   const { getByText, queryByText } = render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <PersonaView content={mock_allfields_and_fine_rapporto} />
//       </MemoryRouter>
//     </Provider>,
//   );

//   // data_insediamento
//   expect(queryByText('Data di insediamento:')).toBeNull();
//   // biografia
//   expect(queryByText('Ruolo/Biografia')).toBeNull();
//   // organizzazione_riferimento
//   // Come può andare bene un test del genere? come verifico un elemento che non
//   // comparirà?
//   expect(queryByText('SIET')).toBeNull();
//   //responsabile_di
//   expect(queryByText('Responsabile di')).toBeNull();
//   // collegamenti_organizzazione_l1
//   // Come può andare bene un test del genere? come verifico un elemento che non
//   // comparirà?
//   expect(queryByText('Unità organizzativa di primo livello')).toBeNull();
//   // collegamenti_organizzazione_l2
//   // Come può andare bene un test del genere? come verifico un elemento che non
//   // comparirà?
//   expect(queryByText('Unità organizzativa di secondo livello')).toBeNull();

//   // competenze
//   expect(queryByText('Competenze')).toBeNull();
//   // deleghe
//   expect(queryByText('Deleghe')).toBeNull();
//   // data_conclusione_incarico
//   expect(
//     getByText(/Ha fatto parte dell'organizzazione comunale fino al/i),
//   ).toBeInTheDocument();
// });

// test('Check parts loaded from child folders', async () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <PersonaView content={mock_allfields} />
//       </MemoryRouter>
//     </Provider>,
//   );
// Gallery
// const gallery = await waitForElement(() =>
//   getByText(/Galleria di immagini/i),
// );
// expect(gallery).toBeInTheDocument();

// compensi
// expect(await screen.findByText('Compensi')).toBeInTheDocument();

// importi_di_viaggio_e_o_servizi
expect(
  await screen.findByText('Importi di viaggio e/o servizi'),
).toBeInTheDocument();

// altre-cariche
expect(await screen.findByText('Altre cariche')).toBeInTheDocument();

// situazione-patrimoniale
// const situazione_patrimoniale = await waitForElement(() =>
//   getByText(/Situazione patrimoniale/),
// );
// expect(situazione_patrimoniale).toBeInTheDocument();

// dichiarazione-dei-redditi
// const dichiarazione_dei_redditi = await waitForElement(() =>
//   getByText(/Dichiarazione dei redditi/i),
// );
// expect(dichiarazione_dei_redditi).toBeInTheDocument();

// spese-elettorali
// const spese_elettorali = await waitForElement(() =>
//   getByText(/Spese elettorali/i),
// );
// expect(spese_elettorali).toBeInTheDocument();

// situazione-patrimoniale
// const valutazione_situazione_patrimoniale = await waitForElement(() =>
//   getByText(/Valutazione situazione patrimoniale/i),
// );
// expect(valutazione_situazione_patrimoniale).toBeInTheDocument();
// });

// test('todo', () => {
//   expect(store).toBeDefined();
//   expect(mock_allfields_and_fine_rapporto).toBeDefined();
//   expect(true).toBe(true);
// });
