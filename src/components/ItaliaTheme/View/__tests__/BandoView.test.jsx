import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BandoView from '../BandoView/BandoView';
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
    'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman',
  '@type': 'Bando',
  UID: 'ff82688a5a5f4484a8d2eec481e10c7c',
  bando_state: ['open', 'Open'],
  tipologia_bando: {
    title: 'Acquisizione beni e servizi',
    token: 'beni_servizi',
  },
  title: 'Bando per diventare Ironman',
};

const mock_allfields = {
  ...mock_mandatory,
  allow_discussion: false,
  apertura_bando: '2023-01-01T09:00:00',
  approfondimento: [],
  area_responsabile: [
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
  bando_state: ['open', 'Open'],
  changeNote: '',
  chiusura_procedimento_bando: '2023-03-15',
  contributors: [],
  correlato_in_evidenza: [
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
  created: '2023-01-27T15:17:10+00:00',
  creators: ['admin'],
  description: 'Is this the real life?',
  design_italia_meta_type: 'Bando',
  destinatari: [
    {
      title: 'Cittadini',
      token: 'Cittadini',
    },
  ],
  effective: null,
  ente_bando: ['Marvel'],
  exclude_from_nav: false,
  expires: null,
  id: 'bando-per-diventare-ironman',
  is_folderish: true,
  items: [
    {
      '@id':
        'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/documenti',
      '@type': 'Bando Folder Deepening',
      description: '',
      design_italia_meta_type: 'Cartella Approfondimento',
      has_children: false,
      id: 'documenti',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Documenti',
    },
    {
      '@id':
        'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/comunicazioni',
      '@type': 'Bando Folder Deepening',
      description: '',
      design_italia_meta_type: 'Cartella Approfondimento',
      has_children: false,
      id: 'comunicazioni',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Comunicazioni',
    },
    {
      '@id':
        'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/esiti',
      '@type': 'Bando Folder Deepening',
      description: '',
      design_italia_meta_type: 'Cartella Approfondimento',
      has_children: false,
      id: 'esiti',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Esiti',
    },
  ],
  items_total: 3,
  language: {
    title: 'Italiano',
    token: 'it',
  },
  layout: 'view',
  lock: {
    locked: false,
    stealable: true,
  },
  modified: '2023-01-27T15:17:11+00:00',
  next_item: {},
  opengraph_description: null,
  opengraph_image: null,
  opengraph_title: null,
  parent: {
    '@id': 'http://localhost:3000/documenti-e-dati/bandi',
    '@type': 'Document',
    description: '',
    design_italia_meta_type: 'Pagina',
    has_children: true,
    id: 'bandi',
    image_field: null,
    image_scales: null,
    review_state: 'private',
    title: 'Bandi',
  },
  preview_caption: 'immagine preview',
  preview_image: {
    'content-type': 'image/jpeg',
    download:
      'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-6240-fd26b03b3e447160d6fbe18c66b6f65c.jpeg',
    filename: 'woman-having-online-meeting-work.jpg',
    height: 4160,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-250-65852bdbdb6c29e64a6daa0caa689b0c.jpeg',
        height: 166,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-1200-b1b7d0ce7d2df16a10e2a479ccbe293d.jpeg',
        height: 800,
        width: 1200,
      },
      huge: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-1600-bdd0c8546bee630402d1834b547ae89f.jpeg',
        height: 1066,
        width: 1600,
      },
      icon: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-32-727ad120bb64e874c84a87f96ab37cd7.jpeg',
        height: 21,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-800-8b15a4b0b0509bda828431ff5d185661.jpeg',
        height: 533,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-1000-870b8896876edc5e4062b41df533c945.jpeg',
        height: 666,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-16-57854085b918473ea28dffa7e67f01a5.jpeg',
        height: 10,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-300-6e58bec63227d91becf1fe9b9bf8ebec.jpeg',
        height: 200,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-200-16b058f634abefc39274d2ed5ae3d447.jpeg',
        height: 133,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-400-18f1c7ad193e51291ae8d5d64ac8be77.jpeg',
        height: 266,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-600-6446e66e69e4752d92782865de498b23.jpeg',
        height: 400,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-128-75768755b675beedff8fbd2226cce5f4.jpeg',
        height: 85,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/documenti-e-dati/bandi/bando-per-diventare-ironman/@@images/preview_image-64-5b765bf5245c10a53d64498ee8fd8f46.jpeg',
        height: 42,
        width: 64,
      },
    },
    size: 1195679,
    width: 6240,
  },
  previous_item: {},
  relatedItems: [
    {
      '@id': 'http://localhost:3000/novita/notizie/osservatorio-sul-turismo',
      '@type': 'News Item',
      description:
        'Donec in consequat nunc. Duis semper fermentum lacus, ac condimentum justo auctor a. Nam erat erat, porta vel pharetra in, ullamcorper vel turpis.',
      design_italia_meta_type: 'Notizia',
      effective: '2019-12-03T11:09:00+00:00',
      has_children: true,
      id: 'osservatorio-sul-turismo',
      image_field: null,
      image_scales: null,
      review_state: 'private',
      title: 'Osservatorio sul turismo',
    },
  ],
  review_state: 'private',
  riferimenti_bando: {
    blocks: {
      'cb1ede9e-0f81-46c2-a5e2-cd83f69357d4': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '59c66',
              text: 'Caught in a landside',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['cb1ede9e-0f81-46c2-a5e2-cd83f69357d4'],
    },
  },
  rights: '',
  scadenza_bando: '2023-02-28T10:07:03+00:00',
  scadenza_domande_bando: '2023-01-31T10:00:44',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  subjects: [],
  table_of_contents: null,
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
  text: {
    blocks: {
      '92c8c380-c65d-4cfa-bb3f-4276124731ae': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '6onam',
              text: 'Is this just fantasy?',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['92c8c380-c65d-4cfa-bb3f-4276124731ae'],
    },
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
  update_note: 'No escape from reality',
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
  content: {
    subrequests: {
      '/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive_office':
        {
          loading: false,
          loaded: true,
          error: null,
          data: {
            '@components': {
              actions: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@actions',
              },
              aliases: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@aliases',
              },
              breadcrumbs: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@breadcrumbs',
              },
              contextnavigation: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@contextnavigation',
              },
              navigation: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@navigation',
              },
              subsite: {},
              translations: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@translations',
              },
              types: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@types',
              },
              workflow: {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/@workflow',
              },
            },
            '@id':
              'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive',
            '@type': 'UnitaOrganizzativa',
            UID: '956e481bda7c4a5da6ce4dab0cbbb0be',
            allow_discussion: false,
            assessore_riferimento: [],
            changeNote: '',
            circoscrizione: null,
            city: null,
            competenze: {
              blocks: {
                '68c21d17-ea6b-4469-9e10-ff6029d49419': {
                  '@type': 'text',
                },
              },
              blocks_layout: {
                items: ['68c21d17-ea6b-4469-9e10-ff6029d49419'],
              },
            },
            contact_info: [],
            contributors: [],
            correlato_in_evidenza: [],
            country: null,
            created: '2023-01-03T16:32:16+00:00',
            creators: ['admin'],
            description: 'Dirigente Arch. M. Alessandra Verdi',
            design_italia_meta_type: 'Unita Organizzativa',
            documenti_pubblici: [],
            effective: null,
            exclude_from_nav: false,
            expires: null,
            geolocation: {},
            id: 'area-impiantistica-sportiva-e-manifestazioni-sportive',
            image: null,
            image_caption: null,
            is_folderish: true,
            items: [
              {
                '@id':
                  'http://localhost:3000/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/allegati',
                '@type': 'Document',
                description: '',
                design_italia_meta_type: 'Pagina',
                has_children: false,
                id: 'allegati',
                image_field: '',
                image_scales: null,
                review_state: 'private',
                title: 'Allegati',
                url: '/amministrazione/aree-di-competenza/area-impiantistica-sportiva-e-manifestazioni-sportive/allegati',
              },
            ],
            items_total: 1,
            language: {
              title: 'Italiano',
              token: 'it',
            },
            layout: 'view',
            legami_con_altre_strutture: [
              {
                '@id':
                  'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio',
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
            lock: {
              locked: false,
              stealable: true,
            },
            modified: '2023-01-19T12:04:48+00:00',
            next_item: {},
            nome_sede: null,
            opengraph_description: null,
            opengraph_image: null,
            opengraph_title: null,
            parent: {
              '@id': 'http://localhost:3000/amministrazione/aree-di-competenza',
              '@type': 'Document',
              description: '',
              design_italia_meta_type: 'Pagina',
              has_children: true,
              id: 'aree-di-competenza',
              image_field: null,
              image_scales: null,
              review_state: 'private',
              title: 'Aree di competenza',
            },
            persone_struttura: [],
            prestazioni: [],
            preview_caption: null,
            preview_image: null,
            previous_item: {},
            quartiere: null,
            relatedItems: [],
            related_news: [],
            responsabile: [],
            review_state: 'private',
            rights: '',
            sede: [],
            sedi_secondarie: [],
            seo_canonical_url: null,
            seo_description: null,
            seo_noindex: null,
            seo_title: null,
            servizi_offerti: [
              {
                '@id':
                  'http://localhost:3000/servizi/visita-veterinaria-gratis',
                '@type': 'Servizio',
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
                description: 'Fai visitare il tuo cucciolo',
                design_italia_meta_type: 'Servizio',
                has_children: true,
                id: 'visita-veterinaria-gratis',
                image_field: null,
                image_scales: null,
                parent_title: 'Servizi',
                parent_url: 'http://localhost:3000/servizi',
                review_state: 'private',
                title: 'Visita veterinaria gratis',
              },
            ],
            street: null,
            subjects: [],
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
            tipologia_organizzazione: {
              title: 'Struttura amministrativa',
              token: 'struttura_amministrativa',
            },
            title: 'Area impiantistica sportiva e manifestazioni sportive',
            ulteriori_informazioni: {
              blocks: {
                'b5d8cddb-45d9-4025-bc0d-1cb08ea40706': {
                  '@type': 'text',
                },
              },
              blocks_layout: {
                items: ['b5d8cddb-45d9-4025-bc0d-1cb08ea40706'],
              },
            },
            uo_children: [],
            uo_parent: null,
            version: 'current',
            versioning_enabled: true,
            working_copy: null,
            working_copy_of: null,
            zip_code: null,
          },
        },

      '/amministrazione/uffici/giunta-e-consiglio_office': {
        loading: false,
        loaded: true,
        error: null,
        data: {
          '@components': {
            actions: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@actions',
            },
            aliases: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@aliases',
            },
            breadcrumbs: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@breadcrumbs',
            },
            contextnavigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@contextnavigation',
            },
            navigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@navigation',
            },
            subsite: {},
            translations: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@translations',
            },
            types: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@types',
            },
            workflow: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/@workflow',
            },
          },
          '@id':
            'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio',
          '@type': 'UnitaOrganizzativa',
          UID: '4b56678a54884616aa8b7cb230d27794',
          allow_discussion: false,
          assessore_riferimento: [],
          changeNote: '',
          circoscrizione: null,
          city: null,
          competenze: {
            blocks: {
              '84a4a7af-5b14-4161-84c0-008b501a4dc7': {
                '@type': 'text',
              },
            },
            blocks_layout: {
              items: ['84a4a7af-5b14-4161-84c0-008b501a4dc7'],
            },
          },
          contact_info: [],
          contributors: [],
          correlato_in_evidenza: [],
          country: null,
          created: '2023-01-03T15:47:46+00:00',
          creators: ['admin'],
          description: '',
          design_italia_meta_type: 'Unita Organizzativa',
          documenti_pubblici: [],
          effective: null,
          exclude_from_nav: false,
          expires: null,
          geolocation: {},
          id: 'giunta-e-consiglio',
          image: null,
          image_caption: null,
          is_folderish: true,
          items: [
            {
              '@id':
                'http://localhost:3000/amministrazione/uffici/giunta-e-consiglio/allegati',
              '@type': 'Document',
              description: '',
              design_italia_meta_type: 'Pagina',
              has_children: false,
              id: 'allegati',
              image_field: '',
              image_scales: null,
              review_state: 'private',
              title: 'Allegati',
              url: '/amministrazione/uffici/giunta-e-consiglio/allegati',
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
              'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo',
            '@type': 'UnitaOrganizzativa',
            description: '',
            title: 'Assessorato al Turismo',
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
          preview_image: null,
          previous_item: {
            '@id':
              'http://localhost:3000/amministrazione/uffici/gestione-impianti-sportivi',
            '@type': 'UnitaOrganizzativa',
            description: '',
            title: 'Gestione impianti sportivi',
          },
          quartiere: null,
          relatedItems: [],
          related_news: [],
          responsabile: [],
          review_state: 'private',
          rights: '',
          sede: [],
          sedi_secondarie: [],
          seo_canonical_url: null,
          seo_description: null,
          seo_noindex: null,
          seo_title: null,
          servizi_offerti: [
            {
              '@id': 'http://localhost:3000/servizi/visita-veterinaria-gratis',
              '@type': 'Servizio',
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
              description: 'Fai visitare il tuo cucciolo',
              design_italia_meta_type: 'Servizio',
              has_children: true,
              id: 'visita-veterinaria-gratis',
              image_field: null,
              image_scales: null,
              parent_title: 'Servizi',
              parent_url: 'http://localhost:3000/servizi',
              review_state: 'private',
              title: 'Visita veterinaria gratis',
            },
          ],
          street: null,
          subjects: [],
          tassonomia_argomenti: [],
          tipologia_organizzazione: {
            title: 'Struttura amministrativa',
            token: 'struttura_amministrativa',
          },
          title: 'Giunta e consiglio',
          ulteriori_informazioni: {
            blocks: {},
            blocks_layout: {
              items: [],
            },
          },
          uo_children: [],
          uo_parent: null,
          version: 'current',
          versioning_enabled: true,
          working_copy: null,
          working_copy_of: null,
          zip_code: null,
        },
      },

      'generic_card_/novita/notizie/osservatorio-sul-turismo': {
        loading: false,
        loaded: true,
        error: null,
        data: {
          '@components': {
            actions: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@actions',
            },
            aliases: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@aliases',
            },
            breadcrumbs: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@breadcrumbs',
            },
            contextnavigation: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@contextnavigation',
            },
            navigation: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@navigation',
            },
            subsite: {},
            translations: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@translations',
            },
            types: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@types',
            },
            workflow: {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@workflow',
            },
          },
          '@id':
            'http://localhost:3000/novita/notizie/osservatorio-sul-turismo',
          '@type': 'News Item',
          UID: '47289573edbc4a5087eea97d01a6c8bc',
          a_cura_di: [
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
          a_cura_di_persone: [],
          allow_discussion: false,
          changeNote: '',
          contributors: [],
          correlato_in_evidenza: [],
          created: '2023-01-04T10:08:46+00:00',
          creators: ['admin'],
          description:
            'Donec in consequat nunc. Duis semper fermentum lacus, ac condimentum justo auctor a. Nam erat erat, porta vel pharetra in, ullamcorper vel turpis.',
          descrizione_estesa: {
            blocks: {
              '1a1f071d-569b-465d-be06-0208b177724d': {
                '@type': 'text',
                text: {
                  blocks: [
                    {
                      data: {},
                      depth: 0,
                      entityRanges: [],
                      inlineStyleRanges: [],
                      key: 'b1r54',
                      text: 'Vivamus orci risus, fringilla sit amet enim vel, semper faucibus elit. Aliquam nec laoreet leo. Integer eu venenatis purus, eu tincidunt eros. Aliquam egestas est quis lacinia ultrices. Vestibulum vehicula sit amet purus id suscipit. Sed gravida urna tellus, sed aliquet erat faucibus porta. Aenean condimentum.',
                      type: 'unstyled',
                    },
                  ],
                  entityMap: {},
                },
              },
              'a959cd72-9bce-493e-bd68-9d97f5e7965c': {
                '@type': 'text',
                text: {
                  blocks: [
                    {
                      data: {},
                      depth: 0,
                      entityRanges: [],
                      inlineStyleRanges: [],
                      key: 'fgns2',
                      text: 'Descrizione',
                      type: 'header-two',
                    },
                  ],
                  entityMap: {},
                },
              },
            },
            blocks_layout: {
              items: [
                'a959cd72-9bce-493e-bd68-9d97f5e7965c',
                '1a1f071d-569b-465d-be06-0208b177724d',
              ],
            },
          },
          design_italia_meta_type: 'Notizia',
          effective: '2019-12-03T11:09:00+00:00',
          exclude_from_nav: false,
          expires: null,
          id: 'osservatorio-sul-turismo',
          image: {
            'content-type': 'image/png',
            download:
              'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-1156-c094bb5c2dc00c7e35fb6e86c39554d7.png',
            filename: 'foto-ospedale.png',
            height: 940,
            scales: {
              gallery: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-250-3b0282cd29acba6e89db34e489e3595e.png',
                height: 203,
                width: 250,
              },
              great: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-1200-22277e74e0047ea44bc371f1af49519b.png',
                height: 940,
                width: 1156,
              },
              huge: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-1600-d94832ce2cbc67eb01c1407921242e4d.png',
                height: 940,
                width: 1156,
              },
              icon: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-32-7167c9ac8896506fef516e3c603935ac.png',
                height: 26,
                width: 32,
              },
              large: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-800-dcf1d9a887df95a771ee9ce05e029e48.png',
                height: 650,
                width: 800,
              },
              larger: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-1000-f27f06722d1699e3de50f91ea90ddfdb.png',
                height: 813,
                width: 1000,
              },
              listing: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-16-f0257c07396bd9116228983c9574771d.png',
                height: 13,
                width: 16,
              },
              midi: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-300-3a89a9a6a73de60acf2a7472fd6e48c9.png',
                height: 243,
                width: 300,
              },
              mini: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-200-3462630e79a7bb23ba38d246781867c5.png',
                height: 162,
                width: 200,
              },
              preview: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-400-ffeea08e7e9d30a340472a30f88cd4d3.png',
                height: 325,
                width: 400,
              },
              teaser: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-600-8b983b752a9141c04191b0bd7be9b509.png',
                height: 487,
                width: 600,
              },
              thumb: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-128-5878cd60521a7d68ab1aac1141b1a232.png',
                height: 104,
                width: 128,
              },
              tile: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/image-64-62380f15653ca9c852052a334bb5e4c9.png',
                height: 52,
                width: 64,
              },
            },
            size: 1296882,
            width: 1156,
          },
          image_caption: "Una didascalia per l'immagine sopra.",
          is_folderish: true,
          items: [
            {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/multimedia',
              '@type': 'Document',
              description: '',
              design_italia_meta_type: 'Pagina',
              has_children: false,
              id: 'multimedia',
              image_field: '',
              image_scales: null,
              review_state: 'private',
              title: 'Multimedia',
              url: '/novita/notizie/osservatorio-sul-turismo/multimedia',
            },
            {
              '@id':
                'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/documenti-allegati',
              '@type': 'Document',
              description: '',
              design_italia_meta_type: 'Pagina',
              has_children: true,
              id: 'documenti-allegati',
              image_field: '',
              image_scales: null,
              review_state: 'private',
              title: 'Documenti allegati',
              url: '/novita/notizie/osservatorio-sul-turismo/documenti-allegati',
            },
          ],
          items_total: 2,
          language: {
            title: 'Italiano',
            token: 'it',
          },
          layout: 'newsitem_view',
          lock: {
            locked: false,
            stealable: true,
          },
          luoghi_correlati: [],
          modified: '2023-01-19T12:04:48+00:00',
          next_item: {},
          notizie_correlate: [],
          numero_progressivo_cs: null,
          opengraph_description: null,
          opengraph_image: null,
          opengraph_title: null,
          parent: {
            '@id': 'http://localhost:3000/novita/notizie',
            '@type': 'Document',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula fermentum eros a elementum. Donec.',
            design_italia_meta_type: 'Pagina',
            has_children: true,
            id: 'notizie',
            image_field: null,
            image_scales: null,
            review_state: 'private',
            title: 'Notizie',
          },
          preview_caption: "Una didascalia per l'immagine sopra",
          preview_image: {
            'content-type': 'image/png',
            download:
              'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-1156-97eafca2d9adf2a8093aa4bd222298ca.png',
            filename: 'foto-ospedale.png',
            height: 940,
            scales: {
              gallery: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-250-7d2c91bdaa911da91a80c240f4eaf97a.png',
                height: 203,
                width: 250,
              },
              great: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-1200-3a7316f12d617366d900bc11166346a1.png',
                height: 940,
                width: 1156,
              },
              huge: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-1600-dec02251d3a0fa2ff01f8257c24cf5ba.png',
                height: 940,
                width: 1156,
              },
              icon: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-32-8768b0830b355e9343577782227e950f.png',
                height: 26,
                width: 32,
              },
              large: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-800-f873ced3d03f125d6082b36d8a5aaba3.png',
                height: 650,
                width: 800,
              },
              larger: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-1000-83aeb1fbae6741eeb58ca3d9320fbd77.png',
                height: 813,
                width: 1000,
              },
              listing: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-16-780d56a712328d39936fefc2a00a0b32.png',
                height: 13,
                width: 16,
              },
              midi: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-300-13182b93e2e289079fcb0c83782d63bb.png',
                height: 243,
                width: 300,
              },
              mini: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-200-9102732c7ca035d6187b14868643bb42.png',
                height: 162,
                width: 200,
              },
              preview: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-400-53dd9347f53c680de283bac15ed876dd.png',
                height: 325,
                width: 400,
              },
              teaser: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-600-8dafea6a9881d1a8d0146d995cb6a9f8.png',
                height: 487,
                width: 600,
              },
              thumb: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-128-e58700fdc985abe670afa090afe13508.png',
                height: 104,
                width: 128,
              },
              tile: {
                download:
                  'http://localhost:3000/novita/notizie/osservatorio-sul-turismo/@@images/preview_image-64-0fe74aaaa862a21b4f60c9f8b5fcfe38.png',
                height: 52,
                width: 64,
              },
            },
            size: 1296882,
            width: 1156,
          },
          previous_item: {},
          relatedItems: [],
          review_state: 'private',
          rights: '',
          seo_canonical_url: null,
          seo_description: null,
          seo_noindex: null,
          seo_title: null,
          subjects: [],
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
          tipologia_notizia: 'Notizia',
          title: 'Osservatorio sul turismo',
          version: 'current',
          versioning_enabled: true,
          working_copy: null,
          working_copy_of: null,
        },
      },
    },
  },
});

