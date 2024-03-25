import { useRangeCalendar } from 'react-aria';
import { useLocale, useDateFormatter } from '@react-aria/i18n';
import {
  useRangeCalendarState,
  RangeCalendarStateOptions,
  RangeCalendarState,
} from 'react-stately';
import { createCalendar, CalendarDate } from '@internationalized/date';
import { useRef } from 'react';
import { Button } from '../Commons/Button';
import { CalendarGrid } from './CalendarGrid';
import { Icon } from 'design-react-kit';
import {
  SelectValue,
  ListBox,
  ListBoxItem,
  Select,
  Key,
  Popover,
  Dialog,
  Label,
  DialogTrigger,
} from 'react-aria-components';
import { useIntl, defineMessages } from 'react-intl';

import './Calendar.css';
import '../Commons/Popover.css';
import '../Commons/Listbox.css';

interface CalendarDropdown {
  state: RangeCalendarState;
}

interface RangeCalendarComponentProps
  extends Partial<RangeCalendarStateOptions> {}

type Years = {
  value: CalendarDate;
  formatted: string;
};
export const MESSAGES = {
  calendarYear: {
    id: 'calendarYear',
    defaultMessage: 'Year',
  },
  calendarMonth: {
    id: 'calendarMonth',
    defaultMessage: 'Month',
  },
};

const messages = defineMessages(MESSAGES);

export const RangeCalendar = (props: RangeCalendarComponentProps) => {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  return (
    <div {...calendarProps} className="react-aria-calendar p-4" ref={ref}>
      <header className="d-flex pb-4 align-items-end justify-content-between">
        <h2 className="visually-hidden">{title}</h2>
        <Button {...prevButtonProps} className={'btn btn-icon p-0'}>
          <Icon icon="it-chevron-left" size="xl" aria-hidden={true}></Icon>
        </Button>
        <div className="d-flex align-items-center justify-content-between">
          <MonthDropdown state={state} />
          <YearDropdown state={state} />
        </div>
        <Button {...nextButtonProps} className={'btn btn-icon p-0'}>
          <Icon icon="it-chevron-right" size="xl" aria-hidden={true}></Icon>
        </Button>
      </header>
      <CalendarGrid state={state} />
    </div>
  );
};

function MonthDropdown({ state }: CalendarDropdown) {
  const intl = useIntl();
  const months: string[] = [];
  const formatter = useDateFormatter({
    month: 'long',
    timeZone: state.timeZone,
  });
  const ref = useRef<HTMLDivElement | null>(null);
  // Format the name of each month in the year according to the
  // current locale and calendar system.
  const numMonths = state.focusedDate.calendar.getMonthsInYear(
    state.focusedDate,
  );
  for (let i = 1; i <= numMonths; i++) {
    const date = state.focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(state.timeZone)));
  }

  const onChange = (key: Key) => {
    const value = Number(key) + 1;
    const date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };
  return (
    <Select
      selectedKey={state.focusedDate.month - 1}
      onSelectionChange={onChange}
      className={'year-selector'}
    >
      <Label hidden={true}>{intl.formatMessage(messages.calendarMonth)}</Label>
      <DialogTrigger>
        <Button>
          <SelectValue />
          <Icon icon="it-arrow-down-triangle" aria-hidden={true}></Icon>
        </Button>
        <Popover placement="bottom">
          <Dialog>
            <ListBox>
              {months.map((month, i) => (
                <ListBoxItem key={i} id={i}>
                  {month}
                </ListBoxItem>
              ))}
            </ListBox>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </Select>
  );
}

function YearDropdown({ state }: CalendarDropdown) {
  const intl = useIntl();
  const years: Years[] = [];
  const formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });

  // Format 20 years on each side of the current year according
  // to the current locale and calendar system.
  for (let i = -20; i <= 20; i++) {
    const date = state.focusedDate.add({ years: i });
    years.push({
      value: date,
      formatted: formatter.format(date.toDate(state.timeZone)),
    });
  }

  const onChange = (key: Key) => {
    const date = years.find((y) => y.formatted === key)?.value!;
    state.setFocusedDate(date);
  };
  return (
    <Select
      selectedKey={String(state.focusedDate.year)}
      onSelectionChange={onChange}
      className={'month-selector'}
    >
      <Label hidden={true}>{intl.formatMessage(messages.calendarYear)}</Label>
      <DialogTrigger>
        <Button>
          <SelectValue />
          <Icon icon="it-arrow-down-triangle" aria-hidden={true}></Icon>
        </Button>
        <Popover placement="bottom">
          <Dialog>
            <ListBox>
              {years.map((year, i) => (
                <ListBoxItem key={year.formatted} id={year.formatted}>
                  {year.formatted}
                </ListBoxItem>
              ))}
            </ListBox>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </Select>
  );
}
