import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ServizioView from '../ServizioView/ServizioView';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Warning: An update to Icon inside a test was not wrapped in act(...).
// When testing, code that causes React state updates should be wrapped into act(...):
jest.mock('design-comuni-plone-theme/components/ItaliaTheme/Icons/Icon');
// loadables.push('rrule');
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

const mock_mandatory = {
  '@id': 'http://localhost:3000/servizi/visita-veterinaria-gratis',
  '@type': 'Servizio',
  UID: '3643564b4346478d9d3de790943f3d03',
  id: 'visita-veterinaria-gratis',
  title: 'Visita veterinaria gratis',
  a_chi_si_rivolge: {
    blocks: {
      '2851114d-2489-4ea3-9b46-062cf6437418': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'f5rrc',
              text: 'Animaletti',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['2851114d-2489-4ea3-9b46-062cf6437418'],
    },
  },
  area: [
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
  autenticazione: {
    blocks: {
      '1b026823-931a-47d9-8619-0966b1604341': {
        '@type': 'text',
      },
    },
    blocks_layout: {
      items: ['1b026823-931a-47d9-8619-0966b1604341'],
    },
  },
  canale_fisico: [
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
  come_si_fa: {
    blocks: {
      'dd7c859c-8053-4c16-b753-161c438b32ce': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '1mlqd',
              text: "There's a lady who's sure",
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['dd7c859c-8053-4c16-b753-161c438b32ce'],
    },
  },
  condizioni_di_servizio: {
    'content-type': 'image/jpeg',
    download:
      'http://localhost:3000/servizi/visita-veterinaria-gratis/@@download/condizioni_di_servizio',
    filename: 'woman-having-online-meeting-work.jpg',
    size: 1195679,
  },
  contact_info: [
    {
      '@id':
        'http://localhost:3000/amministrazione/personale-amministrativo/marco-murgia',
      '@type': 'PuntoDiContatto',
      description: '',
      design_italia_meta_type: 'Punto di Contatto',
      effective: null,
      has_children: false,
      id: 'marco-murgia',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Marco Murgia',
      value_punto_contatto: [
        {
          pdc_type: 'phone',
          pdc_value: '+393333333333',
        },
      ],
    },
  ],
  cosa_serve: {
    blocks: {
      'acfa657c-fbab-45ee-859f-21bb62b7c661': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '2sdeq',
              text: "And she's buying a stairway to heaven",
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['acfa657c-fbab-45ee-859f-21bb62b7c661'],
    },
  },
  cosa_si_ottiene: {
    blocks: {
      'bb4db7e4-0a27-41c9-8f34-512eff06aa86': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'pru2',
              text: 'All that glitters is gold',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['bb4db7e4-0a27-41c9-8f34-512eff06aa86'],
    },
  },
  created: '2023-01-26T14:59:04+00:00',
  description: 'Fai visitare il tuo cucciolo',
  design_italia_meta_type: 'Servizio',
  is_folderish: true,
  items: [
    {
      '@id':
        'http://localhost:3000/servizi/visita-veterinaria-gratis/modulistica',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'modulistica',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Modulistica',
    },
    {
      '@id': 'http://localhost:3000/servizi/visita-veterinaria-gratis/allegati',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'allegati',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Allegati',
    },
  ],
  language: {
    title: 'Italiano',
    token: 'it',
  },
  parent: {
    '@id': 'http://localhost:3000/servizi',
    '@type': 'Document',
    description:
      'Tutti i servizi comunali per i cittadini, disponibili online o a sportello, per richiedere documenti e permessi, iscriversi a graduatorie ed effettuare pagamenti.',
    design_italia_meta_type: 'Pagina',
    has_children: true,
    id: 'servizi',
    image_field: null,
    image_scales: null,
    review_state: 'published',
    title: 'Servizi',
  },
  prenota_appuntamento: {
    blocks: {
      'e26f97de-e008-40a1-929f-315a362f7107': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'btarf',
              text: "Because I'm easy come, easy go",
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['e26f97de-e008-40a1-929f-315a362f7107'],
    },
  },
  procedure_collegate: {
    blocks: {
      '3ab3b686-ab6e-4a85-bd7b-361e091c05b3': {
        '@type': 'text',
      },
    },
    blocks_layout: {
      items: ['3ab3b686-ab6e-4a85-bd7b-361e091c05b3'],
    },
  },
  tassonomia_argomenti: [
    {
      '@id': 'http://localhost:3000/argomenti/vivere-la-citta',
      '@type': 'Pagina Argomento',
      description: '',
      design_italia_meta_type: 'Argomento',
      effective: null,
      has_children: false,
      id: 'vivere-la-citta',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Vivere la città',
    },
  ],
  tempi_e_scadenze: {
    blocks: {
      'e0c64130-00d4-4747-bc21-b58733cb1b7f': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'b6mg7',
              text: 'Dopodomani',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['e0c64130-00d4-4747-bc21-b58733cb1b7f'],
    },
  },
  timeline_tempi_scadenze: {
    data_scadenza: '2023-01-28',
    interval_qt: '',
    interval_type: '',
    milestone: 'Tra due giorni',
    milestone_description: "Any way the wind blows doesn't really matter to",
  },

  ufficio_responsabile: [
    {
      '@id': 'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio',
      '@type': 'UnitaOrganizzativa',
      address: '',
      circoscrizione: null,
      city: null,
      contact_info: [],
      description: '',
      design_italia_meta_type: 'Unita Organizzativa',
      effective: null,
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      has_children: true,
      id: 'giunta-e-consiglio',
      image_field: null,
      image_scales: null,
      nome_sede: null,
      quartiere: null,
      review_state: 'private',
      street: null,
      title: 'Giunta e consiglio',
      zip_code: null,
    },
  ],
};

const mock_all_fields = {
  ...mock_mandatory,

  allow_discussion: false,
  altri_documenti: [
    {
      '@id':
        'http://localhost:3000/documenti-e-dati/documenti-albo-pretorio/piano-lavori-2023',
      '@type': 'Documento',
      description:
        'Deliberazione del Consiglio comunale per piano lavori previsto per il 2023',
      design_italia_meta_type: 'Documento',
      effective: null,
      has_children: true,
      id: 'piano-lavori-2023',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Piano lavori 2023',
    },
  ],

  autenticazione: {
    blocks: {
      '1b026823-931a-47d9-8619-0966b1604341': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'dfpqb',
              text: "I'm just a poor boy",
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['1b026823-931a-47d9-8619-0966b1604341'],
    },
  },
  business_events: ['avvio_impresa'],
  canale_digitale: {
    blocks: {
      '7bebaf7f-40fd-4274-82a4-59180e9dff0b': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '1e42l',
              text: 'Open your eyes',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['7bebaf7f-40fd-4274-82a4-59180e9dff0b'],
    },
  },
  canale_digitale_link: 'http://www.google.it',

  casi_particolari: {
    blocks: {
      '02eda6cd-04cf-471e-b002-a0759264c4d9': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '743f8',
              text: 'Mama, Just killed a man',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['02eda6cd-04cf-471e-b002-a0759264c4d9'],
    },
  },
  changeNote: '',
  chi_puo_presentare: {
    blocks: {
      '3e317fff-a0a6-49c8-85a6-8d415fbc3568': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '5gmg4',
              text: 'Is this just fantasy?',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['3e317fff-a0a6-49c8-85a6-8d415fbc3568'],
    },
  },
  codice_ipa: null,
  contributors: [],
  copertura_geografica: {
    blocks: {
      'a04413ee-4676-41b4-9155-6310d8e6ad49': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'em5i1',
              text: 'Caught in a landside',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['a04413ee-4676-41b4-9155-6310d8e6ad49'],
    },
  },
  correlato_in_evidenza: [
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
      image_field: null,
      image_scales: null,
      review_state: 'published',
      title: 'Sport nel verde: le iniziative della prossima edizione',
    },
  ],
  costi: {
    blocks: {
      'fb4ab549-4d60-4a24-a5c4-960e7151b28e': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'foiq2',
              text: '345',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['fb4ab549-4d60-4a24-a5c4-960e7151b28e'],
    },
  },
  creators: ['admin'],
  descrizione_estesa: {
    blocks: {
      '038eb313-2c32-4db4-adae-888197220fd9': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'c0a5j',
              text: 'Is this the real life?',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['038eb313-2c32-4db4-adae-888197220fd9'],
    },
  },
  dove_rivolgersi: [
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
      effective: null,
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
  dove_rivolgersi_extra: {
    blocks: {
      '894e9d1d-1c20-4ed6-a4d0-5e25adbfbd9c': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '8h4ue',
              text: 'I need no sympathy',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['894e9d1d-1c20-4ed6-a4d0-5e25adbfbd9c'],
    },
  },
  effective: null,
  exclude_from_nav: false,
  expires: null,
  id: 'visita-veterinaria-gratis',
  identificativo: null,
  image: {
    'content-type': 'image/jpeg',
    download:
      'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-6240-2ad076715e87221b948922fce0e233b7.jpeg',
    filename: 'woman-having-online-meeting-work.jpg',
    height: 4160,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-250-c8afc5d5252efa1d73cf4ed739c5ec58.jpeg',
        height: 166,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-1200-75abd08aff628b1569b1f0b195f12a9a.jpeg',
        height: 800,
        width: 1200,
      },
      huge: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-1600-915d78453626f34b2ba2f66c16ba7574.jpeg',
        height: 1066,
        width: 1600,
      },
      icon: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-32-c03390ef60ee85723150344abac7642a.jpeg',
        height: 21,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-800-0f8a1a3de6be16e7d49c035942013a84.jpeg',
        height: 533,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-1000-f19bb179e68dc98ba0b92f677b918a65.jpeg',
        height: 666,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-16-8f0acc69cdc81779c04a384dc87f1fc4.jpeg',
        height: 10,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-300-f0de15b8e8770fa872ab31ff00af429c.jpeg',
        height: 200,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-200-8268df05c644acd1c3de79321f76676e.jpeg',
        height: 133,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-400-389669cf2b52ab747d89b2a9fe260502.jpeg',
        height: 266,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-600-1eb7d62c08824b71786c52b658d6cc25.jpeg',
        height: 400,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-128-2d4b7fd80e131940509322905df06ebe.jpeg',
        height: 85,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/image-64-ff43e77cf57c828a5af27e39906f40dd.jpeg',
        height: 42,
        width: 64,
      },
    },
    size: 1195679,
    width: 6240,
  },
  image_caption: 'woman working',
  items_total: 2,

  layout: 'view',
  link_siti_esterni: {
    blocks: {
      'ff02a375-2be1-4a43-b758-dbb1fae8fa71': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'f14ja',
              text: 'Put a gun against his head',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['ff02a375-2be1-4a43-b758-dbb1fae8fa71'],
    },
  },
  lock: {
    locked: false,
    stealable: true,
  },
  modified: '2023-01-26T15:19:08+00:00',
  motivo_stato_servizio: {
    blocks: {
      'c19f982c-ce7a-4050-aa60-65a92723db34': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '3d3cq',
              text: 'Motivazione',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['c19f982c-ce7a-4050-aa60-65a92723db34'],
    },
  },
  next_item: {},
  opengraph_description: null,
  opengraph_image: null,
  opengraph_title: null,
  person_life_events: ['possesso_cura_smarrimento_animale_da_compagnia'],
  preview_caption: 'veterinario',
  preview_image: {
    'content-type': 'image/webp',
    download:
      'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-2000-452abf4abe0a486b24c37f972f1008b8.webp',
    filename: 'doctor-with-stethoscope-hands-hospital-background_1423-1.webp',
    height: 1333,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-250-991bdae7d7d0aa8146a42d36732e0fe5.webp',
        height: 166,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-1200-08cb7845737dfc724cf958dace170b26.webp',
        height: 799,
        width: 1200,
      },
      huge: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-1600-94397910f58fe856e7c0f8886d7cef4f.webp',
        height: 1066,
        width: 1600,
      },
      icon: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-32-8e7bdd7cdb86dd676cf8a46bdd8303c7.webp',
        height: 21,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-800-cd273a856764ba9e4040655b60cf7f1f.webp',
        height: 533,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-1000-a05a4aceb0b6719f15f2902ea64387cc.webp',
        height: 666,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-16-b4ffbc515fa2589647e9f4a14cbc4734.webp',
        height: 10,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-300-ef245aefac982a915a56b46029524aa2.webp',
        height: 199,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-200-84aa8a2cb57ec00e25b0e80068af1538.webp',
        height: 133,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-400-026865d13499ea9d05b2bb08c56a6de0.webp',
        height: 266,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-600-fd5f6bbc43581c184b621b9aac163f9e.webp',
        height: 399,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-128-9e57ee33f29de8820baedcde27c413c7.webp',
        height: 85,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/servizi/visita-veterinaria-gratis/@@images/preview_image-64-a6a6405d70d5c2b90298692dce2ffd8f.webp',
        height: 42,
        width: 64,
      },
    },
    size: 199994,
    width: 2000,
  },
  previous_item: {
    '@id': 'http://localhost:3000/servizi/appalti-pubblici',
    '@type': 'Document',
    description: '',
    title: 'Appalti pubblici',
  },
  procedure_collegate: {
    blocks: {
      '3ab3b686-ab6e-4a85-bd7b-361e091c05b3': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'ba4oq',
              text: 'No escape from reality',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['3ab3b686-ab6e-4a85-bd7b-361e091c05b3'],
    },
  },
  relatedItems: [
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
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Chiusa per ristrutturazione la piscina Minghetti',
    },
  ],
  related_news: [],
  review_state: 'private',
  rights: '',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  servizi_collegati: [
    {
      '@id':
        'http://localhost:3000/servizi/appalti-pubblici/concessione-degli-impianti-sportivi',
      '@type': 'Servizio',
      canale_digitale: {
        blocks: {
          '33545c64-eadf-429d-9a20-0ab4451bbf2c': {
            '@type': 'text',
          },
        },
        blocks_layout: {
          items: ['33545c64-eadf-429d-9a20-0ab4451bbf2c'],
        },
      },
      description: 'Domanda per la concessione degli impianti sportivi',
      design_italia_meta_type: 'Servizio',
      effective: null,
      has_children: true,
      id: 'concessione-degli-impianti-sportivi',
      image_field: null,
      image_scales: null,
      parent_title: 'Appalti pubblici',
      parent_url: 'http://localhost:3000/servizi/appalti-pubblici',
      review_state: 'private',
      title: 'Concessione degli impianti sportivi',
    },
  ],
  settore_merceologico: null,
  sottotitolo: 'Visite gratuite per tutti',
  stato_servizio: true,
  subjects: [],
  title: 'Visita veterinaria gratis',
  ulteriori_informazioni: {
    blocks: {
      '89f08a66-9c6a-4a30-86d8-d403475eba6e': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '72f2h',
              text: 'pulled my trigger',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['89f08a66-9c6a-4a30-86d8-d403475eba6e'],
    },
  },
  version: 'current',
  versioning_enabled: true,
  vincoli: {
    blocks: {
      'b3206125-d0d6-474e-935e-09d28602beca': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '2hlds',
              text: 'Little high, little low',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['b3206125-d0d6-474e-935e-09d28602beca'],
    },
  },
  working_copy: null,
  working_copy_of: null,
};

