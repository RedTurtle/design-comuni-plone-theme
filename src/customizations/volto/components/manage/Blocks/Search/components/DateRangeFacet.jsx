/* CUSTOMIZATIONS:
  - Agid styling
  - Use with more plone.app.querystring.date operations
*/
import React from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { DateRangeFilter } from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/SearchFilters';

const DateRangeFacet = (props) => {
  const { facet, isEditMode, onChange, value } = props;
  const onDatesChange = (id, incomingValue) => {
    const newValue = [];
    const { start, end } = incomingValue ?? {};
    const [facetStart, facetEnd] = value;

    if (start) {
      const startDate = start.toDate(getLocalTimeZone());
      if (startDate !== new Date(facetStart))
        newValue.push(startDate.toISOString());
      else newValue.push(facetStart);
    } else newValue.push(null);
    if (end) {
      const endDate = end.toDate(getLocalTimeZone());

      if (endDate !== new Date(facetEnd)) newValue.push(endDate.toISOString());
      else newValue.push(facetEnd);
    } else newValue.push(null);
    onChange(facet.field.value, newValue);
  };

  const valueAdapter = () => {
    const [startValue, endValue] = value ?? [null, null];
    const start = startValue ? startValue.substring(0, 10) : null;
    const end = endValue ? endValue.substring(0, 10) : null;
    return {
      start: start ? parseDate(start).cycle('day', 1) : null,
      end: end ? parseDate(end).cycle('day', 1) : null,
    };
  };

  return (
    <div className="daterange-facet">
      <h6 className="mb-3 columnTextTitle">
        {facet?.title ?? facet?.field?.label}
      </h6>
      <div className="date-time-widget-wrapper">
        <div className="date-input">
          <DateRangeFilter
            value={valueAdapter()}
            showClearDates
            id="search-block-daterange-facet"
            showInputLabels={false}
            onChange={onDatesChange}
            controlsBackgroundColor={'body'}
            isDisabled={isEditMode}
          />
        </div>
      </div>
    </div>
  );
};

// CUSTOMIZATION to make it actually work as intended
// Terrificante modo di prendere l'op reale e non le abbreviazioni
// inspiegabili e buggose di chi ha fatto il blocco Search,
// piuttosto che riscriverlo da capo.
// D'altronde, nel codice originale e' pieno di todo...
DateRangeFacet.stateToValue = (state) => {
  const { facetSettings, selectedValue, searchData = {} } = state;
  if (typeof selectedValue === 'string') {
    const queryIndex = searchData?.query?.find(
      (q) => q.i === facetSettings?.field?.value,
    );
    if (queryIndex) {
      if (queryIndex?.o?.includes('date.largerThan'))
        return [selectedValue, null];
      else if (queryIndex?.o?.includes('date.lessThan'))
        return [null, selectedValue];
      else if (queryIndex?.o?.includes('date.between')) return selectedValue;
    }
    return [null, null];
  } else return selectedValue || [null, null];
};

// CUSTOMIZATION to make it actually work as intended
// Terrificante modo di prendere l'op reale e non le abbreviazioni
// inspiegabili e buggose di chi ha fatto il blocco Search,
// piuttosto che riscriverlo da capo.
// D'altronde, nel codice originale e' pieno di todo...
DateRangeFacet.valueToQuery = ({ value, facet }) => {
  if (typeof value === 'string') {
    const params = qs.parse(window.location.hash);
    // Cannot guess, make it fail grracefully at least
    if (!params) return null;

    const facetQuery = JSON.parse(params?.query || '[]')?.find(
      (q) => q.i === facet.field.value,
    );
    const facetOperation = facetQuery?.o ?? '';
    return {
      i: facet.field.value,
      o: facetOperation.replace('paqo', 'plone.app.querystring.operation'),
      v: value,
    };
  } else if (Array.isArray(value)) {
    if (value[0] && !value[1])
      return {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.date.largerThan',
        v: value[0],
      };
    else if (!value[0] && value[1])
      return {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.date.lessThan',
        v: value[1],
      };
    else if (!value[0] && !value[1]) return null;
    else
      return {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.date.between',
        v: value,
      };
  }

  return null;
};

export default compose(
  connect((state) => ({
    lang: state.intl.locale,
  })),
  injectIntl,
)(DateRangeFacet);
