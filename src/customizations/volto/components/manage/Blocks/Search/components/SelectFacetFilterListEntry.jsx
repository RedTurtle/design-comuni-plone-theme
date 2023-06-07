import React, { useMemo } from 'react';
import { Label, Icon, Button } from 'design-react-kit';
import { selectFacetStateToValue } from '@plone/volto/components/manage/Blocks/Search/components/base';
import { commonMessages } from '../utils';

function SelectFacetFilterListEntry(props) {
  const {
    facet,
    isEditMode,
    setFacets,
    facets,
    querystring,
    data,
    intl,
  } = props;
  const selectedValue = useMemo(
    () =>
      selectFacetStateToValue({
        facetSettings: data?.facets?.find((t) => t?.field?.value === facet),
        index: querystring?.indexes?.[facet] ?? {},
        selectedValue: facets[facet],
      }),
    [data, querystring, facet, facets],
  );
  return typeof facets[facet] === 'string' ? (
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
        aria-label={intl.formatMessage(commonMessages.clearFilter, {
          filterName: selectedValue?.label ?? '',
        })}
        title={intl.formatMessage(commonMessages.clearFilter, {
          filterName: selectedValue?.label ?? '',
        })}
      >
        <Icon
          icon="it-close"
          size="md"
          aria-label={intl.formatMessage(commonMessages.clearFilter, {
            filterName: selectedValue?.label ?? '',
          })}
          title={intl.formatMessage(commonMessages.clearFilter, {
            filterName: selectedValue?.label ?? '',
          })}
        />
      </Button>
    </Label>
  ) : (
    <>
      {facets[facet].map((entry, i) => {
        const label = Array.isArray(selectedValue)
          ? selectedValue?.find((sv) => sv.value === entry)?.label ?? ''
          : '';
        return (
          <Label key={i} className="d-flex w-100 py-1">
            <span>{label}</span>
            <Button
              className="p-0"
              onClick={() => {
                const entries = facets[facet].filter((item) => item !== entry);
                !isEditMode &&
                  setFacets({
                    ...facets,
                    [facet]: entries,
                  });
              }}
              aria-label={intl.formatMessage(commonMessages.clearFilter, {
                filterName: label,
              })}
              title={intl.formatMessage(commonMessages.clearFilter, {
                filterName: label,
              })}
            >
              <Icon
                icon="it-close"
                size="md"
                aria-label={intl.formatMessage(commonMessages.clearFilter, {
                  filterName: label,
                })}
                title={intl.formatMessage(commonMessages.clearFilter, {
                  filterName: label,
                })}
              />
            </Button>
          </Label>
        );
      })}
    </>
  );
}

export default SelectFacetFilterListEntry;
