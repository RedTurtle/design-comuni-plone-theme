import React, { useMemo } from 'react';
import { Label, Icon, Button } from 'design-react-kit';
import { selectFacetStateToValue } from '@plone/volto/components/manage/Blocks/Search/components/base';

function SelectFacetFilterListEntry(props) {
  const { facet, isEditMode, setFacets, facets, querystring, data } = props;
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
    <>
      <Label>
        {selectedValue?.label || ''}
        <Button
          onClick={() => {
            !isEditMode &&
              setFacets({
                ...facets,
                [facet]: '',
              });
          }}
        >
          <Icon icon="it-delete" />
        </Button>
      </Label>
    </>
  ) : (
    <>
      {facets[facet].map((entry, i) => {
        return (
          <Label key={i}>
            {Array.isArray(selectedValue)
              ? selectedValue?.find((sv) => sv.value === entry)?.label ?? ''
              : null}

            <Button
              onClick={() => {
                const entries = facets[facet].filter((item) => item !== entry);
                !isEditMode &&
                  setFacets({
                    ...facets,
                    [facet]: entries,
                  });
              }}
            >
              <Icon icon="it-delete" />
            </Button>
          </Label>
        );
      })}
    </>
  );
}

export default SelectFacetFilterListEntry;
