import React, { useMemo } from 'react';
import { Label, Icon, Button } from 'design-react-kit';
import { defineMessages } from 'react-intl';
import { commonMessages } from '../utils';

const messages = defineMessages({
  yes: {
    id: 'yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'no',
    defaultMessage: 'No',
  },
});

function ToggleFacetFilterListEntry(props) {
  const { facet, isEditMode, setFacets, facets, intl, data } = props;
  const entrySettings = useMemo(() => {
    return data.facets?.find((f) => f?.field?.value === facet)?.field;
  }, [data, facet]);
  return facets[facet] ? (
    <Label className="d-flex w-100 py-1">
      {intl.formatMessage(messages.yes)}
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
          icon="it-close"
          size="md"
          aria-label={intl.formatMessage(commonMessages.clearFilter, {
            filterName: entrySettings?.label ?? '',
          })}
          title={intl.formatMessage(commonMessages.clearFilter, {
            filterName: entrySettings?.label ?? '',
          })}
        />
      </Button>
    </Label>
  ) : null;
}

export default ToggleFacetFilterListEntry;
