/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Search/SearchBlockView.jsx
 *
 * CUSTOMIZATIONS:
 * - Agid styling: root wrapper className changed to `block search` +
 *   `public-ui` (in edit mode) instead of including `selectedView`/`className`;
 *   `id`/`className` props are no longer read/forwarded
 * - Add class .block.listing in listing body container div to use
 *   existing listing template styles
 * - Inspired from
 *   https://github.com/plone/volto/commit/211d9bea13119cc430db9d53a4740a860781ca2e
 *   the way to handle search sort. If searchableText is setted, discard default sorting and uses plone's ranking only if is configured from sidebar. (Changed applyDefaults fn passing usePloneRanking, instead of upstream's unconditional skip-default-sort-on-text-search behavior)
 * - Ported upstream's `blockQuery` support in applyDefaults() (a base query
 *   from `data.query?.query`, merged with the facet-driven query, facets
 *   winning on key collision) alongside the usePloneRanking override above
 * - Fallback the Layout to the 'facetsRightSide' search variation when
 *   variation.view is not set, and render nothing if no Layout is found
 * - Scroll the results into view (smooth) when the query changes because of
 *   user-applied filters, but not on the first load (added defaultListingBodyData
 *   state and resultsRef)
 * - Changed the HOCs composition order on export:
 *   compose(withQueryString, withSearch()) instead of
 *   withSearch()(withQueryString(...))
 */

import React, { useState } from 'react';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

import {
  withQueryString,
  withSearch,
} from '@plone/volto/components/manage/Blocks/Search/hocs';
import config from '@plone/volto/registry';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { useEffect } from 'react';

const getListingBodyVariation = (data) => {
  const { variations } = config.blocks.blocksConfig.listing;

  let variation = data.listingBodyTemplate
    ? variations.find(({ id }) => id === data.listingBodyTemplate)
    : variations.find(({ isDefault }) => isDefault);

  if (!variation) variation = variations[0];

  return variation;
};

const isfunc = (obj) => isFunction(obj) || typeof obj === 'function';

const _filtered = (obj) =>
  Object.assign(
    {},
    ...Object.keys(obj).map((k) => {
      const reject = k !== 'properties' && !isfunc(obj[k]);
      return reject ? { [k]: obj[k] } : {};
    }),
  );

const blockPropsAreChanged = (prevProps, nextProps) => {
  const prev = _filtered(prevProps);
  const next = _filtered(nextProps);

  return isEqual(prev, next);
};

const applyDefaults = (data, root, usePloneRanking) => {
  const defaultQuery = [
    {
      i: 'path',
      o: 'plone.app.querystring.operation.string.absolutePath',
      v: root || '/',
    },
  ];

  const searchBySearchableText = data.query.filter(
    (item) => item['i'] === 'SearchableText',
  ).length;

  let sort_on = { sort_on: data?.sort_on ?? 'effective' };
  let sort_order = { sort_order: data?.sort_order ?? 'descending' };

  if (usePloneRanking && searchBySearchableText > 0) {
    sort_on = undefined;
    sort_order = undefined;
  }

  const result = {
    ...data,
    query: data?.query?.length ? data.query : defaultQuery,
  };
  if (!sort_on) {
    delete result.sort_on;
  }
  if (!sort_order) {
    delete result.sort_order;
  }
  return result;
};

const SearchBlockView = (props) => {
  const { data, searchData, mode = 'view', variation } = props;

  const Layout =
    variation?.view ||
    config.blocks.blocksConfig.search.variations.find(
      (f) => f.id === 'facetsRightSide',
    );

  const dataListingBodyVariation = getListingBodyVariation(data).id;
  const [selectedView, setSelectedView] = React.useState(
    dataListingBodyVariation,
  );

  // in the block edit you can change the used listing block variation,
  // but it's cached here in the state. So we reset it.
  React.useEffect(() => {
    if (mode !== 'view') {
      setSelectedView(dataListingBodyVariation);
    }
  }, [dataListingBodyVariation, mode]);

  const root = useSelector((state) => state.breadcrumbs.root);
  const [defaultListingBodyData] = React.useState(
    applyDefaults(searchData, root, data.usePloneRanking),
  );
  const listingBodyData = applyDefaults(searchData, root, data.usePloneRanking);

  const { variations } = config.blocks.blocksConfig.listing;
  const listingBodyVariation = variations.find(({ id }) => id === selectedView);

  const query = listingBodyData.query;
  const resultsRef = React.forwardRef(null);

  useEffect(() => {
    if (
      JSON.stringify(defaultListingBodyData.query) !== JSON.stringify(query)
    ) {
      //fai lo scroll solo quando vengono modificati i filtri dall'utente. Evita lo scroll al primo load
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [query]);

  if (!Layout) return null;
  return (
    <div className={cx('block search', { 'public-ui': mode === 'edit' })}>
      <Layout
        {...props}
        isEditMode={mode === 'edit'}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        resultsRef={resultsRef}
      >
        {/* Add class .block.listing to benefit from existing listing template styles */}
        <div className="block listing search-results">
          <ListingBody
            variation={{ ...data, ...listingBodyVariation }}
            data={listingBodyData}
            path={props.path}
            isEditMode={mode === 'edit'}
          />
        </div>
      </Layout>
    </div>
  );
};

export const SearchBlockViewComponent = compose(
  withBlockExtensions,
  (Component) => React.memo(Component, blockPropsAreChanged),
)(SearchBlockView);

export default compose(withQueryString, withSearch())(SearchBlockViewComponent);