test('renders all mandatory fields in the page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <BandoView content={mock_mandatory} />
      </MemoryRouter>
    </Provider>,
  );

  //title
  expect(
    screen.getByRole('heading', { name: /Bando per diventare Ironman/i }),
  ).toBeInTheDocument();

  //tipologia del bando
  expect(
    screen.getByRole('heading', { name: /Tipologia del bando/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Acquisizione beni e servizi/i)).toBeInTheDocument();

  //stato del bando
  expect(screen.getByText(/Bando attivo/i)).toBeInTheDocument();
});

test('renders all non-mandatory fields in the page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <BandoView content={mock_allfields} />
      </MemoryRouter>
    </Provider>,
  );

  //descrizione
  expect(
    screen.getByRole('heading', { name: /Descrizione/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Is this the real life?/i)).toBeInTheDocument();

  //testo
  expect(screen.getByText(/Is this just fantasy?/i)).toBeInTheDocument();

  //destinatari del bando
  expect(
    screen.getByRole('heading', { name: /Destinatari del bando/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Cittadini/i)).toBeInTheDocument();

  //autorità
  expect(
    screen.getByRole('heading', { name: /Ente erogatore/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Marvel/i)).toBeInTheDocument();

  // apertura bando --> non appare se non sono compilati sia apertura che termine del bando
  expect(
    screen.getByText(/Apertura del bando/i, { exact: false }),
  ).toBeInTheDocument();

  // termine per la richiesta
  expect(
    screen.getByText(/Termine per le richieste di chiarimenti/i, {
      exact: false,
    }),
  ).toBeInTheDocument();

  //scadenza bando
  expect(
    screen.getByText(/Scadenza dei termini per partecipare al bando/i, {
      exact: false,
    }),
  ).toBeInTheDocument();

  //chiusura procedure
  expect(screen.getByText(/Chiusura del procedimento/i)).toBeInTheDocument();

  //ulteriori informazioni
  expect(screen.getByText(/Caught in a landside/i)).toBeInTheDocument();

  // note di aggiornamento --> non compare
  expect(screen.getByText(/No escape from reality/i)).toBeInTheDocument();

  //area responsabile
  expect(
    screen.getByRole('heading', { name: /Area responsabile/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: /Area impiantistica sportiva/i,
      exact: false,
    }),
  ).toBeInTheDocument();

  //ufficio responsabile
  expect(
    screen.getByRole('heading', { name: /Ufficio responsabile/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Giunta e consiglio/i }),
  ).toBeInTheDocument();

  //contenuti correlati
  expect(
    screen.getByRole('heading', { name: /Contenuti correlati/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Osservatorio sul turismo/i }),
  ).toBeInTheDocument();

  //argomenti
  expect(screen.getAllByRole('link', { name: /Cultura/i })).toBeTruthy();

  //correlati in evidenza
  expect(
    screen.getByText(/Chiusa per ristrutturazione la piscina Minghetti/i),
  ).toBeInTheDocument();
});
