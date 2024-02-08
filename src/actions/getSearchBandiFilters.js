export const GET_SEARCH_BANDI_FILTERS = 'GET_SEARCH_BANDI_FILTERS';
import { expandToBackendURL } from '@plone/volto/helpers';

/**
 * Get search bandi filters.
 * @function getSearchBandiFilters
 * @returns {Object} Get search bandi filters action:
 * {
 *  offices: [],
 *  subjects: [],
 *  tipologie: [],
 * }
*/

export function getSearchBandiFilters(path = '') {
  // let p = path === '/' ? '' : path;
  const pathSearchFilters = `${path === '/' ? '' : expandToBackendURL(path)}/@bandi-search-filters`;
  return {
    type: GET_SEARCH_BANDI_FILTERS,
    request: {
      op: 'get',
      path: pathSearchFilters,
    },
  };
}