// const mock_servizio_chiuso = {
//   title: 'Chiuso',
//   motivo_stato_servizio: {
//     'content-type': 'text/html',
//     data: '<p>Il servizio non è più erogato</p>',
//     encoding: 'utf-8',
//   },
//   stato_servizio: true,
//   items: [],
//   area: [],
//   ufficio_responsabile: [],
// };

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
      'http://loremipsum.com/unita-organizzative/area_office': {
        data: {
          '@id': 'http://office_link.it',
          title: 'Area legata al servizio',
          description: 'office description',
          city: 'office city',
          zipcode: 'office zip code',
          street: 'office street',
        },
      },
      'http://loremipsum.com/unita-organizzative/ufficio-responsabile_office': {
        data: {
          '@id': 'http://office_link.it',
          title: 'Ufficio responsabile del servizio',
          description: 'office description',
          city: 'office city',
          zipcode: 'office zip code',
          street: 'office street',
        },
      },
      'generic_card_http://loremipsum.com/documento-1': {
        data: {
          '@id': 'http://loremipsum.com/documento-1',
          title: 'Documento collegato',
          description: 'Documento collegato',
        },
      },
      'generic_card_http://loremipsum.com/servizio-di-potatura-e-sfalcio': {
        data: {
          '@id': 'http://loremipsum.com/servizio-di-potatura-e-sfalcio',
          title: 'Servizio di potatura e sfalcio',
          description: 'Servizio di potatura e sfalcio',
        },
      },
      'generic_card_http://loremipsum.com/pagina1': {
        data: {
          '@id': 'http://loremipsum.com/pagina1',
          title: 'Pagina1',
          description: 'Pagina allegata',
        },
      },
      'http://loremipsum.com/ufficio-anagrafe-del-comune_venue': {
        data: {
          '@id': 'http://loremipsum.com/ufficio-anagrafe-del-comune',
          title: 'Ufficio anagrafe',
          description: 'Ufficio anagrafe',
        },
      },
    },
  },
  search: {
    subrequests: {
      allegati: {
        items: [
          {
            '@id':
              'http://loremipsum.com/autocertificazione/allegati/file1.pdf',
            '@type': 'File',
            title: 'File1.pdf',
          },
        ],
      },
      modulistica: {
        items: [
          {
            '@id':
              'http://loremipsum.com/autocertificazione/modulistica/file1.pdf',
            '@type': 'File',
            title: 'File1.pdf',
          },
        ],
      },
    },
  },
});

