import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';
import { cloneDeep } from 'lodash';
import {
  hasNonValueOperation,
  hasDateOperation,
} from '@plone/volto/components/manage/Blocks/Search/utils';

// TODO: sposta nella config se riesci
const messages = defineMessages({
  searchBlock: {
    id: 'Search block',
    defaultMessage: 'Search block',
  },
  controls: {
    id: 'Controls',
    defaultMessage: 'Controls',
  },
  baseSearchQuery: {
    id: 'Base search query',
    defaultMessage: 'Base search query',
  },
  sectionTitle: {
    id: 'Section title',
    defaultMessage: 'Section title',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  searchInputPrompt: {
    id: 'Search input label',
    defaultMessage: 'Search input label',
  },
  showSearchInput: {
    id: 'Show search input?',
    defaultMessage: 'Show search input?',
  },
  showSearchButtonTitle: {
    id: 'Show search button?',
    defaultMessage: 'Show search button?',
  },
  showSearchButtonDescription: {
    id: 'The button presence disables the live search, the query is issued when you press ENTER',
    defaultMessage:
      'The button presence disables the live search, the query is issued when you press ENTER',
  },
  searchButtonLabel: {
    id: 'Search button label',
    defaultMessage: 'Search button label',
  },
  searchButtonPlaceholder: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  facets: {
    id: 'Facets',
    defaultMessage: 'Facets',
  },
  textColumn: {
    id: 'textColumn',
    defaultMessage: 'Block side column text',
  },
  facet: {
    id: 'Facet',
    defaultMessage: 'Facet',
  },
  label: {
    id: 'Label',
    defaultMessage: 'Label',
  },
  field: {
    id: 'Field',
    defaultMessage: 'Field',
  },
  multipleChoices: {
    id: 'Multiple choices?',
    defaultMessage: 'Multiple choices?',
  },
  hideFacetTitle: {
    id: 'Hide facet?',
    defaultMessage: 'Hide facet?',
  },
  hideFacetDescription: {
    id: 'Hidden facets will still filter the results if proper parameters are passed in URLs',
    defaultMessage:
      'Hidden facets will still filter the results if proper parameters are passed in URLs',
  },
  facetWidget: {
    id: 'Facet widget',
    defaultMessage: 'Facet widget',
  },
  listingTemplateOptions: {
    id: 'listingTemplateOptions',
    defaultMessage: 'Opzioni template',
  },
  availableViews: {
    id: 'availableViews',
    defaultMessage: 'Available views',
  },
  showTotalResults: {
    id: 'Show total results',
    defaultMessage: 'Show total results',
  },
  show_block_bg: {
    id: 'Mostra lo sfondo del blocco',
    defaultMessage: 'Mostra lo sfondo del blocco',
  },
  columnText: {
    id: 'columnText',
    defaultMessage: 'Testo della colonna',
  },
  LinkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
});

const enhanceSchema = (originalSchema, formData) => {
  const extensionName = 'facetWidgets';
  const extensionType = 'type'; // property name in stored block data
  // TODO: decidere se li vogliamo tutti questi facet, alcuni non hanno
  // i corrispettivi di componenti per design-react-kit e son da fare a mano
  const variations =
    config.blocks.blocksConfig.search.extensions[extensionName].types;

  const activeItemName = formData?.[extensionType];
  let activeItem = variations?.find((item) => item.id === activeItemName);
  if (!activeItem) activeItem = variations?.find((item) => item.isDefault);

  const schemaEnhancer = activeItem?.['schemaEnhancer'];

  let schema = schemaEnhancer
    ? schemaEnhancer({ schema: cloneDeep(originalSchema), formData })
    : cloneDeep(originalSchema);

  return schema;
};

const FacetSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.facet),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'field', 'type', 'hidden'],
    },
  ],
  properties: {
    title: {
      title: intl.formatMessage(messages.label),
    },
    field: {
      title: intl.formatMessage(messages.field),
      widget: 'select_querystring_field',
      vocabulary: { '@id': 'plone.app.vocabularies.MetadataFields' },
      filterOptions: (options) => {
        // Only allows indexes that provide simple, fixed vocabularies.
        // This should be improved, together with the facets. The querystring
        // widget implementation should serve as inspiration for those dynamic
        // types of facets.
        return Object.assign(
          {},
          ...Object.keys(options).map((k) =>
            Object.keys(options[k].values || {}).length ||
            hasNonValueOperation(options[k].operations) ||
            hasDateOperation(options[k].operations)
              ? { [k]: options[k] }
              : {},
          ),
        );
      },
    },
    multiple: {
      type: 'boolean',
      title: intl.formatMessage(messages.multipleChoices),
      default: false,
    },
    hidden: {
      type: 'boolean',
      title: intl.formatMessage(messages.hideFacetTitle),
      default: false,
      description: intl.formatMessage(messages.hideFacetDescription),
    },
    type: {
      title: intl.formatMessage(messages.facetWidget),
      choices:
        config.blocks.blocksConfig.search.extensions.facetWidgets.types.map(
          ({ id, title }) => [
            id,
            `${intl.formatMessage({ id: id, defaultMessage: title })}`,
          ],
        ),
      defaultValue:
        config.blocks.blocksConfig.search.extensions.facetWidgets.types.find(
          ({ isDefault }) => isDefault,
        ).id,
    },
  },
  required: ['field'],
});

