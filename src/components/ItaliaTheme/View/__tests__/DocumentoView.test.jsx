import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocumentoView from '../DocumentoView/DocumentoView';
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
    'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova',
  '@type': 'Documento',
  UID: 'ef84ead0e0b7462b936508367b467d24',
  description: 'No escape from reality',
  descrizione_estesa: {
    blocks: {
      '9ab23fba-09c6-4574-80fe-a52f6a0969fd': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '9mh9q',
              text: 'Open your eyes',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['9ab23fba-09c6-4574-80fe-a52f6a0969fd'],
    },
  },
  formati_disponibili: {
    blocks: {
      '79f65b24-38c0-4370-beb4-36ba3cb9fa80': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '178ss',
              text: 'ABC',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['79f65b24-38c0-4370-beb4-36ba3cb9fa80'],
    },
  },
  items: [],
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
  tipologia_documento: [
    {
      title: 'Modulistica',
      token: 'modulistica',
    },
  ],
  tipologia_licenze: {
    title: 'Licenza aperta',
    token: 'licenza_aperta',
  },
  title: 'Doc prova',
  ufficio_responsabile: [
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
};

const mock_allfields = {
  ...mock_mandatory,
  allow_discussion: false,
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
  autori: [
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
  business_events: [
    {
      title: 'Bancarotta',
      token: 'bancarotta',
    },
  ],
  changeNote: '',
  contributors: [],
  correlato_in_evidenza: [],
  created: '2023-01-30T11:45:13+00:00',
  creators: ['admin'],
  data_protocollo: null,
  dataset: [],
  design_italia_meta_type: 'Documento',
  documenti_allegati: [
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
  effective: null,
  exclude_from_nav: false,
  expires: null,
  id: 'doc-prova',
  identificativo: 'Caught in a landside',
  image: {
    'content-type': 'image/jpeg',
    download:
      'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-6240-16a8338103466e6b8c82887c8623a1c5.jpeg',
    filename: 'woman-having-online-meeting-work.jpg',
    height: 4160,
    scales: {
      gallery: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-250-9075e4db95ec84fcd9081e9c175ebab6.jpeg',
        height: 166,
        width: 250,
      },
      great: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-1200-f83d464cb7f8298ac82b7cf8d773ccf8.jpeg',
        height: 800,
        width: 1200,
      },
      huge: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-1600-051442251af4a3b1a5c42ec5dd1a5ebe.jpeg',
        height: 1066,
        width: 1600,
      },
      icon: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-32-59a767321767d517a6bc8fd6d66063e4.jpeg',
        height: 21,
        width: 32,
      },
      large: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-800-9146c17a68fcdb67cbe03cee4a549c7c.jpeg',
        height: 533,
        width: 800,
      },
      larger: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-1000-829045217a9d36556afce27de065885c.jpeg',
        height: 666,
        width: 1000,
      },
      listing: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-16-879b9a07d02dbe67e4677d4177c774bf.jpeg',
        height: 10,
        width: 16,
      },
      midi: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-300-deebffea9ca26880cbccb1b04e95d743.jpeg',
        height: 200,
        width: 300,
      },
      mini: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-200-69651e07205407131f934e5778925748.jpeg',
        height: 133,
        width: 200,
      },
      preview: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-400-830b1f848efae08fae7255c3b924fcc7.jpeg',
        height: 266,
        width: 400,
      },
      teaser: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-600-6bb3b5e47df9f3e33877333556c287b3.jpeg',
        height: 400,
        width: 600,
      },
      thumb: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-128-ddf460e04cca942d64e6746a6f033f22.jpeg',
        height: 85,
        width: 128,
      },
      tile: {
        download:
          'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/@@images/image-64-3f3aae0b85cd99cad42d92be9315e463.jpeg',
        height: 42,
        width: 64,
      },
    },
    size: 1195679,
    width: 6240,
  },
  image_caption: 'Look up to the skies and see',
  is_folderish: true,
  items: [
    {
      '@id':
        'http://localhost:3000/documenti-e-dati/cartella-modulistica/doc-prova/multimedia',
      '@type': 'Document',
      description: '',
      design_italia_meta_type: 'Pagina',
      has_children: false,
      id: 'multimedia',
      image_field: '',
      image_scales: null,
      review_state: 'private',
      title: 'Multimedia',
    },
  ],
  items_total: 1,
  language: {
    title: 'Italiano',
    token: 'it',
  },
  layout: 'view',
  licenza_distribuzione: 'I need no sympathy',
  lock: {
    locked: false,
    stealable: true,
  },
  modified: '2023-01-30T13:42:36+00:00',
  next_item: {},
  opengraph_description: null,
  opengraph_image: null,
  opengraph_title: null,
  parent: {
    '@id': 'http://localhost:3000/documenti-e-dati/cartella-modulistica',
    '@type': 'CartellaModulistica',
    description: 'Is this the real life?',
    design_italia_meta_type: 'Cartella Modulistica',
    has_children: true,
    id: 'cartella-modulistica',
    image_field: null,
    image_scales: null,
    review_state: 'private',
    title: 'Cartella modulistica',
  },
  person_life_events: [
    {
      title: 'Denuncia crimini',
      token: 'denuncia_crimini',
    },
  ],
  preview_caption: null,
  preview_image: null,
  previous_item: {},
  protocollo: null,
  relatedItems: [],
  review_state: 'private',
  riferimenti_normativi: {
    blocks: {
      '6fbe9e82-2627-4f2d-ab1b-697677197118': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '2m5ls',
              text: "Because I'm easy come",
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['6fbe9e82-2627-4f2d-ab1b-697677197118'],
    },
  },
  rights: '',
  seo_canonical_url: null,
  seo_description: null,
  seo_noindex: null,
  seo_title: null,
  servizi_collegati: [],
  subjects: [],
  tipologia_documenti_albopretorio: {
    title: 'Atto amministrativo » Decreto',
    token: 'decreto',
  },
  ulteriori_informazioni: {
    blocks: {
      '0628d00f-8d86-44dd-89e0-08417e72fa8e': {
        '@type': 'text',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '70df5',
              text: 'Easy go',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
    blocks_layout: {
      items: ['0628d00f-8d86-44dd-89e0-08417e72fa8e'],
    },
  },
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
      '/amministrazione/uffici/ufficio-delle-attivita-produttive-1_office': {
        loading: false,
        loaded: true,
        error: null,
        data: {
          '@components': {
            actions: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@actions',
            },
            aliases: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@aliases',
            },
            breadcrumbs: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@breadcrumbs',
            },
            contextnavigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@contextnavigation',
            },
            navigation: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@navigation',
            },
            subsite: {},
            translations: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@translations',
            },
            types: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@types',
            },
            workflow: {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/@workflow',
            },
          },
          '@id':
            'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1',
          '@type': 'UnitaOrganizzativa',
          UID: '74618999482247659b5109dcbecb1ab0',
          allow_discussion: false,
          assessore_riferimento: [],
          changeNote: '',
          circoscrizione: null,
          city: null,
          competenze: {
            blocks: {},
            blocks_layout: {
              items: [],
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
          contributors: [],
          correlato_in_evidenza: [],
          country: null,
          created: '2023-01-04T13:44:39+00:00',
          creators: ['admin'],
          description: '',
          design_italia_meta_type: 'Unita Organizzativa',
          documenti_pubblici: [],
          effective: null,
          exclude_from_nav: false,
          expires: null,
          geolocation: {},
          id: 'ufficio-delle-attivita-produttive-1',
          image: null,
          image_caption: null,
          is_folderish: true,
          items: [
            {
              '@id':
                'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive-1/allegati',
              '@type': 'Document',
              description: '',
              design_italia_meta_type: 'Pagina',
              has_children: false,
              id: 'allegati',
              image_field: '',
              image_scales: null,
              review_state: 'private',
              title: 'Allegati',
              url: '/amministrazione/uffici/ufficio-delle-attivita-produttive-1/allegati',
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
          next_item: {},
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
          prestazioni: [
            {
              '@id': 'http://localhost:3000/servizi/visita-veterinaria-gratis',
              '@type': 'Servizio',
              description: 'Fai visitare il tuo cucciolo',
              design_italia_meta_type: 'Servizio',
              has_children: true,
              id: 'visita-veterinaria-gratis',
              image_field: 'preview_image',
              image_scales: {
                image: [
                  {
                    'content-type': 'image/jpeg',
                    download:
                      '@@images/image-6240-2c594a38b2e918a428cf37e96c1745c3.jpeg',
                    filename: 'woman-having-online-meeting-work.jpg',
                    height: 4160,
                    scales: {
                      gallery: {
                        download:
                          '@@images/image-250-5ec6fbc93855e22dfeca3e0ca8bac55e.jpeg',
                        height: 166,
                        width: 250,
                      },
                      great: {
                        download:
                          '@@images/image-1200-fb50dd51062ef46315e69d24bfbeb8c6.jpeg',
                        height: 800,
                        width: 1200,
                      },
                      huge: {
                        download:
                          '@@images/image-1600-b69d1469d3e022ecd6f354619a7d6e56.jpeg',
                        height: 1066,
                        width: 1600,
                      },
                      icon: {
                        download:
                          '@@images/image-32-daf4fb476defdd68e275adc06695ce4a.jpeg',
                        height: 21,
                        width: 32,
                      },
                      large: {
                        download:
                          '@@images/image-800-4985256109694ea9ecaba1277e7d8e13.jpeg',
                        height: 533,
                        width: 800,
                      },
                      larger: {
                        download:
                          '@@images/image-1000-7717236918373cc3a44021f3d8e9df36.jpeg',
                        height: 666,
                        width: 1000,
                      },
                      listing: {
                        download:
                          '@@images/image-16-5355dc03746125b473c40b9fe423c250.jpeg',
                        height: 10,
                        width: 16,
                      },
                      midi: {
                        download:
                          '@@images/image-300-01ad7b7e4e1288408e495666564df0a5.jpeg',
                        height: 200,
                        width: 300,
                      },
                      mini: {
                        download:
                          '@@images/image-200-f4b92a6e52ad43faffae0e515304d0e3.jpeg',
                        height: 133,
                        width: 200,
                      },
                      preview: {
                        download:
                          '@@images/image-400-c521e9abfeb0c3c12ae58669f1490ef2.jpeg',
                        height: 266,
                        width: 400,
                      },
                      teaser: {
                        download:
                          '@@images/image-600-ce3524b95455608ad4dc0ec0c33f486b.jpeg',
                        height: 400,
                        width: 600,
                      },
                      thumb: {
                        download:
                          '@@images/image-128-4a2fe6e8078e7d26ac3f1f40b06a54e5.jpeg',
                        height: 85,
                        width: 128,
                      },
                      tile: {
                        download:
                          '@@images/image-64-f3e4369c785d72d5bca10538dca23d34.jpeg',
                        height: 42,
                        width: 64,
                      },
                    },
                    size: 1195679,
                    width: 6240,
                  },
                ],
                preview_image: [
                  {
                    'content-type': 'image/webp',
                    download:
                      '@@images/preview_image-2000-351417a7e35b93c02255b36e48ce7ad6.webp',
                    filename:
                      'doctor-with-stethoscope-hands-hospital-background_1423-1.webp',
                    height: 1333,
                    scales: {
                      gallery: {
                        download:
                          '@@images/preview_image-250-ad52823cf13a882e9a150eb50dbd625d.webp',
                        height: 166,
                        width: 250,
                      },
                      great: {
                        download:
                          '@@images/preview_image-1200-3e5150e4490984a99836488f9c765e14.webp',
                        height: 799,
                        width: 1200,
                      },
                      huge: {
                        download:
                          '@@images/preview_image-1600-825624e70971ca938e4b0aaf8279141b.webp',
                        height: 1066,
                        width: 1600,
                      },
                      icon: {
                        download:
                          '@@images/preview_image-32-dedbe08f8301a8dd43fe12c46c51f555.webp',
                        height: 21,
                        width: 32,
                      },
                      large: {
                        download:
                          '@@images/preview_image-800-324f4d314c250c5748afc4710e7d3573.webp',
                        height: 533,
                        width: 800,
                      },
                      larger: {
                        download:
                          '@@images/preview_image-1000-6c403d01ee832304f24ca85e0210508a.webp',
                        height: 666,
                        width: 1000,
                      },
                      listing: {
                        download:
                          '@@images/preview_image-16-f3e9c45fd509de692f510eebce7dd927.webp',
                        height: 10,
                        width: 16,
                      },
                      midi: {
                        download:
                          '@@images/preview_image-300-4c45e1a97d91f5eb425ac173b9f8136f.webp',
                        height: 199,
                        width: 300,
                      },
                      mini: {
                        download:
                          '@@images/preview_image-200-8928c72a6e53664f0a18c8561a407976.webp',
                        height: 133,
                        width: 200,
                      },
                      preview: {
                        download:
                          '@@images/preview_image-400-673b9ca9b4592cddefd2b247a00b7590.webp',
                        height: 266,
                        width: 400,
                      },
                      teaser: {
                        download:
                          '@@images/preview_image-600-119e03f73c6eedf5e4fde351c610205d.webp',
                        height: 399,
                        width: 600,
                      },
                      thumb: {
                        download:
                          '@@images/preview_image-128-a84697ad5ac7c4c1a032b74d458d3a91.webp',
                        height: 85,
                        width: 128,
                      },
                      tile: {
                        download:
                          '@@images/preview_image-64-c5090aa89408b0b6fd7d52093e5809f8.webp',
                        height: 42,
                        width: 64,
                      },
                    },
                    size: 199994,
                    width: 2000,
                  },
                ],
              },
              review_state: 'private',
              title: 'Visita veterinaria gratis',
            },
          ],
          preview_caption: null,
          preview_image: null,
          previous_item: {
            '@id':
              'http://localhost:3000/amministrazione/uffici/ufficio-delle-attivita-produttive',
            '@type': 'PuntoDiContatto',
            description: '',
            title: 'Ufficio delle Attività Produttive',
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
          servizi_offerti: [],
          street: null,
          subjects: [],
          tassonomia_argomenti: [],
          tipologia_organizzazione: null,
          title: 'Ufficio delle Attività Produttive',
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
    },
  },
});

test('renders all mandatory fields in the page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <DocumentoView content={mock_mandatory} />
      </MemoryRouter>
    </Provider>,
  );

  //title
  expect(
    screen.getByRole('heading', { name: /Doc prova/i }),
  ).toBeInTheDocument();

  //summary
  expect(screen.getByText(/No escape from reality/i)).toBeInTheDocument();

  // formati disponibili --> non appare
  expect(screen.getByText(/ABC/i)).toBeInTheDocument();

  //argomenti
  expect(screen.getByRole('link', { name: /Muoversi/i })).toBeInTheDocument();

  // tipologia del documento --> non appare
  expect(screen.getByText(/Modulistica/i)).toBeInTheDocument();

  //ufficio responsabile
  expect(
    screen.getByRole('heading', { name: /Ufficio responsabile/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Ufficio delle attività produttive/i }),
  ).toBeInTheDocument();

  //descrizione estesa
  expect(
    screen.getByRole('heading', { name: /Descrizione/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Open your eyes/i)).toBeInTheDocument();

  // licenze --> non appare
  expect(screen.getByText(/Licenza aperta/i)).toBeInTheDocument();
});

