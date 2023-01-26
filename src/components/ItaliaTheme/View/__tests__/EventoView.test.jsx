import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import EventoView from '../EventoView/EventoView';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

// Warning: An update to Icon inside a test was not wrapped in act(...).
// When testing, code that causes React state updates should be wrapped into act(...):
jest.mock('design-comuni-plone-theme/components/ItaliaTheme/Icons/Icon');
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// TODO: test evento senza data fine

const mock_mandatory = {
  '@components': {
    actions: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@actions',
    },
    aliases: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@aliases',
    },
    breadcrumbs: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@breadcrumbs',
    },
    contextnavigation: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@contextnavigation',
    },
    navigation: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@navigation',
    },
    subsite: {},
    translations: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@translations',
    },
    types: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@types',
    },
    workflow: {
      '@id': 'http://localhost:3000/eventi/mega-evento/@workflow',
    },
  },
  '@id': 'http://localhost:3000/eventi/mega-evento',
  '@type': 'Event',
  UID: '3a046f1b374d465abaea77175ab20cce',
  a_chi_si_rivolge: {
    blocks: {
      '393849f3-523a-46e0-92ab-c826873a177f': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '37t3k',
              text: 'Programmatori RedTurtle',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['393849f3-523a-46e0-92ab-c826873a177f'],
    },
  },
  contact_info: [
    {
      '@id':
        'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive',
      '@type': 'PuntoDiContatto',
      description: '',
      design_italia_meta_type: 'Punto di Contatto',
      effective: null,
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
  created: '2023-01-20T08:12:40+00:00',
  creators: ['admin'],
  design_italia_meta_type: 'Evento',
  end: '2023-01-20T09:00:00+00:00',
  id: 'mega-evento',
  items: [
    {
      '@id': 'http://localhost:3000/eventi/mega-evento/immagini',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'immagini',
      image_field: '',
      image_scales: null,
      review_state: 'published',
      title: 'Immagini',
    },
    {
      '@id': 'http://localhost:3000/eventi/mega-evento/video',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'video',
      image_field: '',
      image_scales: null,
      review_state: 'published',
      title: 'Video',
    },
    {
      '@id': 'http://localhost:3000/eventi/mega-evento/sponsor_evento',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'sponsor_evento',
      image_field: '',
      image_scales: null,
      review_state: 'published',
      title: 'Sponsor Evento',
    },
    {
      '@id': 'http://localhost:3000/eventi/mega-evento/documenti',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'documenti',
      image_field: '',
      image_scales: null,
      review_state: 'published',
      title: 'Allegati',
    },
  ],
  orari: {
    blocks: {
      'bdb27ec6-3371-42c0-9e55-65d69bfff7ef': {
        '@type': 'text',
      },
    },
    blocks_layout: {
      items: ['bdb27ec6-3371-42c0-9e55-65d69bfff7ef'],
    },
  },
  organizzato_da_esterno: {
    blocks: {
      'd8f67e41-c9a1-4993-9b0b-6124db188de2': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '71ibo',
              text: 'Batman',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['d8f67e41-c9a1-4993-9b0b-6124db188de2'],
    },
  },
  organizzato_da_interno: [
    {
      '@id':
        'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo',
      '@type': 'UnitaOrganizzativa',
      address: '',
      circoscrizione: null,
      city: 'Roma',
      contact_info: {
        blocks: {
          'b3225997-aad5-467c-8e4a-b868838188dd': {
            '@type': 'text',
          },
        },
        blocks_layout: {
          items: ['b3225997-aad5-467c-8e4a-b868838188dd'],
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
      id: 'assessorato-al-turismo',
      image_field: null,
      image_scales: null,
      nome_sede: null,
      quartiere: null,
      review_state: 'private',
      street: 'Via Roma 1',
      title: 'Assessorato al Turismo',
      zip_code: '00100',
    },
  ],
  parent: {
    '@id': 'http://localhost:3000/eventi',
    '@type': 'Document',
    description: '',
    design_italia_meta_type: 'Pagina',
    has_children: true,
    id: 'eventi',
    image_field: null,
    image_scales: null,
    review_state: 'published',
    title: 'Eventi',
  },
  start: '2023-01-20T09:00:00+00:00',
  strutture_politiche: [
    {
      '@id': 'http://localhost:3000/amministrazione/politici/arst-1',
      '@type': 'UnitaOrganizzativa',
      address: '',
      circoscrizione: null,
      city: null,
      contact_info: [
        {
          '@id': 'http://localhost:3000/amministrazione/politici/arst',
          '@type': 'PuntoDiContatto',
          description: '',
          design_italia_meta_type: 'Punto di Contatto',
          has_children: false,
          id: 'arst',
          image_field: null,
          image_scales: null,
          review_state: 'private',
          title: 'ARST',
          value_punto_contatto: [
            {
              pdc_type: 'web',
              pdc_value: 'http://www.arst.sardegna.it/index.html',
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
      id: 'arst-1',
      image_field: null,
      image_scales: null,
      nome_sede: null,
      quartiere: null,
      review_state: 'private',
      street: null,
      title: 'ARST',
      zip_code: null,
    },
  ],
  tipologia_evento: {
    title: 'Evento culturale',
    token: 'evento_culturale',
  },
  title: 'Mega Evento',
};

const mock_allfields = {
  ...mock_mandatory,
  allow_discussion: false,
  changeNote: '',
  circoscrizione: 'Arginone',
  city: 'Perugia',
  contributors: [],
  correlato_in_evidenza: [
    {
      '@id': 'http://localhost:3000/notizie',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      effective: '2023-01-03T15:40:54+00:00',
      has_children: true,
      id: 'notizie',
      image_field: null,
      image_scales: null,
      review_state: 'published',
      title: 'Notizie',
    },
  ],
  country: {
    title: 'Italia',
    token: '380',
  },
  description: 'Descrizione del mega evento',
  descrizione_destinatari: {
    blocks: {
      'b9b06941-630d-4876-ad94-5ee8fcaef369': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '9fccd',
              text: 'I destinatari dovranno essere programmatori',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['b9b06941-630d-4876-ad94-5ee8fcaef369'],
    },
  },
  descrizione_estesa: {
    blocks: {
      'c3aac6c5-b8d9-48b7-bc01-a7211248548b': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'e0m83',
              text: 'Un mega evento con delle mega iniziative',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['c3aac6c5-b8d9-48b7-bc01-a7211248548b'],
    },
  },
  effective: null,
  exclude_from_nav: false,
  expires: null,
  geolocation: {
    latitude: 39.21252001040267,
    longitude: 9.115209984181092,
  },
  image: {
    'content-type': 'image/png',
    download:
      'http://localhost:3000/eventi/mega-evento/@@images/image-1156-c9f0af33a87b488c2c0006b67d6b6315.png',
    filename: 'foto-ospedale.png',
    height: 940,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-250-1bc27073253601c7e927642f5694bbb5.png',
        height: 203,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-1200-7d00619bc955d8515a097ab3c9e4002b.png',
        height: 940,
        width: 1156,
      },
      huge: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-1600-9be37360d8f3cb220cfb45d11b455209.png',
        height: 940,
        width: 1156,
      },
      icon: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-32-160a4c43283ae99f6607e620739a94ae.png',
        height: 26,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-800-92a87cc7ddcda158a759875586371f6c.png',
        height: 650,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-1000-6067b97b20006cdc98944ec51c825e95.png',
        height: 813,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-16-13f680ff016f5ef95c4877199f0cc0f9.png',
        height: 13,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-300-bc4c97c6e342c12d5599be4fa9c4e08a.png',
        height: 243,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-200-1492b07c9272ed1447035a24fc4e91f3.png',
        height: 162,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-400-dba23485787eafd571064b3dd8d00527.png',
        height: 325,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-600-33f8e4880678d1660593e38962de2f4f.png',
        height: 487,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-128-b2052752176ce9ca65f641464072fc8f.png',
        height: 104,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/eventi/mega-evento/@@images/image-64-832e21fee3455c8ac82f06c4c4a5463c.png',
        height: 52,
        width: 64,
      },
    },
    size: 1296882,
    width: 1156,
  },
  image_caption: 'Didascalia immagine testata',
  is_folderish: true,
  items_total: 4,
  language: {
    title: 'Italiano',
    token: 'it',
  },
  layout: 'event_view',
  lock: {
    locked: false,
    stealable: true,
  },
  luoghi_correlati: [
    {
      '@id':
        'http://localhost:3000/vivi-il-comune/luoghi/il-castello-normanno-1',
      '@type': 'Venue',
      circoscrizione: null,
      city: 'Roma',
      country: '380',
      description:
        'Sorta a metà Seicento come residenza di caccia di Carlo Emanuele II, che fece del centrale Salone di Diana uno snodo ideale fra palazzo e giardini.',
      design_italia_meta_type: 'Luogo',
      effective: null,
      email: null,
      fax: null,
      geolocation: {
        latitude: 41.8337833,
        longitude: 12.4677863,
      },
      has_children: true,
      id: 'il-castello-normanno-1',
      image_field: null,
      image_scales: null,
      nome_sede: null,
      orario_pubblico: {
        blocks: {},
        blocks_layout: {
          items: [],
        },
      },
      pec: null,
      quartiere: null,
      review_state: 'private',
      riferimento_mail_struttura: null,
      riferimento_pec_struttura: null,
      riferimento_telefonico_struttura: null,
      street: 'Via Liszt, 21',
      telefono: null,
      title: 'Il castello normanno',
      web: null,
      zip_code: '00144',
    },
  ],
  modified: '2023-01-20T08:45:26+00:00',
  next_item: {},
  nome_sede: 'Sede del mega evento',
  open_end: true,
  opengraph_description: null,
  opengraph_image: null,
  opengraph_title: null,
  parteciperanno: [
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/franco-franchini',
      '@type': 'Persona',
      description: '',
      design_italia_meta_type: 'Persona pubblica',
      effective: null,
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
  ],
  patrocinato_da: 'Regione Autonome della Sardegna',
  persone_amministrazione: [
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/valerio-alfio-boi-1',
      '@type': 'Persona',
      description: '',
      design_italia_meta_type: 'Persona pubblica',
      effective: null,
      has_children: true,
      id: 'valerio-alfio-boi-1',
      image_field: 'foto_persona',
      image_scales: {
        foto_persona: [null],
      },
      incarichi: 'Incarico di Valerio Alfio Boi',
      review_state: 'private',
      title: 'Valerio Alfio Boi',
    },
  ],
  preview_caption: null,
  preview_image: null,
  previous_item: {
    '@id': 'http://localhost:3000/eventi/363-festa-di-santefisio',
    '@type': 'Event',
    description:
      "Il 1° maggio 2019 Cagliari e tutta la Sardegna festeggiano la 363ª Festa di Sant'Efisio. Un intenso momento di devozione, fede, cultura e tradizioni centenarie che si fondono in una processione che non ha eguali.",
    title: "363^ Festa di Sant'Efisio",
  },
  prezzo: {
    blocks: {
      '3ae432d0-6255-4168-8fba-578c46f2321d': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 's9f2',
              text: '10€',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['3ae432d0-6255-4168-8fba-578c46f2321d'],
    },
  },
  quartiere: 'Bello',
  recurrence: null,
  relatedItems: [
    {
      '@id':
        'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista',
      '@type': 'Event',
      description:
        'Dal 2 al 3 giugno torna il torneo di beneficienza “Tutti in pista”. La raccolta fondi finanzierà progetti sportivi per ragazzi e ragazze.',
      design_italia_meta_type: 'Evento',
      effective: '2023-01-03T15:40:33+00:00',
      end: '2023-06-03T15:00:00+00:00',
      has_children: true,
      id: 'torneo-di-beneficienza-tutti-in-pista',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            'content-type': 'image/jpeg',
            download:
              'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-5184-74c3e55aa69d3eec7332cb8028f247f0.jpeg',
            filename: 'national-cancer-institute.jpeg',
            height: 3456,
            scales: {
              gallery: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-250-bd9d757f9bab5f7fe8ae1ac4fbb1adc5.jpeg',
                height: 166,
                width: 250,
              },
              great: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-1200-502b536559cea66d298e6857671cfaec.jpeg',
                height: 800,
                width: 1200,
              },
              huge: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-1600-cef7453cc7e5539995203acfd0fd67af.jpeg',
                height: 1066,
                width: 1600,
              },
              icon: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-32-3e9daca363c77b93aed78e17d721a3bc.jpeg',
                height: 21,
                width: 32,
              },
              large: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-800-7e93626815d089878e6ce731efd8561e.jpeg',
                height: 533,
                width: 800,
              },
              larger: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-1000-fddf730aa0c1379ad7251efebf48808f.jpeg',
                height: 666,
                width: 1000,
              },
              listing: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-16-b792a861a9f3fe0dec3a5689c648bbbd.jpeg',
                height: 10,
                width: 16,
              },
              midi: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-300-f5465a4e5f233f8d2a63880b6a8d8eea.jpeg',
                height: 200,
                width: 300,
              },
              mini: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-200-f9542fccc1ed011fde2c79b43b0927be.jpeg',
                height: 133,
                width: 200,
              },
              preview: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-400-a7b07ee75a650233ddb8a659ca0bbe27.jpeg',
                height: 266,
                width: 400,
              },
              teaser: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-600-cf3e72563ace502a8b9e75ade4f6ca49.jpeg',
                height: 400,
                width: 600,
              },
              thumb: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-128-e40ea7e792fbba0a30bd5c22cdb1a3a4.jpeg',
                height: 85,
                width: 128,
              },
              tile: {
                download:
                  'http://localhost:3000/eventi/torneo-di-beneficienza-tutti-in-pista/@@images/preview_image-64-8c3cf625de779a0bc3c0a28d2e3cc4be.jpeg',
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
      start: '2023-06-02T14:39:39+00:00',
      title: 'Torneo di beneficienza "Tutti in pista"',
    },
  ],
  review_state: 'private',
  rights: '',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  sottotitolo: 'Sottotitolo del mega evento',
  street: 'Via Cincillà 198',
  subjects: [],
  supportato_da: [
    {
      '@id':
        'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive',
      '@type': 'UnitaOrganizzativa',
      address: '',
      circoscrizione: null,
      city: null,
      contact_info: {
        blocks: {
          'c6feaad0-4f8e-411a-8e2a-f9fbe644dc55': {
            '@type': 'text',
          },
        },
        blocks_layout: {
          items: ['c6feaad0-4f8e-411a-8e2a-f9fbe644dc55'],
        },
      },
      description: 'Dirigente Arch. M. Alessandra Verdi',
      design_italia_meta_type: 'Unita Organizzativa',
      effective: null,
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      has_children: true,
      id: 'area-impiantistica-sportiva-e-manifestazioni-sportive',
      image_field: null,
      image_scales: null,
      nome_sede: null,
      quartiere: null,
      review_state: 'private',
      street: null,
      title: 'Area impiantistica sportiva e manifestazioni sportive',
      zip_code: null,
    },
  ],
  sync_uid: null,
  tassonomia_argomenti: [
    {
      '@id': 'http://localhost:3000/argomenti/muoversi',
      '@type': 'Pagina Argomento',
      description: '',
      design_italia_meta_type: 'Argomento',
      effective: null,
      has_children: false,
      id: 'muoversi',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Muoversi',
    },
  ],
  ulteriori_informazioni: {
    blocks: {
      'fe8ee3f2-c1b3-4692-98ed-d9ca7821fbab': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '2lvs7',
              text: 'Magliette gratis',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['fe8ee3f2-c1b3-4692-98ed-d9ca7821fbab'],
    },
  },
  version: 'current',
  versioning_enabled: true,
  whole_day: true,
  working_copy: null,
  working_copy_of: null,
  zip_code: '999999',
};

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  content: {
    data: {
      is_folderish: true,
    },
    subrequests: {
      '/amministrazione/uffici/assessorato-al-turismo_office': {
        loading: false,
        loaded: true,
        error: null,
        data: {
          '@components': {
            actions: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@actions',
            },
            aliases: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@aliases',
            },
            breadcrumbs: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@breadcrumbs',
            },
            contextnavigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@contextnavigation',
            },
            navigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@navigation',
            },
            subsite: {},
            translations: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@translations',
            },
            types: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@types',
            },
            workflow: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@workflow',
            },
          },
          '@id':
            'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo',
          '@type': 'UnitaOrganizzativa',
          UID: '95ac1dc413734d898716a74737d5c4f7',
          allow_discussion: false,
          assessore_riferimento: [],
          changeNote: '',
          circoscrizione: null,
          city: 'Roma',
          competenze: {
            blocks: {
              'abf3498b-f674-4478-a8f0-43ff8f0508eb': {
                '@type': 'text',
              },
            },
            blocks_layout: {
              items: ['abf3498b-f674-4478-a8f0-43ff8f0508eb'],
            },
          },
          contact_info: [],
          contributors: [],
          correlato_in_evidenza: [],
          country: null,
          created: '2023-01-04T10:18:55+00:00',
          creators: ['admin'],
          description: '',
          design_italia_meta_type: 'Unita Organizzativa',
          documenti_pubblici: [],
          effective: null,
          exclude_from_nav: false,
          expires: null,
          geolocation: {
            latitude: 0,
            longitude: 0,
          },
          id: 'assessorato-al-turismo',
          image: {
            'content-type': 'image/png',
            download:
              'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-1156-d9c0f21d70ab7a13641c0d4bde317b9d.png',
            filename: 'foto-ospedale.png',
            height: 940,
            scales: {
              gallery: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-250-d55c6b904794217bcf4c480891fb3c52.png',
                height: 203,
                width: 250,
              },
              great: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-1200-c46ce86009dd5aa6363adb190479c618.png',
                height: 940,
                width: 1156,
              },
              huge: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-1600-cca19a8f190285b2c257e8ac337c94c2.png',
                height: 940,
                width: 1156,
              },
              icon: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-32-79de5088a8e50556f250764ff775c7eb.png',
                height: 26,
                width: 32,
              },
              large: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-800-adc5b7b6abad469d061867136f85c259.png',
                height: 650,
                width: 800,
              },
              larger: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-1000-917938c12d172de05c0882652787bc6d.png',
                height: 813,
                width: 1000,
              },
              listing: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-16-4b375d9f156b2e79ebc93555c44f721f.png',
                height: 13,
                width: 16,
              },
              midi: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-300-a87b4508335ac9ba8a34ca864a9d91b8.png',
                height: 243,
                width: 300,
              },
              mini: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-200-67dcacb37ef025801410f9724a4fcdea.png',
                height: 162,
                width: 200,
              },
              preview: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-400-7bbfbca56f2827e1e8ca904aef72b900.png',
                height: 325,
                width: 400,
              },
              teaser: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-600-36913a0b6a60497044e47d168f32f312.png',
                height: 487,
                width: 600,
              },
              thumb: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-128-629b5defa586c8ede07dd91b794ce1de.png',
                height: 104,
                width: 128,
              },
              tile: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/image-64-a5a7125881b707e977d78161011580bc.png',
                height: 52,
                width: 64,
              },
            },
            size: 1296882,
            width: 1156,
          },
          image_caption: null,
          is_folderish: true,
          items: [
            {
              '@id':
                'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/allegati',
              '@type': 'Document',
              description: '',
              design_italia_meta_type: 'Pagina',
              has_children: false,
              id: 'allegati',
              image_field: '',
              image_scales: null,
              review_state: 'private',
              title: 'Allegati',
              url: '/amministrazione/uffici/assessorato-al-turismo/allegati',
            },
          ],
          items_total: 1,
          language: {
            title: 'Italiano',
            token: 'it',
          },
          layout: 'view',
          legami_con_altre_strutture: [],
          lock: {
            locked: false,
            stealable: true,
          },
          modified: '2023-01-19T12:04:48+00:00',
          next_item: {
            '@id':
              'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive',
            '@type': 'PuntoDiContatto',
            description: '',
            title: 'Ufficio delle Attività Produttive',
          },
          nome_sede: null,
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
          persone_struttura: [],
          prestazioni: [],
          preview_caption: null,
          preview_image: {
            'content-type': 'image/png',
            download:
              'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-1156-45f1e19cba3295029911cd44fb3d5343.png',
            filename: 'foto-ospedale.png',
            height: 940,
            scales: {
              gallery: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-250-8acdeef7b39164aff1c19c4abbb6186d.png',
                height: 203,
                width: 250,
              },
              great: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-1200-c4f7ee4282a4ba3669492294dedf4a39.png',
                height: 940,
                width: 1156,
              },
              huge: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-1600-c4b07d8ebf513b996941ac0abe23dd83.png',
                height: 940,
                width: 1156,
              },
              icon: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-32-f79d626ef0b4ecb218fd5847eab3f251.png',
                height: 26,
                width: 32,
              },
              large: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-800-16ca2e18b231f55efb9e9df5ef6097d8.png',
                height: 650,
                width: 800,
              },
              larger: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-1000-54abdd3677c59a887d8e0a9433b6501e.png',
                height: 813,
                width: 1000,
              },
              listing: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-16-b3d8cd80ca1dbb3f34a8306421e37236.png',
                height: 13,
                width: 16,
              },
              midi: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-300-ea5eefa0d83669427c3bc4cfc36aa92b.png',
                height: 243,
                width: 300,
              },
              mini: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-200-6c304fa57b43c928fce1315ac7fd8cb0.png',
                height: 162,
                width: 200,
              },
              preview: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-400-357a07e9875ace5a0059e3cbe7dd5ec8.png',
                height: 325,
                width: 400,
              },
              teaser: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-600-569962895206ae9dc2dfdd3f94d214aa.png',
                height: 487,
                width: 600,
              },
              thumb: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-128-54adeb0580201df3353ecc72cb2de90e.png',
                height: 104,
                width: 128,
              },
              tile: {
                download:
                  'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo/@@images/preview_image-64-1420af5d9ba6191dae672acc9c0aee90.png',
                height: 52,
                width: 64,
              },
            },
            size: 1296882,
            width: 1156,
          },
          previous_item: {
            '@id':
              'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio',
            '@type': 'UnitaOrganizzativa',
            description: '',
            title: 'Giunta e consiglio',
          },
          quartiere: null,
          relatedItems: [],
          related_news: [
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
          ],
          responsabile: [],
          review_state: 'private',
          rights: '',
          sede: [],
          sedi_secondarie: [],
          seo_canonical_url: null,
          seo_description: null,
          seo_noindex: null,
          seo_title: null,
          servizi_offerti: [],
          street: 'Via Roma 1',
          subjects: [],
          tassonomia_argomenti: [],
          tipologia_organizzazione: {
            title: 'Struttura amministrativa',
            token: 'struttura_amministrativa',
          },
          title: 'Assessorato al Turismo',
          ulteriori_informazioni: {
            blocks: {
              '832b6d4c-ac12-476a-87c4-247068d5ae85': {
                '@type': 'text',
              },
            },
            blocks_layout: {
              items: ['832b6d4c-ac12-476a-87c4-247068d5ae85'],
            },
          },
          uo_children: [],
          uo_parent: null,
          version: 'current',
          versioning_enabled: true,
          working_copy: null,
          working_copy_of: null,
          zip_code: '00100',
        },
      },
    },
  },
  search: {
    subrequests: {
      documenti: {
        items: [
          {
            '@id':
              'http://loremipsum.com/events/altro-eventone/documenti/agid-2.pages',
            '@type': 'File',
            title: 'AGID2.pages',
          },
        ],
      },
      multimedia: {
        '@id':
          'http://loremipsum.it/events/altro-eventone/multimedia/@search?path.depth=1&metadata_fields=_all&fullobjects=1',
        items: [
          {
            '@id':
              'http://loremipsum.it/events/altro-eventone/multimedia/download-5.jpeg',
            '@type': 'Image',
            image: {
              scales: {
                gallery: {
                  download:
                    'http://loremipsum.it/events/altro-eventone/multimedia/download-5.jpeg/@@images/5f9e35e1-405e-43d4-96b1-0fd3113b3fa7.jpeg',
                  height: 175,
                  width: 250,
                },
              },
              title: 'download (5).jpeg',
            },
          },
        ],
      },
    },
  },
});

