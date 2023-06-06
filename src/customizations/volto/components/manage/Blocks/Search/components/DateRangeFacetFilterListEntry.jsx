import React, { useMemo } from 'react';
import { Label, Icon, Button } from 'design-react-kit';
import { defineMessages, useIntl } from 'react-intl';

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
  const { facet, isEditMode, setFacets, facets } = props;
  const intl = useIntl();
  console.log('daterangeentry', props);
  console.log(facet);
  const dateRangeLabel = useMemo(() => {
    const [start, end] = facets?.[facet];
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
  }, [facet, facets]);
  return (
    <Label size="small">
      {dateRangeLabel}
      <Button
        onClick={() => {
          const filteredFacets = Object.assign(
            {},
            ...Object.keys(facets)
              .filter((f) => f !== facet)
              .map((f) => ({ [f]: facets[f] })),
          );
          !isEditMode && setFacets(filteredFacets);
        }}
      >
        <Icon icon="it-delete" />
      </Button>
    </Label>
  );
}

export default DateRangeFacetFilterListEntry;
