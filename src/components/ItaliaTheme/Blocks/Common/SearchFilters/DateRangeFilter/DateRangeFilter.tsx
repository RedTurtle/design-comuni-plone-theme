import { useDateRangePicker } from 'react-aria';
import {
  useDateRangePickerState,
  DateRangePickerStateOptions,
} from 'react-stately';
import { RangeValue } from '@react-types/shared';
import { useRef } from 'react';
import { DateField, Button, Dialog, Popover } from './Commons';
import { RangeCalendar } from './Calendar/RangeCalendar';
import { DateRange, DateValue } from 'react-aria-components';
import { Icon } from 'design-react-kit';
import cx from 'classnames';
import { useIntl, defineMessages } from 'react-intl';

import './index.css';

type AvailableColors =
  | 'white'
  | 'primary'
  | 'secondary'
  | 'body'
  | 'dark'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success'
  | 'light'
  | 'muted';

export type CustomDateRange = {
  start: DateValue | null;
  end: DateValue | null;
};

interface DateRangeFilterProps
  extends Omit<DateRangePickerStateOptions, 'onChange'> {
  value?: RangeValue<DateValue>;
  id: string;
  startLabel?: string;
  endLabel?: string;
  showInputLabels?: boolean;
  onChange: (id: string, value: CustomDateRange | null) => void;
  textColor?: AvailableColors;
  controlsBackgroundColor?: AvailableColors;
  validationEnabled?: boolean;
}

// Vorrei capire perche' sono costretta ad copiare TUTTI i messaggi
// di questo e tutti i componenti che lo compongono per metterli in
// overrideTranslations per generare traduzioni con yarn i18n
export const MESSAGES = {
  calendarClearDates: {
    id: 'calendarClearDates',
    defaultMessage: 'Clear selection',
  },
  calendarInvalid: {
    id: 'calendarInvalid',
    defaultMessage: 'Invalid value',
  },
  calendarOpenCalendar: {
    id: 'calendarOpenCalendar',
    defaultMessage: 'Open calendar',
  },
};

const messages = defineMessages(MESSAGES);

function DateRangeFilter(props: DateRangeFilterProps) {
  const {
    startLabel = '',
    endLabel = '',
    showInputLabels,
    textColor = 'body',
    controlsBackgroundColor = 'primary',
    validationEnabled = false,
    onChange,
    ...rest
  } = props;
  const intl = useIntl();

  const customOnChange = (value: CustomDateRange | null) => {
    return onChange(props.id, value);
  };
  const state = useDateRangePickerState({ ...rest, onChange: customOnChange });
  const ref = useRef<HTMLDivElement | null>(null);

  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(rest, state, ref);
  const onClearButtonClick = () => {
    state.setValue(null);
    customOnChange({ start: null, end: null });
  };
  const dateFieldChangeHandler = (name: 'end' | 'start', value: DateValue) => {
    const newValue = { ...state.value, [name]: value } as DateRange;
    state.setValue(newValue);
    customOnChange(newValue);
  };

  return (
    <div className={`fw-bold d-flex me-4 text-${textColor}`}>
      <span {...labelProps}>{props.label}</span>
      <div
        {...groupProps}
        ref={ref}
        id={props.id ?? 'daterange-filter'}
        className={`d-flex border-bottom border-${textColor} daterange-filter`}
      >
        <div className="d-flex align-items-center me-2 px-2">
          <DateField
            {...startFieldProps}
            name="start"
            label={startLabel}
            showLabel={showInputLabels}
            onChange={dateFieldChangeHandler}
          />
          <span aria-hidden={true} className="px-2">
            –
          </span>
          <DateField
            {...endFieldProps}
            name="end"
            label={endLabel}
            showLabel={showInputLabels}
            onChange={dateFieldChangeHandler}
          />
          {validationEnabled && state.isInvalid && (
            <span>{intl.formatMessage(messages.calendarInvalid)}</span>
          )}
        </div>
        <Button
          className={cx(`btn btn-${controlsBackgroundColor} btn-xs p-1 me-1`, {
            'visually-hidden': !state?.value?.start,
          })}
          id="clear-dates"
          onPress={onClearButtonClick}
          aria-label={intl.formatMessage(messages.calendarClearDates)}
          isDisabled={!state.value?.start}
          aria-hidden={!state?.value?.start}
        >
          <Icon color={textColor} icon="it-close" aria-hidden={true} />
        </Button>
        <Button
          {...buttonProps}
          id="open-calendar"
          aria-label={intl.formatMessage(messages.calendarOpenCalendar)}
          className={`btn btn-${controlsBackgroundColor} border border-1 border-${textColor} btn-sm p-2 rounded-2`}
        >
          <Icon
            color={textColor}
            icon="it-calendar"
            size="sm"
            aria-hidden={true}
          />
        </Button>
      </div>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Dialog {...dialogProps}>
            <RangeCalendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
}

export default DateRangeFilter;
