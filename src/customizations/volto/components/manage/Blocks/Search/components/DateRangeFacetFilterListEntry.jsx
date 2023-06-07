import React, { useMemo } from 'react';
import { Label, Icon, Button } from 'design-react-kit';
import { defineMessages } from 'react-intl';
import { commonMessages } from '../utils';

const messages = defineMessages({
  DateRangeFacetFilterListEntryDal: {
    id: 'DateRangeFacetFilterListEntryDal',
    defaultMessage: 'Dal {start}',
  },
  DateRangeFacetFilterListEntryAl: {
    id: 'DateRangeFacetFilterListEntryAl',
    defaultMessage: 'Al {end}',
  },
  DateRangeFacetFilterListEntryDalAl: {
    id: 'DateRangeFacetFilterListEntryDalAl',
    defaultMessage: 'Dal {start} al {end}',
  },
});

function DateRangeFacetFilterListEntry(props) {
  const { facet, isEditMode, setFacets, facets, data, intl, searchData } =
    props;
  const entrySettings = useMemo(() => {
    return data.facets?.find((f) => f?.field?.value === facet)?.field;
  }, [data, facet]);
  const dateRangeLabel = useMemo(() => {
    const queryIndex = searchData?.query?.find((q) => q.i === facet);
    let start, end;
    if (queryIndex) {
      if (queryIndex.o.includes('date.largerThan'))
        [start, end] = [queryIndex.v, null];
      else if (queryIndex.o.includes('date.lessThan'))
        [start, end] = [null, queryIndex.v];
      else if (queryIndex.o.includes('date.between'))
        [start, end] = queryIndex.v;
    }

    let label;
    if (start) {
      if (end)
        label = `${intl.formatMessage(
          messages.DateRangeFacetFilterListEntryDalAl,
          {
            start: start,
            end: end,
          },
        )}`;
      else
        label = `${intl.formatMessage(
          messages.DateRangeFacetFilterListEntryDal,
          {
            start: start,
          },
        )}`;
    } else {
      if (end)
        label = `${intl.formatMessage(
          messages.DateRangeFacetFilterListEntryAl,
          {
            end: end,
          },
        )}`;
    }
    return label;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facet, searchData]);
  return (
    <Label className="d-flex w-100 py-1">
      <span>{dateRangeLabel}</span>
      <Button
        className="p-0"
        onClick={() => {
          const filteredFacets = Object.assign(
            {},
            ...Object.keys(facets)
              .filter((f) => f !== facet)
              .map((f) => ({ [f]: facets[f] })),
          );
          !isEditMode && setFacets(filteredFacets);
        }}
        aria-label={intl.formatMessage(commonMessages.clearFilter, {
          filterName: entrySettings?.label ?? '',
        })}
        title={intl.formatMessage(commonMessages.clearFilter, {
          filterName: entrySettings?.label ?? '',
        })}
      >
        <Icon
          icon="it-delete"
          size="sm"
          aria-label={intl.formatMessage(commonMessages.clearFilter, {
            filterName: entrySettings?.label ?? '',
          })}
          title={intl.formatMessage(commonMessages.clearFilter, {
            filterName: entrySettings?.label ?? '',
          })}
        />
      </Button>
    </Label>
  );
}

export default DateRangeFacetFilterListEntry;
