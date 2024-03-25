import {
  DateRangeFilter,
  SelectFilter,
  TextFilter,
} from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/SearchFilters';
import { defineMessages, useIntl } from 'react-intl';
import { getLocalTimeZone } from '@internationalized/date';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useSelector } from 'react-redux';

const messages = defineMessages({
  text_filter: {
    id: 'searchBlock_text_filter',
    defaultMessage: 'Filtro di testo',
  },
  venue_filter: {
    id: 'searchBlock_venue_filter',
    defaultMessage: 'Filtro per luoghi',
  },
  date_filter: {
    id: 'searchBlock_date_filter',
    defaultMessage: 'Filtro per date',
  },
  venues: {
    id: 'venues',
    defaultMessage: 'Luoghi',
  },
  search_keyword: {
    id: 'Cerca per parola chiave',
    defaultMessage: 'Cerca per parola chiave',
  },
});

const DefaultFilters = () => {
  const intl = useIntl();
  const subsite = useSelector((state) => state.subsite?.data);

  return {
    text_filter: {
      label: intl.formatMessage(messages.text_filter),
      type: 'text_filter',
      widget: {
        component: TextFilter,
        props: {
          value: '',
          placeholder: intl.formatMessage(messages.search_keyword),
        },
      },
      query: (value, query) => {
        if (value) {
          query.push({
            i: 'SearchableText',
            o: 'plone.app.querystring.operation.string.contains',
            v: value + '*',
          });
        }
      },
    },
    venue_filter: {
      label: intl.formatMessage(messages.venue_filter),
      type: 'venue_filter',
      widget: {
        component: SelectFilter,
        props: {
          value: null,
          options: {
            dispatch: {
              path: subsite ? flattenToAppURL(subsite['@id']) : '/',
              portal_types: ['Venue'],
              fullobjects: 0,
              b_size: 10000,
              subrequests_name: 'venues',
            },
            placeholder: intl.formatMessage(messages.venues),
          },
        },
      },
      query: (value, query) => {
        if (value?.value) {
          query.push({
            i: 'event_location',
            o: 'plone.app.querystring.operation.selection.any',
            v: value.value,
          });
        }
      },
    },
    date_filter: {
      label: intl.formatMessage(messages.date_filter),
      type: 'date_filter',
      widget: {
        component: DateRangeFilter,
        props: {
          value: {
            start: null,
            end: null,
          },
          showClearDates: true,
          showInputLabels: true,
          // startLabel: intl.formatMessage(messages.scadenza_dal),
          // endLabel: intl.formatMessage(messages.scadenza_al),
        },
      },

      reducer: (value, state) => {
        let start, end;
        if (value) {
          start = value.start;
          end = value.end;
        } else {
          start = state.widget.props.value.start;
          end = state.widget.props.value.end;
        }
        return {
          start,
          end,
        };
      },
      query: (value, query) => {
        let start, end;
        if (value?.start) {
          start = value.start.toDate(getLocalTimeZone());
          query.push({
            i: 'start', //end
            o: 'plone.app.querystring.operation.date.largerThan', //plone.app.querystring.operation.date.largerThan
            v: start.toISOString(),
          });
        }
        if (value?.end) {
          end = value.end.cycle('day', 1).toDate(getLocalTimeZone());
          query.push({
            i: 'end', //start
            o: 'plone.app.querystring.operation.date.lessThan', //plone.app.querystring.operation.date.lessThan
            v: end.toISOString(),
          });
        }
      },
    },
  };
};

export default DefaultFilters;
