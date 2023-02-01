import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from '../../Alert/Sidebar';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mock_fields = {
  allowedBlocks: null,
  block: '92fc866b-26e9-47c8-9905-fdbac3ba8e54',
  data: {
    '@type': 'alert',
    color: 'warning',
    text: '{blocks: Array(1), entityMap: {…}}',
  },
  handleKeyDown: 'ƒ handleKeyDown() {}',
  id: '92fc866b-26e9-47c8-9905-fdbac3ba8e54',
  index: 2,
  manage: false,
  onAddBlock: 'ƒ onAddBlock() {}',
  onInsertBlock: 'ƒ onInsertBlock() {}',
  onChangeBlock: 'ƒ onChangeBlock() {}',
  onChangeField: 'ƒ bound onChangeField() {}',
  onChangeFormData: 'ƒ onChangeFormData() {}',
  onDeleteBlock: 'ƒ onDeleteBlock() {}',
  onFocusNextBlock: 'ƒ onFocusNextBlock() {}',
  onFocusPreviousBlock: 'ƒ onFocusPreviousBlock() {}',
  onMoveBlock: 'ƒ onMoveBlock() {}',
  onMutateBlock: 'ƒ onMutateBlock() {}',
  onSelectBlock: 'ƒ bound onSelectBlock() {}',
  pathname: '/is-this-the-real-life/edit',
  properties: {
    '@components': '{actions: {…}, aliases: {…}, breadcrumbs: {…}, cont…}',
    '@id': 'http://localhost:3000/is-this-the-real-life',
    '@type': 'Document',
    UID: '007550891b9f4ce9b59ce07e78695eb3',
    allow_discussion: false,
    blocks: '{61d82c00-6072-4f53-9e7a-57688ce1b52b: {…}, 92fc866…}',
    blocks_layout: '{items: Array(4)}',
    changeNote: '',
    contributors: '[]',
    correlato_in_evidenza: '[]',
    created: '2023-01-31T13:53:29+00:00',
    creators: '["admin"]',
    description: '',
    design_italia_meta_type: 'Pagina',
    effective: null,
    exclude_from_nav: false,
    expires: null,
    id: 'is-this-the-real-life',
    image: null,
    image_caption: null,
    info_testata: '{content-type: "text/html", data: "<p><br/></p>", e…}',
    is_folderish: true,
    items: '[]',
    items_total: 0,
    language: '{title: "Italiano", token: "it"}',
    layout: 'document_view',
    lock: '{created: "2023-02-01T11:43:02Z", creator: "admin",…}',
    modified: '2023-02-01T11:35:37+00:00',
    mostra_bottoni_condivisione: true,
    mostra_navigazione: true,
    next_item: '{}',
    opengraph_description: null,
    opengraph_image: null,
    opengraph_title: null,
    parent: '{@id: "http://localhost:3000", @type: "Plone Site",…}',
    preview_caption: null,
    preview_image: null,
    previous_item: '{@id: "http://localhost:3000/punti-di-contatto", @t…}',
    relatedItems: '[]',
    review_state: 'private',
    ricerca_in_testata: true,
    rights: '',
    seo_canonical_url: null,
    seo_description: null,
    seo_noindex: null,
    seo_title: null,
    show_modified: true,
    subjects: '[]',
    table_of_contents: null,
    tassonomia_argomenti: '[]',
    title: 'Is this the real life',
    version: 'current',
    versioning_enabled: true,
    working_copy: null,
    working_copy_of: null,
  },
  blocksConfig: {
    title: '{blockHasOwnFocusManagement: true, edit: ƒ TitleBlo…}',
    description: '{blockHasOwnFocusManagement: true, edit: ƒ TitleBlo…}',
    text: '{blockHasOwnFocusManagement: true, blockHasValue: ƒ…}',
    image: '{edit: ƒ WithIntl() {}, group: "media", icon: {…}, …}',
    listing: '{blockSchema: ƒ schemaListing() {}, edit: ƒ () {}, …}',
    video: '{edit: ƒ WithIntl() {}, group: "media", icon: {…}, …}',
    toc: '{edit: ƒ Edit() {}, group: "common", icon: {…}, id:…}',
    hero: '{blockHasOwnFocusManagement: true, blockSchema: ƒ s…}',
    maps: '{edit: ƒ WithIntl() {}, group: "common", icon: {…},…}',
    html: '{edit: ƒ WithLoadables() {}, group: "common", icon:…}',
    table: '{blockHasOwnFocusManagement: true, edit: ƒ WithLoad…}',
    slate: '{blockHasOwnFocusManagement: true, blockHasValue: ƒ…}',
    detachedSlate: '{blockHasOwnFocusManagement: true, blockHasValue: ƒ…}',
    slateTable: '{blockHasOwnFocusManagement: true, edit: ƒ WithIntl…}',
    rssBlock: '{edit: ƒ Edit() {}, group: "common", icon: {…}, id:…}',
    form: '{additionalFields: Array(0), edit: {…}, fieldSchema…}',
    highlitedContent: '{edit: ƒ Edit() {}, group: "homePage", icon: {…}, i…}',
    searchSections: '{edit: ƒ Edit() {}, group: "search", icon: {…}, id:…}',
    calendar: '{edit: ƒ Edit() {}, group: "homePage", icon: {…}, i…}',
    searchEvents: '{edit: ƒ Edit() {}, group: "search", icon: {…}, id:…}',
    searchBandi: '{edit: ƒ Edit() {}, group: "search", icon: {…}, id:…}',
    searchUO: '{edit: ƒ Edit() {}, group: "search", icon: {…}, id:…}',
    argumentsInEvidence:
      '{edit: {…}, group: "homePage", icon: {…}, id: "argu…}',
    break: '{edit: ƒ Edit() {}, group: "text", icon: {…}, id: "…}',
    alert: '{blockHasOwnFocusManagement: true, edit: ƒ WithIntl…}',
    testo_riquadro_semplice:
      '{blockHasOwnFocusManagement: true, edit: ƒ WithIntl…}',
    testo_riquadro_immagine:
      '{blockHasOwnFocusManagement: true, edit: ƒ WithIntl…}',
    accordion: '{blockHasOwnFocusManagement: true, edit: {…}, group…}',
    numbersBlock: '{edit: {…}, group: "text", icon: {…}, id: "numbersB…}',
    iconBlocks: '{edit: {…}, group: "text", icon: {…}, id: "iconBloc…}',
    contacts: '{edit: {…}, group: "text", icon: {…}, id: "contacts…}',
    video_gallery: '{edit: {…}, group: "media", icon: {…}, id: "video_g…}',
    twitter_posts: '{edit: ƒ Edit() {}, group: "media", icon: {…}, id: …}',
    cta_block: '{blockHasOwnFocusManagement: true, edit: ƒ Edit() {…}',
    count_down: '{edit: ƒ Edit() {}, group: "common", icon: {…}, id:…}',
  },
  selected: false,
  multiSelected: false,
  type: 'alert',
  editable: true,
  showBlockChooser: false,
  intl: {
    formats: '{}',
    messages: '{<p>Add some HTML here</p>: "<p>Aggiungi dell\'HTML …}',
    textComponent: 'Symbol(react.fragment)',
    defaultLocale: 'en',
    defaultFormats: '{}',
    onError: 'ƒ reactIntlErrorHandler() {}',
    locale: 'it',
    formatters: '{getDateTimeFormat: ƒ () {}, getListFormat: ƒ () {}…}',
    formatNumber: 'ƒ bound formatNumber() {}',
    formatNumberToParts: 'ƒ bound formatNumberToParts() {}',
    formatRelativeTime: 'ƒ bound formatRelativeTime() {}',
    formatDate: 'ƒ bound formatDate() {}',
    formatDateToParts: 'ƒ bound formatDateToParts() {}',
    formatTime: 'ƒ bound formatTime() {}',
    formatTimeToParts: 'ƒ bound formatTimeToParts() {}',
    formatPlural: 'ƒ bound formatPlural() {}',
    formatMessage: 'ƒ bound formatMessage() {}',
    formatHTMLMessage: 'ƒ bound formatHTMLMessage() {}',
    formatList: 'ƒ bound formatList() {}',
  },
  isObjectBrowserOpen: false,
  openObjectBrowser: 'ƒ () {}',
  closeObjectBrowser: 'ƒ () {}',
  setSidebarTab: 'ƒ () {}',
  blockNode: {
    current: '<div />',
  },
};

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

test('prova', async () => {
  const { getByText, getByRole, debug } = render(
    <Provider store={store}>
      <Sidebar data={mock_fields} />
    </Provider>,
  );

  // screen.debug();
  const buttons = document.getElementsByClassName('button');

  expect(buttons[0]).toHaveClass('yellow');

  // expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument();
  // expect(screen.getAllByRole('button')).toHaveClass('Orange');
  // expect(screen.getByText(/Ciao/i)).toBeInTheDocument();
});
