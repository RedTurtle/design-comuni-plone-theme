/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Search/components/SelectFacet.jsx
 *
 * CUSTOMIZATIONS:
 * - Agid styling: replaced the lazy-loaded react-select (injectLazyLibs('reactSelect')) styled via
 *   SelectStyling (Option, DropdownIndicator, MultiValueContainer, customSelectStyles, selectTheme)
 *   with the `Select` component from `design-react-kit` (Bootstrap Italia)
 * - Wrapped the select in a `<div className="select-facet">` with an `<h6 className="mb-3 columnTextTitle">`
 *   title and a `bootstrap-select-wrapper` div, and added `aria-label`, `id` and `isSearchable` props
 * - Changed the `base` helpers import from the relative `./base` to the absolute
 *   `@plone/volto/components/manage/Blocks/Search/components/base` path
 * - Removed the `injectLazyLibs('reactSelect')` HOC wrapper, exporting the component directly
 */
import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import {
  selectFacetSchemaEnhancer,
  selectFacetStateToValue,
  selectFacetValueToQuery,
} from '@plone/volto/components/manage/Blocks/Search/components/base';
import { Select } from 'design-react-kit';

const messages = defineMessages({
  selectOption: {
    id: 'Select option',
    defaultMessage: 'Select option',
  },
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
});

const SelectFacet = (props) => {
  const { facet, choices, isMulti, onChange, value, isEditMode } = props;
  const intl = useIntl();
  const v = Array.isArray(value) && value.length === 0 ? null : value;
  return (
    <div className="select-facet">
      <h6 className="mb-3 columnTextTitle">
        {facet?.title || facet?.field?.label}
      </h6>

      <div className="bootstrap-select-wrapper">
        {/* <label htmlFor={facet['@id']}>
          {facet?.title || facet?.field?.label || ''}
        </label> */}
        {/* Cannot style with props because the kit is... the kit. Resorting to div[class*='-ValueContainer'] */}
        <Select
          placeholder={
            facet?.title ??
            (facet?.field?.label || intl.formatMessage(messages.select))
          }
          aria-label={
            facet?.title ??
            facet?.field?.label ??
            intl.formatMessage(messages.selectOption)
          }
          id={facet['@id']}
          options={choices}
          isDisabled={isEditMode}
          onChange={(data) => {
            if (data) {
              onChange(
                facet.field.value,
                isMulti ? data.map(({ value }) => value) : data.value,
              );
            } else {
              // data has been removed
              onChange(facet.field.value, isMulti ? [] : '');
            }
          }}
          isMulti={facet.multiple}
          isClearable={true}
          value={v}
          isSearchable={true}
        />
      </div>
    </div>
  );
};

SelectFacet.schemaEnhancer = selectFacetSchemaEnhancer;
SelectFacet.stateToValue = selectFacetStateToValue;
SelectFacet.valueToQuery = selectFacetValueToQuery;

export default SelectFacet;
