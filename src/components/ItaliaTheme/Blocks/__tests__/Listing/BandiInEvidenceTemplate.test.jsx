import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BandiInEvidenceTemplate from '../../Listing/BandiInEvidenceTemplate';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mock_fields = {
  headline: {
    title: 'Intestazione',
  },
  headlineTag: {
    title: 'Headline level',
    choices: [
      ['h2', 'h2'],
      ['h3', 'h3'],
    ],
    default: 'h2',
    noValueOption: false,
  },
  querystring: {
    title: 'Query',
    widget: 'querystring',
  },
  linkTitle: {
    title: 'Link al resto',
  },
  linkHref: {
    title: 'Link a',
    widget: 'object_browser',
    mode: 'link',
    selectedItemAttrs: ['Title', 'Description'],
    allowExternals: true,
  },
  title: {
    title: 'Titolo',
    description: null,
  },
  show_block_bg: {
    title: 'Mostra lo sfondo del blocco',
    description: null,
    type: 'boolean',
  },
  show_description: {
    title: 'Mostra la descrizione',
    description: null,
    type: 'boolean',
    default: true,
  },
  show_ente: {
    title: "Mostra l'ente",
    description: null,
    type: 'boolean',
    default: false,
  },
  show_tipologia: {
    title: 'Mostra la tipologia',
    description: null,
    type: 'boolean',
    default: false,
  },
  variation: {
    title: 'Variazione',
    choices: [
      ['simpleCard', 'Card semplice'],
      ['cardWithImageTemplate', 'Card con immagine'],
      ['inEvidenceTemplate', 'In evidenza'],
      ['contentInEvidenceTemplate', 'Contenuto in evidenza'],
      ['ribbonCardTemplate', 'Card con nastro'],
      ['cardSlideUpTextTemplate', 'Card con testo animato'],
      ['quaresImageTemplate', 'Quadratoni con immagine'],
      ['mapTemplate', 'Mappa'],
      ['smallBlockLinksTemplate', 'Blocco link solo immagini'],
      ['completeBlockLinksTemplate', 'Blocco link completo'],
      ['photogallery', 'Photogallery'],
      ['slider', 'Slider'],
      ['gridGalleryTemplate', 'Gallery a griglia'],
      ['bandiInEvidenceTemplate', 'Bandi'],
      ['simpleListTemplate', 'Lista semplice'],
    ],
    noValueOption: false,
    default: 'simpleCard',
  },
  items: [
    {
      '@id':
        'http://localhost:3000/is-this-the-real-life/business-teamwork-join-hands-together-business-teamwork-concept_1150-1804.webp',
      '@type': 'Image',
      description: '',
      design_italia_meta_type: 'Immagine',
      has_children: false,
      id: 'business-teamwork-join-hands-together-business-teamwork-concept_1150-1804.webp',
      image_field: 'image',
      image_scales: {
        image: [
          {
            'content-type': 'image/webp',
            download:
              '@@images/image-2000-7d300845b28c407363d6e0f57c615056.webp',
            filename:
              'business-teamwork-join-hands-together-business-teamwork-concept_1150-1804.webp',
            height: 1333,
            scales: {
              gallery: {
                download:
                  '@@images/image-250-6cdb492772999c27941f274eecdc92a9.webp',
                height: 166,
                width: 250,
              },
              great: {
                download:
                  '@@images/image-1200-cc034dce5545aab69b8b9683d72bfe16.webp',
                height: 799,
                width: 1200,
              },
              huge: {
                download:
                  '@@images/image-1600-58c6dbe07e86086da50e781f02d0028a.webp',
                height: 1066,
                width: 1600,
              },
              icon: {
                download:
                  '@@images/image-32-b7e94eb4deadc431c49332ea0aee11af.webp',
                height: 21,
                width: 32,
              },
              large: {
                download:
                  '@@images/image-800-8b71d79e3399ac88ed48d49045276dc0.webp',
                height: 533,
                width: 800,
              },
              larger: {
                download:
                  '@@images/image-1000-2a447b7b82343d846aacea605bbf4b0f.webp',
                height: 666,
                width: 1000,
              },
              listing: {
                download:
                  '@@images/image-16-06104e571f80182eb20ae30dd69638e0.webp',
                height: 10,
                width: 16,
              },
              midi: {
                download:
                  '@@images/image-300-3f3e10a6d8f7819caedd759e43066f96.webp',
                height: 199,
                width: 300,
              },
              mini: {
                download:
                  '@@images/image-200-68774779600a6eb307ac9e48635ceb38.webp',
                height: 133,
                width: 200,
              },
              preview: {
                download:
                  '@@images/image-400-b23aeb6a294a600d014c76edbb956f45.webp',
                height: 266,
                width: 400,
              },
              teaser: {
                download:
                  '@@images/image-600-a07683a8a620d198f5d623c11f0aff9f.webp',
                height: 399,
                width: 600,
              },
              thumb: {
                download:
                  '@@images/image-128-16fa3091347b99780ee1ec4a8c77b58e.webp',
                height: 85,
                width: 128,
              },
              tile: {
                download:
                  '@@images/image-64-1eecd43ff5d88b81bc24a410a67f7839.webp',
                height: 42,
                width: 64,
              },
            },
            size: 202972,
            width: 2000,
          },
        ],
      },
      review_state: null,
      title: 'Business',
      url: '/is-this-the-real-life/business-teamwork-join-hands-together-business-teamwork-concept_1150-1804.webp',
    },
  ],
};

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

test('View renders all fields', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <BandiInEvidenceTemplate data={mock_fields} />
      </MemoryRouter>
    </Provider>,
  );

  screen.debug();
});