it('expect to have all mandatory fields in page', async () => {
  const { debug } = render(
    <Provider store={store}>
      <MemoryRouter>
        <EventoView content={mock_mandatory} />
      </MemoryRouter>
    </Provider>,
  );
  // title
  expect(
    screen.getByRole('heading', { name: /Mega Evento/i }),
  ).toBeInTheDocument();

  //questi campi possono essere inseriti ma non vengono visualizzati in pagina
  // a chi è rivolto
  expect(screen.getByText(/Programmatori RedTurtle/i)).toBeInTheDocument();
  //tipo evento
  expect(screen.getByText(/Evento culturale/i)).toBeInTheDocument();

  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TEST ORARI
  // non riesco a testare il campo inizio evento - fine evento, solo il blocco date e orari
  // // inizio evento - fine evento
  // await screen.findByText(/inizio evento/i);
  // screen.debug();
  // expect(screen.getByText(/Inizio evento/i)).toBeInTheDocument();
  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!

  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!
  //orari - sezione orari dovrebbe essere titolo della sezione "informazioni sugli orari" ma appare anche se sezione non è compilata
  // expect(
  //   screen.getByRole('heading', { name: /Orari/i }),
  // ).not.toBeInTheDocument();
  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!

  //punto di contatto
  expect(
    screen.getByText(/Ufficio delle attività produttive/i),
  ).toBeInTheDocument();
});

