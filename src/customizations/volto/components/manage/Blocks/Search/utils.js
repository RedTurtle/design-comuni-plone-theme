import { defineMessages } from 'react-intl';

export const NONVALUE_OPERATIONS = new Set([
  'plone.app.querystring.operation.boolean.isFalse',
  'plone.app.querystring.operation.boolean.isTrue',
]);

export const DATE_OPERATIONS = new Set([
  'plone.app.querystring.operation.date.between',
]);

export const hasNonValueOperation = (ops) => {
  return ops.filter((x) => NONVALUE_OPERATIONS.has(x)).length > 0;
};

export const hasDateOperation = (ops) => {
  return ops.filter((x) => DATE_OPERATIONS.has(x)).length > 0;
};

export const getBackgroundClass = (show_block_bg, bg_color) => {
  if (!show_block_bg) return '';

  let background_color = bg_color ? `bg-${bg_color}` : '';

  return `bg-light py-5 ${background_color}`;
};

export const commonMessages = defineMessages({
  clearFilter: {
    id: 'clearFilter',
    defaultMessage: 'Clear {filterName} filter',
  },
  clearAllFilters: {
    id: 'clearAllFilters',
    defaultMessage: 'Clear all filters',
  },
});