test('expect to have all mandatory fields in page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ServizioView title={mock_mandatory.title} content={mock_mandatory} />
      </MemoryRouter>
    </Provider>,
  );
  // title
  expect(
    screen.getByRole('heading', { name: /Visita veterinaria gratis/i }),
  ).toBeInTheDocument();

  // descrizione
  expect(screen.getByText(/Fai visitare il tuo cucciolo/i)).toBeInTheDocument();

  //condizioni di servizio
  expect(
    screen.getByRole('heading', { name: /Condizioni di servizio/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: /Termini e condizioni di servizio/i,
      exact: false,
    }),
  ).toBeInTheDocument();

  //argomenti
  expect(
    screen.getAllByRole('link', { name: /Vivere la città/i }),
  ).toBeTruthy();

  // a chi è rivolto
  expect(
    screen.getByRole('heading', { name: /A chi è rivolto/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Animaletti/i)).toBeInTheDocument();

  // come fare
  expect(
    screen.getByRole('heading', { name: /Come fare/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/There's a lady who's sure/i)).toBeInTheDocument();
  // cosa si ottiene
  expect(
    screen.getByRole('heading', { name: /Cosa si ottiene/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/All that glitters is gold/i)).toBeInTheDocument();

  // canale fisico - non appare
  // expect(screen.getByText(/Assessorato al turismo/i)).toBeInTheDocument();

  // cosa serve
  expect(
    screen.getByRole('heading', { name: /Cosa serve/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/And she's buying a stairway to heaven/i),
  ).toBeInTheDocument();

  // tempi e scadenze --> viene renderizzato ma test non funziona
  // Warning: Failed prop type: Invalid prop `content.timeline_tempi_scadenze` of type `array` supplied to `ServizioTempiScadenze`, expected `object`. at ServizioTempiScadenze (http://localhost:3001/static/js/client.chunk.js:430063:5) at WithLoadables (http://localhost:3001/static/js/client.chunk.js:98220:22) at ContentTypeViewSections (http://localhost:3001/static/js/client.chunk.js:402815:5) at section at div at div at ServizioView (http://localhost:3001/static/js/client.chunk.js:430687:5) at div at View (http://localhost:3001/static/js/client.chunk.js:89266:5) at ConnectFunction (http://localhost:3001/static/js/client.chunk.js:220764:75) at injectIntl(Connect(View)) at Route (http://localhost:3001/static/js/client.chunk.js:225530:29) at Switch (http://localhost:3001/static/js/client.chunk.js:225736:29) at main at div at Segment (http://localhost:3001/static/js/client.chunk.js:276242:24) at MultilingualRedirector (http://localhost:3001/static/js/client.chunk.js:85093:5) at PluggablesProvider (http://localhost:3001/static/js/client.chunk.js:65414:5) at App (http://localhost:3001/static/js/client.chunk.js:81834:5) at ConnectFunction (http://localhost:3001/static/js/client.chunk.js:220764:75) at injectIntl(Connect(App)) at ConnectFunction (http://localhost:3001/static/js/client.chunk.js:220764:75) at Route (http://localhost:3001/static/js/client.chunk.js:225530:29) at Switch (http://localhost:3001/static/js/client.chunk.js:225736:29) at Route (http://localhost:3001/static/js/client.chunk.js:225530:29) at AsyncConnect (http://localhost:3001/static/js/client.chunk.js:94571:5) at AsyncConnectWithContext (http://localhost:3001/static/js/client.chunk.js:94690:7) at C (http://localhost:3001/static/js/client.chunk.js:225791:37) at ConnectFunction (http://localhost:3001/static/js/client.chunk.js:220764:75) at ScrollToTop (http://localhost:3001/static/js/client.chunk.js:98680:1) at ConnectFunction (http://localhost:3001/static/js/client.chunk.js:220764:75) at Router (http://localhost:3001/static/js/client.chunk.js:225159:30) at ConnectedRouter (http://localhost:3001/static/js/client.chunk.js:117305:7) at ConnectedRouterWithContext (http://localhost:3001/static/js/client.chunk.js:117411:25) at ConnectFunction (http://localhost:3001/static/js/client.chunk.js:220764:75) at IntlProvider (http://localhost:3001/static/js/client.chunk.js:217621:9) at ConnectFunction (http://localhost:3001/static/js/client.chunk.js:220764:75) at Provider (http://localhost:3001/static/js/client.chunk.js:220477:20) at CookiesProvider (http://localhost:3001/static/js/client.chunk.js:177609:28)

  // await screen.findByText(/Tempi e scadenze/i).toBeInTheDocument();
  // screen.debug();
  // expect(screen.getByText(/Tempi e scadenze/i)).toBeInTheDocument();
  // expect(screen.getByText(/Dopodomani/i)).toBeInTheDocument();
  // expect(screen.getByText(/28/i)).toBeInTheDocument();
  // expect(screen.getByText(/tra due giorni/i)).toBeInTheDocument();
  // expect(
  //   screen.getByText(/any way the wind blows doesn't really matter to/i),
  // ).toBeInTheDocument();

  // contatti
  // unità organizzativa responsabile
  expect(
    screen.getByRole('link', { name: /Giunta e consiglio/i }),
  ).toBeInTheDocument();
  // area
  expect(
    screen.getByRole('link', {
      name: /Area impiantistica sportiva e manifestazioni sportive/i,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Marco Murgia/i }),
  ).toBeInTheDocument();
});

test('expect to have all fields in page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ServizioView content={mock_all_fields} />
      </MemoryRouter>
    </Provider>,
  );

  expect(
    screen.getByText(/Indicazioni d'uso del servizio/i),
  ).toBeInTheDocument();

  // casi_particolari
  expect(
    screen.getByText(/Casi particolari per usufruire del servizio/i),
  ).toBeInTheDocument();
  // chi_puo_presentare
  expect(
    screen.getByText(/Chi può presentare richiesta del servizio/i),
  ).toBeInTheDocument();
  // copertura_geografica
  expect(
    screen.getByText(/Qual'è la copertura geografica del servizio/i),
  ).toBeInTheDocument();
  // costi
  expect(screen.getByText(/Costi del servizio/i)).toBeInTheDocument();
  // descrizione_estesa
  expect(screen.getByText(/Descrizione estesa/i)).toBeInTheDocument();
  // image
  expect(screen.getByAltText(/Caption del servizio/i)).toBeInTheDocument();
  // image_caption
  expect(screen.getByText(/Caption del servizio/i)).toBeInTheDocument();
  // link_siti_esterni
  expect(
    screen.getByText(/https:\/\/www.loremipsum.it\/agid/i),
  ).toBeInTheDocument();
  // relatedItems
  const related_iteems = await waitFor(
    async () => await screen.getByText(/Pagina allegata/i),
  );
  expect(related_iteems).toBeInTheDocument();
  // related_news
  // expect(
  //   getByText(/Descrizione della news collegata al servizio/i),
  // ).toBeInTheDocument();
  // servizi_collegati

  // subtitle
  expect(screen.getByText(/IoAutocertifico/i)).toBeInTheDocument();
  // vincoli
  // expect(
  //   getByText(/Per poter usufruire del servizio ci sono/i),
  // ).toBeInTheDocument();
});

// test('Check parts loaded from child folders', async () => {
//   const { getByText } = render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <ServizioView content={mock_other_fields} />
//       </MemoryRouter>
//     </Provider>,
//   );
//   // const modulistica = await waitForElement(() => getByText(/Modulistica/i));
//   // expect(modulistica).toBeInTheDocument();
//   // const allegati = await waitForElement(() => getByText(/Allegati/i));
//   // expect(allegati).toBeInTheDocument();
// });

// test('Check servizio sospeso', async () => {
//   const { getByText } = render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <ServizioView content={mock_servizio_chiuso} />
//       </MemoryRouter>
//     </Provider>,
//   );
//   // motivo_stato_servizio
//   expect(getByText(/Il servizio non è più erogato/i)).toBeInTheDocument();
// });

// test('todo', () => {
//   expect(mock_other_fields).toBeDefined();
//   expect(mock_servizio_chiuso).toBeDefined();
//   expect(store).toBeDefined();
//   expect(true).toBe(true);
// });
