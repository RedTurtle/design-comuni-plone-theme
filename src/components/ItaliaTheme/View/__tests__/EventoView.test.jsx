import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
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
      },
    },
    blocks_layout: {
      items: ['d8f67e41-c9a1-4993-9b0b-6124db188de2'],
    },
  },
  organizzato_da_interno: [],
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
  strutture_politiche: [],
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
  circoscrizione: null,
  city: null,
  contributors: [],
  correlato_in_evidenza: [],
  country: null,
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
    latitude: 0,
    longitude: 0,
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
  open_end: false,
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
  patrocinato_da: null,
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
      },
    },
    blocks_layout: {
      items: ['3ae432d0-6255-4168-8fba-578c46f2321d'],
    },
  },
  quartiere: null,
  recurrence: null,
  relatedItems: [],
  review_state: 'private',
  rights: '',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  sottotitolo: 'Sottotitolo del mega evento',
  street: null,
  subjects: [],
  supportato_da: [],
  sync_uid: null,
  tassonomia_argomenti: [
    {
      '@id': 'http://localhost:3000/argomenti/cultura',
      '@type': 'Pagina Argomento',
      description: '',
      design_italia_meta_type: 'Argomento',
      effective: null,
      has_children: false,
      id: 'cultura',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Cultura',
    },
  ],
  ulteriori_informazioni: {
    blocks: {
      'fe8ee3f2-c1b3-4692-98ed-d9ca7821fbab': {
        '@type': 'text',
      },
    },
    blocks_layout: {
      items: ['fe8ee3f2-c1b3-4692-98ed-d9ca7821fbab'],
    },
  },
  version: 'current',
  versioning_enabled: true,
  whole_day: false,
  working_copy: null,
  working_copy_of: null,
  zip_code: null,
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
      'luogohttp://loremipsum.com/amministrazione/luoghi/ravenna-1': {
        data: {
          '@id': 'http://loremipsum.com/amministrazione/luoghi/ravenna-1',
          '@type': 'Venue',
          description: '',
          review_state: 'private',
          title: 'Ravenna',
        },
      },
      'http://loremipsum.com/amministrazione/enti-e-fondazioni/ente-svago_office':
        {
          data: {
            '@id':
              'http://loremipsum.com/amministrazione/enti-e-fondazioni/ente-svago',
            '@type': 'Unita organizzativa',
            UID: 'c5ee7af923204be484ffd329f91f3de2',
            city: 'Lugo',
            email: 'martina.bustacchini@redturtle.it',
            phone: '03468492433',
            street: 'Ravegnana 158a',
            title: 'Ente svago',
            website: null,
            zip_code: null,
          },
          'http://loremipsum.com/amministrazione/luoghi/ravenna-1_venue': {
            data: {
              '@id': 'http://loremipsum.com/amministrazione/luoghi/ravenna-1',
              '@type': 'Venue',
              UID: '42abd9ce876f4eea9bca32b6845d3a71',
              id: 'ravenna-1',
              title: 'Ravenna',
            },
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
  const { getByText } = render(
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
  // // a chi è rivolto
  // expect(screen.getByText(/Programmatori RedTurtle/i)).toBeInTheDocument();
  // //tipo evento
  // expect(screen.getByText(/Evento culturale/i)).toBeInTheDocument();

  // non riesco a testare il campo inizio evento - fine evento, solo il blocco date e orari
  // // inizio evento - fine evento
  expect(
    screen.getByRole('heading', { name: /Date e orari/i }),
  ).not.toBeInTheDocument();
  // expect(screen.getByText(/Inizio evento/i)).toBeInTheDocument();
  // // fine evento
  // expect(
  //   screen.getByRole('heading', { name: /Fine evento/i }),
  // ).toBeInTheDocument();

  //punto di contatto
  expect(screen.getByRole('heading', { name: 'Contatti' })).toBeInTheDocument();
});

it('expect to have all non-mandatory fields in page', async () => {
  const { getByText } = render(
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
  expect(screen.getByRole('link', { name: /Cultura/i })).toBeInTheDocument();
  // sottotitolo
  expect(
    screen.getByText(/sottotitolo del mega evento/i, { exact: false }),
  ).toBeInTheDocument();
  // // parteciperanno
  // expect(screen.getByText(/Franco Franchini/i)).toBeInTheDocument();

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

  // screen.getByRole('');
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
