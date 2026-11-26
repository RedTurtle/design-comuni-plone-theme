/* CUSTOMIZATIONS:
  - Agid styling
  - Use with more plone.app.querystring.date operations
  - Add custom date format (e.g. dd/mm/yyyy)
  - Use DataFilter 
*/
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { compose } from 'redux';
import qs from 'query-string';
import moment from 'moment';
import DateFilter from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/SearchFilters/DateFilter';

const messages = defineMessages({
  startDate: {
    id: 'Start Date',
    defaultMessage: 'Start Date',
  },
  endDate: {
    id: 'End Date',
    defaultMessage: 'End Date',
  },
});

const DateRangeFacet = (props) => {
  const { facet, isEditMode, onChange, value, intl } = props;
  const moment = props.moment.default;

  const startDate = value && value[0] ? moment(value[0]) : null;
  const endDate = value && value[1] ? moment(value[1]) : null;

  return (
    <div className="daterange-facet">
      <h6 className="mb-3 columnTextTitle">
        {facet?.title ?? facet?.field?.label}
      </h6>
      <DateFilter
        id={facet.field.value}
        blockID={facet['@id']}
        value={{ startDate, endDate }}
        startLabel={intl.formatMessage(messages.startDate)}
        endLabel={intl.formatMessage(messages.endDate)}
        showClearDates={true}
        disabled={isEditMode}
        isOutsideRange={() => false}
        onChange={(_id, { start, end }) => {
          onChange(facet.field.value, [
            start ? start.format('YYYY-MM-DD') : null,
            end ? end.format('YYYY-MM-DD') : null,
          ]);
        }}
      />
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
    const date_fmt = 'YYYY-MM-DD HH:mm';
    if (value[0] && !value[1]) {
      const start = moment(value[0]).startOf('day').utc().format(date_fmt);
      return {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.date.largerThan',
        v: start,
      };
    } else if (!value[0] && value[1]) {
      const end = moment(value[1])
        .add(1, 'd')
        .startOf('day')
        .utc()
        .format(date_fmt);
      return {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.date.lessThan',
        v: end,
      };
    } else if (!value[0] && !value[1]) return null;
    else {
      const start = moment(value[0]).startOf('day').utc().format(date_fmt);
      const end = moment(value[1])
        .add(1, 'd')
        .startOf('day')
        .utc()
        .format(date_fmt);
      return {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.date.between',
        v: [start, end],
      };
    }
  }

  return null;
};

export default compose(injectLazyLibs(['moment']), injectIntl)(DateRangeFacet);
