import React, { useState } from 'react';
import { Icon } from 'design-react-kit';
import { defineMessages, injectIntl } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { compose } from 'redux';
import { connect } from 'react-redux';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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

const PrevIcon = () => (
  <div
    className="prev-icon"
    style={{
      color: '#000',
      left: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon icon="it-chevron-left" size="30px" />
  </div>
);
const NextIcon = () => (
  <div
    className="next-icon"
    style={{
      color: '#000',
      right: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon icon="it-chevron-right" size="30px" />
  </div>
);

const CloseIcon = () => <Icon icon="it-close" size="24px" className="close" />;

const DateRangeFacet = (props) => {
  const { facet, isEditMode, onChange, value, reactDates, intl, lang } = props;
  const moment = props.moment.default;
  const { DateRangePicker } = reactDates;
  const [focused, setFocused] = useState(null);

  return (
    <div className="daterange-facet">
      <h5 className="mb-2">{facet?.title ?? facet?.field?.label}</h5>
      <div className="date-time-widget-wrapper">
        <div className="date-input">
          <DateRangePicker
            startDate={value && value[0] ? moment(value[0]) : null}
            startDateId={`${facet['@id']}-start-date`}
            startDatePlaceholderText={intl.formatMessage(messages.startDate)}
            endDate={value && value[1] ? moment(value[1]) : null}
            endDateId={`${facet['@id']}-end-date`}
            endDatePlaceholderText={intl.formatMessage(messages.endDate)}
            numberOfMonths={1}
            disabled={isEditMode}
            noBorder
            showClearDates
            customCloseIcon={<CloseIcon />}
            displayFormat={moment.localeData(lang).longDateFormat('L')}
            focusedInput={focused}
            onFocusChange={(focusedInput) => setFocused(focusedInput)}
            onDatesChange={({ startDate, endDate }) => {
              onChange(facet.field.value, [
                startDate ? startDate.format('YYYY-MM-DD') : null,
                endDate ? endDate.format('YYYY-MM-DD') : null,
              ]);
            }}
            isOutsideRange={() => false}
            navPrev={<PrevIcon />}
            navNext={<NextIcon />}
          />
        </div>
      </div>
    </div>
  );
};

DateRangeFacet.stateToValue = ({ facetSettings, index, selectedValue }) => {
  return selectedValue || [null, null];
};

// CUSTOMIZATION to make it actually work as intended
DateRangeFacet.valueToQuery = ({ value, facet }) => {
  if (value) {
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
  injectLazyLibs(['reactDates', 'moment']),
  connect((state) => ({
    lang: state.intl.locale,
  })),
  injectIntl,
)(DateRangeFacet);
