import React, { useMemo } from 'react';
import { Button, Icon } from 'design-react-kit';
import { defineMessages, useIntl } from 'react-intl';
import { isEmpty } from 'lodash';
import { resolveExtension } from '@plone/volto/helpers';
import useDeepCompareEffect from 'use-deep-compare-effect';
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
  const { data = {}, facets = {}, setFacets, isEditMode } = props;
  const definedFacets = data.facets || [];
  const [isOpened, setIsOpened] = React.useState(false);
  console.log('active defined facets', definedFacets);
  console.log('current facets', facets);
  const totalFilters = useMemo(
    () =>
      definedFacets.filter(
        ({ field }) =>
          field &&
          Object.keys(facets).includes(field.value) &&
          !isEmpty(facets[field.value]),
      ).length,
    [definedFacets, facets],
  );
  useDeepCompareEffect(() => setIsOpened(false), [facets, data]);

  const { types: facetWidgetTypes } =
    config.blocks.blocksConfig.search.extensions.facetWidgets;

  const intl = useIntl();

  return totalFilters > 0 ? (
    <div className="accordion-wrapper filter-listing bg-transparent">
      <button
        onClick={() => {
          setIsOpened(!isOpened);
        }}
        aria-expanded={isOpened}
        aria-controls="collapsedContent"
        aria-labelledby={`filters`}
        className="filter-list-header accordion-header bg-transparent"
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
        className={'accordion-content filter-list-content'}
        role="region"
        aria-labelledby="headingAccordion"
        aria-expanded={isOpened}
        aria-hidden={!isOpened}
      >
        <div className="filter-list bg-light accordion-inner">
          {data.facets?.map((facetSettings, i) => {
            const { filterListComponent: FilterListComponent } =
              resolveExtension('type', facetWidgetTypes, facetSettings);
            const facet = facetSettings?.field?.value;
            if (!facet) return null;

            return (
              <div key={i}>
                {Object.keys(facets).includes(facet) && !!facets[facet] && (
                  <div className="filter-list-group" key={i}>
                    <span className="label-title">
                      {facetSettings.title ?? facetSettings?.field?.label}
                    </span>
                    <FilterListComponent {...props} facet={facet} />
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
          >
            <Icon icon="it-delete" />
            {intl.formatMessage(messages.clearFilters)}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default FilterList;
