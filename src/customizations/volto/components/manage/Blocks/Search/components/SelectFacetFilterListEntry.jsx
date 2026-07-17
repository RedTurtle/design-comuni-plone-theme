/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Search/components/SelectFacetFilterListEntry.jsx
 *
 * CUSTOMIZATIONS:
 * - Agid styling (design-react-kit Label/Icon/Button instead of semantic-ui-react)
 * - Show the facet title (facetSettings.title / facetSettings?.field?.label) above the selected value(s), only when there is something selected
 * - Resolve the selected value label via selectFacetStateToValue (using querystring indexes and facetSettings) instead of rendering the raw facet value
 * - Add accessible aria-label/title on the remove buttons/icons via intl and commonSearchBlockMessages.clearFilter
 */
import React, { useMemo } from 'react';
import { Label, Icon, Button } from 'design-react-kit';
import { selectFacetStateToValue } from '@plone/volto/components/manage/Blocks/Search/components/base';
import { commonSearchBlockMessages } from 'design-comuni-plone-theme/helpers';

function SelectFacetFilterListEntry(props) {
  const {
    facet,
    isEditMode,
    setFacets,
    facets,
    querystring,
    facetSettings,
    data,
    intl,
  } = props;

  const selectedValue = useMemo(
    () =>
      selectFacetStateToValue({
        facetSettings,
        index: querystring?.indexes?.[facet] ?? {},
        selectedValue: facets[facet],
      }),
    [querystring, facet, facets, facetSettings],
  );
  return typeof facets[facet] === 'string' ? (
    <>
      <span className="label-title mb-2">
        {facetSettings.title ?? facetSettings?.field?.label}
      </span>

      <Label className="d-flex w-100 py-1">
        <span>{selectedValue?.label || ''}</span>
        <Button
          className="p-0"
          onClick={() => {
            !isEditMode &&
              setFacets({
                ...facets,
                [facet]: '',
              });
          }}
          aria-label={intl.formatMessage(
            commonSearchBlockMessages.clearFilter,
            {
              filterName: selectedValue?.label ?? '',
            },
          )}
          title={intl.formatMessage(commonSearchBlockMessages.clearFilter, {
            filterName: selectedValue?.label ?? '',
          })}
        >
          <Icon
            icon="it-close"
            size="md"
            aria-label={intl.formatMessage(
              commonSearchBlockMessages.clearFilter,
              {
                filterName: selectedValue?.label ?? '',
              },
            )}
            title={intl.formatMessage(commonSearchBlockMessages.clearFilter, {
              filterName: selectedValue?.label ?? '',
            })}
          />
        </Button>
      </Label>
    </>
  ) : (
    <>
      {((Array.isArray(facets?.[facet]) && facets?.[facet]?.length > 0) ||
        (!Array.isArray(facets?.[facet]) && Boolean(facets?.[facet]))) && (
        <span className="label-title mb-2">
          {facetSettings.title ?? facetSettings?.field?.label}
        </span>
      )}
      {Array.isArray(facets?.[facet]) &&
        facets?.[facet]?.map((entry, i) => {
          const label = Array.isArray(selectedValue)
            ? selectedValue?.find((sv) => sv.value === entry)?.label ?? ''
            : '';
          return (
            <Label key={i} className="d-flex w-100 py-1">
              <span>{label}</span>
              <Button
                className="p-0"
                onClick={() => {
                  const entries = facets?.[facet]?.filter(
                    (item) => item !== entry,
                  );
                  !isEditMode &&
                    setFacets({
                      ...facets,
                      [facet]: entries,
                    });
                }}
                aria-label={intl.formatMessage(
                  commonSearchBlockMessages.clearFilter,
                  {
                    filterName: label,
                  },
                )}
                title={intl.formatMessage(
                  commonSearchBlockMessages.clearFilter,
                  {
                    filterName: label,
                  },
                )}
              >
                <Icon
                  icon="it-close"
                  size="md"
                  aria-label={intl.formatMessage(
                    commonSearchBlockMessages.clearFilter,
                    {
                      filterName: label,
                    },
                  )}
                  title={intl.formatMessage(
                    commonSearchBlockMessages.clearFilter,
                    {
                      filterName: label,
                    },
                  )}
                />
              </Button>
            </Label>
          );
        })}
    </>
  );
}

export default SelectFacetFilterListEntry;
