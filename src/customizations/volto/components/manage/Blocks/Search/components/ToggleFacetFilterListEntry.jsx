/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/manage/Blocks/Search/components/ToggleFacetFilterListEntry.jsx
 *
 * CUSTOMIZATIONS:
 * - Agid styling: use design-react-kit's Label/Icon/Button components instead of semantic-ui-react ones (icon "it-close" instead of "delete")
 * - only render the entry when the facet is actually active (`facets[facet]` truthy), instead of always showing a Yes/No label
 * - show a title span with the facet's label (facetSettings.title / field.label) above the value badge
 * - use `intl` from props instead of the `useIntl` hook
 * - accept new `data` and `facetSettings` props and compute `entrySettings` (via useMemo) by matching `facet` against `data.facets` to get the field label
 * - add accessible `aria-label`/`title` attributes on the clear button and icon, built from commonSearchBlockMessages.clearFilter with the facet's label interpolated
 */
import React, { useMemo } from 'react';
import { Label, Icon, Button } from 'design-react-kit';
import { defineMessages } from 'react-intl';
import { commonSearchBlockMessages } from 'design-comuni-plone-theme/helpers';

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
  const { facet, isEditMode, setFacets, facets, intl, data, facetSettings } =
    props;
  const entrySettings = useMemo(() => {
    return data.facets?.find((f) => f?.field?.value === facet)?.field;
  }, [data, facet]);
  return facets[facet] ? (
    <>
      <span className="label-title mb-2">
        {facetSettings.title ?? facetSettings?.field?.label}
      </span>
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
          aria-label={intl.formatMessage(
            commonSearchBlockMessages.clearFilter,
            {
              filterName: entrySettings?.label ?? '',
            },
          )}
          title={intl.formatMessage(commonSearchBlockMessages.clearFilter, {
            filterName: entrySettings?.label ?? '',
          })}
        >
          <Icon
            icon="it-close"
            size="md"
            aria-label={intl.formatMessage(
              commonSearchBlockMessages.clearFilter,
              {
                filterName: entrySettings?.label ?? '',
              },
            )}
            title={intl.formatMessage(commonSearchBlockMessages.clearFilter, {
              filterName: entrySettings?.label ?? '',
            })}
          />
        </Button>
      </Label>
    </>
  ) : null;
}

export default ToggleFacetFilterListEntry;