const SearchSchema = ({ data = {}, intl }) => {
  return {
    title: intl.formatMessage(messages.searchBlock),
    id: 'search',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['headline', 'show_block_bg'],
      },
      {
        id: 'searchquery',
        title: intl.formatMessage(messages.baseSearchQuery),
        fields: ['query'],
      },
      {
        id: 'listingTemplateOptions',
        title: intl.formatMessage(messages.listingTemplateOptions),
        fields: [],
      },
      {
        id: 'columnText',
        title: intl.formatMessage(messages.textColumn),
        fields: ['columnText', 'linkTitle', 'linkHref'],
      },
      {
        id: 'facets',
        title: intl.formatMessage(messages.facets),
        fields: ['facetsTitle', 'facets'],
      },
      {
        id: 'controls',
        title: intl.formatMessage(messages.controls),
        fields: [
          'showSearchInput',
          ...(data.showSearchInput ?? true ? ['showSearchButton'] : []),
          // ...(data.showSearchInput ? ['searchInputPrompt'] : []),
          // ...(data.showSearchButton ? ['searchButtonLabel'] : []),
          'showTotalResults',
        ],
      },
    ],
    properties: {
      headline: {
        title: intl.formatMessage(messages.headline),
      },
      show_block_bg: {
        title: intl.formatMessage(messages.show_block_bg),
        type: 'boolean',
        default: false,
      },
      searchInputPrompt: {
        title: intl.formatMessage(messages.searchInputPrompt),
      },
      showSearchInput: {
        type: 'boolean',
        title: intl.formatMessage(messages.showSearchInput),
        default: true,
      },
      showSearchButton: {
        type: 'boolean',
        title: intl.formatMessage(messages.showSearchButtonTitle),
        description: intl.formatMessage(messages.showSearchButtonDescription),
      },
      showTotalResults: {
        type: 'boolean',
        title: intl.formatMessage(messages.showTotalResults),
        default: true,
      },
      searchButtonLabel: {
        title: intl.formatMessage(messages.searchButtonLabel),
        placeholder: intl.formatMessage(messages.searchButtonPlaceholder),
      },
      facets: {
        title: intl.formatMessage(messages.facets),
        widget: 'object_list',
        schema: FacetSchema({ intl }),
        schemaExtender: enhanceSchema,
      },
      facetsTitle: {
        title: intl.formatMessage(messages.sectionTitle),
      },
      columnText: {
        title: 'ciao',
        type: 'string',
        widget: 'richtext',
      },
      linkTitle: {
        title: intl.formatMessage(messages.LinkTitle),
      },
      linkHref: {
        title: intl.formatMessage(messages.LinkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
      query: {
        title: 'Query',
      },
    },
    required: [],
  };
};

export default SearchSchema;