test('renders all non-mandatory fields in the page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <DocumentoView content={mock_allfields} />
      </MemoryRouter>
    </Provider>,
  );

  // identificativo del documento --> non appare
  expect(screen.getByText(/Caught in a landside/i)).toBeInTheDocument();

  // numero di protocollo --> non appare
  expect(screen.getByText(/123/i)).toBeInTheDocument();

  // data di protocollo --> non appare
  expect(screen.getByText('26/01/1996')).toBeInTheDocument();

  //Dataset --> non appare
  expect(screen.getByText(/Prova/i)).toBeInTheDocument();

  // immagine di testata
  expect(
    screen.getByAltText(/Look up to the skies and see/i),
  ).toBeInTheDocument();
  expect(screen.getByText(/Look up to the skies and see/i)).toBeInTheDocument();

  //eventi della vita delle persone --> non appare
  expect(screen.getByText(/Denuncia crimini/i)).toBeInTheDocument();

  //eventi della vita delle imprese --> non appare
  expect(screen.getByText(/Bancarotta/i)).toBeInTheDocument();

  //tipologia di documento albo pretorio --> non appare
  expect(screen.getByText(/Decreto/i, { exact: false })).toBeInTheDocument();

  //area responsabile
  expect(
    screen.getByRole('heading', { name: /Area responsabile/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: /Area impiantistica sportiva e manifestazioni sportive/i,
    }),
  ).toBeInTheDocument();

  //autori
  expect(screen.getByRole('heading', { name: /Autori/i })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Franco Franchini/i }),
  ).toBeInTheDocument();

  //licenza di distribuzione
  expect(
    screen.getByRole('heading', { name: /Licenza di distribuzione/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/I need no sympathy/i)).toBeInTheDocument();

  //riferimenti normativi
  expect(
    screen.getByRole('heading', { name: /Riferimenti normativi/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Because I'm easy come/i)).toBeInTheDocument();

  //documenti allegati
  expect(
    screen.getByRole('heading', { name: /Documenti allegati/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Piano lavori 2023/i }),
  ).toBeInTheDocument();

  //ulteriori informazioni
  expect(screen.getByText(/Easy go/i)).toBeInTheDocument();
});
