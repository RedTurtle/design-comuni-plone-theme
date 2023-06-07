import React, { useMemo } from 'react';
import { Button, Icon } from 'design-react-kit';
import { defineMessages, useIntl } from 'react-intl';
import { isEmpty } from 'lodash';
import { resolveExtension } from '@plone/volto/helpers';
import useDeepCompareEffect from 'use-deep-compare-effect';
import cx from 'classnames';
import { commonMessages } from '../utils';
import { useDetectClickOutside } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const messages = defineMessages({
  currentFilters: {
    id: 'Current filters applied',
    defaultMessage: 'Current filters applied',
  },
  clearFilters: {
    id: 'Clear filters',
    defaultMessage: 'Clear filters',
  },
});

/**
 * A list of active filtered values and controls to clear those filters.
 *
 */
const FilterList = (props) => {
  const {
    data = {},
    facets = {},
    setFacets,
    isEditMode,
    onTriggerSearch,
    searchData,
  } = props;
  const definedFacets = data.facets || [];
  const [isOpened, setIsOpened] = React.useState(false);
  const totalFilters = useMemo(
    () =>
      definedFacets.filter(
        ({ field, type }) =>
          field &&
          Object.keys(facets).includes(field.value) &&
          (type !== 'toggleFacet'
            ? !isEmpty(facets[field.value])
            : facets[field.value]),
      ).length,
    [definedFacets, facets],
  );
  const resetAccordionState = () => setIsOpened(false);
  useDeepCompareEffect(
    () => resetAccordionState(),
    [facets, data, onTriggerSearch, searchData],
  );
  const ref = useDetectClickOutside({
    onTriggered: resetAccordionState,
    triggerKeys: ['Escape'],
    // Disabled feature for now https://github.com/plone/volto/pull/2389#issuecomment-830027413
    disableClick: false,
    disableKeys: false,
  });

  const { types: facetWidgetTypes } =
    config.blocks.blocksConfig.search.extensions.facetWidgets;

  const intl = useIntl();

  return totalFilters > 0 ? (
    <div className={'accordion-wrapper filter-listing'} ref={ref}>
      <button
        onClick={() => {
          setIsOpened(!isOpened);
        }}
        aria-expanded={isOpened}
        aria-controls="collapsedContent"
        aria-labelledby={intl.formatMessage(messages.currentFilters)}
        className={cx('filter-list-header accordion-header', {
          'bg-white': isOpened,
          'bg-transparent': !isOpened,
        })}
        id="headingAccordion"
      >
        <div className="filter-list-title">
          <div className="accordion-control">
            <Icon color="primary" icon={'it-funnel'} size="sm" />
            <Icon
              color="primary"
              icon={isOpened ? 'it-collapse' : 'it-expand'}
              className="indicator"
              size="md"
            />
          </div>
          {intl.formatMessage(messages.currentFilters)}: {totalFilters}
        </div>
      </button>
      <div
        id="collapsedContent"
        className={cx('accordion-content filter-list-content', {
          'bg-white': isOpened,
          'bg-transparent': !isOpened,
        })}
        role="region"
        aria-labelledby="headingAccordion"
        aria-expanded={isOpened}
        aria-hidden={!isOpened}
      >
        <div className="filter-list accordion-inner bg-white py-4">
          {data.facets?.map((facetSettings, i) => {
            const { filterListComponent: FilterListComponent } =
              resolveExtension('type', facetWidgetTypes, facetSettings);
            const facet = facetSettings?.field?.value;
            if (!facet) return null;

            return (
              <div key={i}>
                {Object.keys(facets).includes(facet) && !!facets[facet] && (
                  <div className="filter-list-group px-2" key={i}>
                    <span className="label-title mb-2">
                      {facetSettings.title ?? facetSettings?.field?.label}
                    </span>
                    <FilterListComponent {...props} facet={facet} intl={intl} />
                  </div>
                )}
              </div>
            );
          })}
          <Button
            icon
            color="danger"
            size="md"
            outline
            className="clear-filters"
            onClick={(e) => {
              e.stopPropagation();
              !isEditMode && setFacets({});
            }}
            aria-label={intl.formatMessage(commonMessages.clearAllFilters)}
            title={intl.formatMessage(commonMessages.clearAllFilters)}
          >
            <Icon
              icon="it-delete"
              title={intl.formatMessage(commonMessages.clearAllFilters)}
              aria-label={intl.formatMessage(commonMessages.clearAllFilters)}
            />
            {intl.formatMessage(messages.clearFilters)}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default FilterList;