it('expect to have all non-mandatory fields in page', async () => {
  const { debug } = render(
    <Provider store={store}>
      <MemoryRouter>
        <EventoView content={mock_allfields} />
      </MemoryRouter>
    </Provider>,
  );

  // descrizione
  expect(screen.getByText('Descrizione del mega evento')).toBeInTheDocument();
  //immagine di testata + didascalia
  expect(
    screen.getByRole('img', { name: /Didascalia immagine testata/i }),
  ).toBeInTheDocument();
  //tassonomia argomenti
  expect(screen.getAllByText(/Muoversi/i)).toBeTruthy();
  // sottotitolo
  expect(
    screen.getByText(/sottotitolo del mega evento/i, { exact: false }),
  ).toBeInTheDocument();

  // parteciperanno - campo non compare
  expect(screen.getByText(/Franco Franchini/i)).toBeInTheDocument();

  //parteciperanno persone amministrazione
  expect(
    screen.getByRole('link', { name: /Valerio Alfio Boi/i }),
  ).toBeInTheDocument();

  //descrizione estesa
  expect(screen.getByText(/mega iniziative/i)).toBeInTheDocument();
  //descrizione destinatari
  expect(screen.getByText(/L'evento è di interesse per/i)).toBeInTheDocument();
  expect(
    screen.getByText(/I destinatari dovranno essere programmatori/i),
  ).toBeInTheDocument();

  //luoghi correlati
  expect(
    screen.getByRole('heading', { name: /Il castello normanno/i }),
  ).toBeInTheDocument();
  //nome sede
  expect(
    screen.getByRole('heading', { name: /Sede del mega evento/i }),
  ).toBeInTheDocument();
  // street
  expect(screen.getByText(/Via Cincillà 198/i)).toBeInTheDocument();
  //zip code
  expect(screen.getByText(/999999/i)).toBeInTheDocument();
  //città
  expect(screen.getByText(/Perugia/i)).toBeInTheDocument();
  //quartiere
  expect(screen.getByText(/Bello/i)).toBeInTheDocument();
  //circoscrizione
  expect(screen.getByText(/Arginone/i)).toBeInTheDocument();

  //!!! Paese - Non appare anche se compilato
  // expect(screen.getByText(/Italia/i)).toBeInTheDocument();

  // tutta la giornata - non appare ma devono scomparire gli orari
  // expect(screen.getByText('10:00')).not.toBeInTheDocument();

  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!
  //fine aperta
  // expect(
  //   await screen.getByText(
  //     'Questo evento ha una data di fine aperta/variabile.',
  //   ),
  // ).toBeInTheDocument();
  // expect(
  //   screen.getByText(/fino a conclusione/, { exact: false, selector: 'h4' }),
  // ).toBeInTheDocument();
  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!

  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!
  // //informazioni aggiuntive sugli orari
  // expect(screen.getByText(/Ho inventato tutto/i)).not.toBeInTheDocument();
  // !!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!

  // costi
  expect(screen.getByText('10€')).toBeInTheDocument();

  // organizzato da - interno
  expect(
    screen.getByRole('heading', { name: /Contatti interni/i }),
  ).toBeInTheDocument();

  await screen.findByText(/assessorato al turismo/i);
  expect(screen.getByText(/assessorato al turismo/i)).toBeInTheDocument();

  //organizzato da - esterno
  expect(screen.getByText(/Batman/i)).toBeInTheDocument();

  // evento supportato da - campo non compare
  expect(
    screen.getByText(/Area impiantistica sportiva/i, { exact: false }),
  ).toBeInTheDocument();

  //evento patrocinato da
  expect(
    screen.getByRole('heading', { name: /Patrocinato da/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Regione Autonome della Sardegna/i),
  ).toBeInTheDocument();

  //ulteriori informazioni
  expect(screen.getByText(/Magliette gratis/i)).toBeInTheDocument();

  //strutture politiche coinvolte
  expect(
    screen.getByText(/strutture politiche coinvolte/i),
  ).toBeInTheDocument();
  expect(screen.getByText(/ARST/i)).toBeInTheDocument();

  // correlati in evidenza
  expect(screen.getByText('Notizie')).toBeInTheDocument();
  // contenuti correlati
  expect(
    screen.getByRole('heading', { name: /contenuti correlati/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Torneo di beneficienza/i, exact: false }),
  ).toBeInTheDocument();
  // screen.debug();
});

// it('Check parts loaded from child folders', async () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <EventoView content={mock_mandatory} />
//       </MemoryRouter>
//     </Provider>,
//   );
//   // // documenti
//   // const documenti = await waitForElement(() =>
//   //   document.querySelector('#documenti'),
//   // );
//   // expect(documenti).toBeInTheDocument();
//   // // galleria immagini
//   // const galleria = await waitForElement(() =>
//   //   getByText(/Galleria di immagini/i),
//   // );
//   // expect(galleria).toBeInTheDocument();

//   // const eventi = await waitForElement(() => document.querySelector('#events'));
//   // expect(eventi).toBeInTheDocument();
// });

// it('embedded video is displayed', async () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <EventoView content={mock_mandatory} />
//       </MemoryRouter>
//     </Provider>,
//   );
//   // const iframe = await waitForElement(() =>
//   //   document.querySelector('#embedded-video-0'),
//   // );
//   // expect(iframe).toBeInTheDocument();
// });

// test('todo', () => {
//   expect(mock_mandatory).toBeDefined();
//   expect(store).toBeDefined();
//   expect(true).toBe(true);
// });
