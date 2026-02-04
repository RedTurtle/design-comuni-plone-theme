/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 *
 * https://github.com/plone/volto/blob/main/packages/volto/src/components/manage/Widgets/DatetimeWidget.jsx
 *
 * CUSTOMIZATIONS:
 * - accept calendar `openDirection` prop and use it in SingleDatePicker,
 *   default to down if no openDirection is given
 * - requirement aria attributes added to date and time inputs - To be backported https://github.com/plone/volto/pull/7494
 */

/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { parseDateTime, toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import leftKey from '@plone/volto/icons/left-key.svg';
import rightKey from '@plone/volto/icons/right-key.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import 'rc-time-picker/assets/index.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const TimePicker = loadable(() => import('rc-time-picker'));

const messages = defineMessages({
  date: {
    id: 'Date',
    defaultMessage: 'Date',
  },
  time: {
    id: 'Time',
    defaultMessage: 'Time',
  },
  clearDateTime: {
    id: 'Clear date/time',
    defaultMessage: 'Clear date and time',
  },
});

const PrevIcon = () => (
  <div
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
    <Icon name={leftKey} size="30px" />
  </div>
);

const NextIcon = () => (
  <div
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
    <Icon name={rightKey} size="30px" />
  </div>
);

const defaultTimeDateOnly = {
  hour: 12,
  minute: 0,
  second: 0,
};

const DatetimeWidgetComponent = (props) => {
  const {
    id,
    resettable,
    reactDates,
    widgetOptions,
    moment,
    value,
    onChange,
    dateOnly,
    widget,
    noPastDates: propNoPastDates,
    isDisabled,
    formData,
    openDirection, // ✅ adicionada
  } = props;

  const intl = useIntl();
  const lang = intl.locale;

  const [focused, setFocused] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const { SingleDatePicker } = reactDates;

  useEffect(() => {
    const parsedDateTime = parseDateTime(
      toBackendLang(lang),
      value,
      undefined,
      moment.default,
    );
    setIsDefault(
      parsedDateTime?.toISOString() === moment.default().utc().toISOString(),
    );
  }, [value, lang, moment]);

  const getInternalValue = () => {
    return parseDateTime(toBackendLang(lang), value, undefined, moment.default);
  };

  const getDateOnly = () => {
    return (
      dateOnly ||
      widget === 'date' ||
      ((id === 'start' || id === 'end') && formData?.whole_day)
    );
  };

  const onDateChange = (date) => {
    if (date) {
      const isDateOnly = getDateOnly();
      const base = (getInternalValue() || moment.default()).set({
        year: date.year(),
        month: date.month(),
        date: date.date(),
        ...(isDateOnly ? defaultTimeDateOnly : {}),
      });
      const dateValue = isDateOnly
        ? base.format('YYYY-MM-DD')
        : base.toISOString();
      onChange(id, dateValue);
    }
    setIsDefault(false);
  };

  const onTimeChange = (time) => {
    if (time) {
      const base = (getInternalValue() || moment.default()).set({
        hours: time?.hours() ?? 0,
        minutes: time?.minutes() ?? 0,
        seconds: 0,
      });
      const dateValue = base.toISOString();
      onChange(id, dateValue);
    }
  };

  const onResetDates = () => {
    setIsDefault(false);
    onChange(id, null);
  };

  const onFocusChange = ({ focused }) => setFocused(focused);

  const noPastDates =
    propNoPastDates || widgetOptions?.pattern_options?.noPastDates;
  const datetime = getInternalValue();
  const isDateOnly = getDateOnly();

  //pezzo aggiunto per gestire aria-required - https://github.com/plone/volto/pull/7494
  useEffect(() => {
    const dateSelectors = [
      `#${id}-date`,
      `#${id}-date .DateInput_input`,
      `#${id}-date input`,
      `#${id}`,
      `.DateInput_input#${id}`,
    ];

    const timeSelectors = [
      `#${id}-time input`,
      `#${id}-time .rc-time-picker-input`,
      `.rc-time-picker-input#${id}-time`,
      `.time-input #${id}-time`,
      `.time-input .rc-time-picker-input`,
    ];

    function findInput(selectors) {
      for (let selector of selectors) {
        const item = document.querySelector(selector);
        if (item && item.tagName === 'INPUT') return item;
        if (item && item.querySelector) {
          const inner = item.querySelector('input');
          if (inner) return inner;
        }
      }
      return null;
    }

    function applyAria() {
      const dateInput = findInput(dateSelectors);
      if (!dateInput) return;

      if (props.required) dateInput.setAttribute('aria-required', 'true');
      else dateInput.removeAttribute('aria-required');

      if (props.required && !isDateOnly) {
        const timeInput = findInput(timeSelectors);
        if (timeInput) timeInput.setAttribute('aria-required', 'true');
      }
    }

    applyAria();

    const observer = new MutationObserver(applyAria);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => observer.disconnect();
  }, [props.required, id, isDateOnly]);

  // If open_end is checked and this is the end field, don't render
  if (id === 'end' && formData?.open_end) {
    return null;
  }
  // fine pezzo aggiunto per gestire aria-required

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div
          className={cx('ui input date-input', {
            'default-date': isDefault,
          })}
        >
          <SingleDatePicker
            date={datetime}
            disabled={isDisabled}
            onDateChange={onDateChange}
            focused={focused}
            numberOfMonths={1}
            {...(noPastDates ? {} : { isOutsideRange: () => false })}
            onFocusChange={onFocusChange}
            noBorder
            displayFormat={moment.default
              .localeData(toBackendLang(lang))
              .longDateFormat('L')}
            navPrev={<PrevIcon />}
            navNext={<NextIcon />}
            id={`${id}-date`}
            placeholder={intl.formatMessage(messages.date)}
            openDirection={openDirection ?? 'down'}
          />
        </div>
        {!isDateOnly && (
          <div
            className={cx('ui input time-input', {
              'default-date': isDefault,
            })}
          >
            <TimePicker
              disabled={isDisabled}
              defaultValue={datetime}
              value={datetime}
              onChange={onTimeChange}
              allowEmpty={false}
              showSecond={false}
              use12Hours={lang === 'en'}
              id={`${id}-time`}
              format={moment.default
                .localeData(toBackendLang(lang))
                .longDateFormat('LT')}
              placeholder={intl.formatMessage(messages.time)}
              focusOnOpen
              placement="bottomRight"
            />
          </div>
        )}
        {resettable && (
          <button
            type="button"
            disabled={isDisabled || !datetime}
            onClick={onResetDates}
            className="item ui noborder button"
            aria-label={intl.formatMessage(messages.clearDateTime)}
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

DatetimeWidgetComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  dateOnly: PropTypes.bool,
  noPastDates: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  resettable: PropTypes.bool,
  openDirection: PropTypes.oneOf(['up', 'down']),
};

DatetimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
  openDirection: 'down',
};

export default injectLazyLibs(['reactDates', 'moment'])(
  DatetimeWidgetComponent,
);
