import { useCalendarGrid, AriaCalendarGridProps } from 'react-aria';
import { useLocale } from '@react-aria/i18n';
import { RangeCalendarState } from 'react-stately';
import { getWeeksInMonth } from '@internationalized/date';
import { CalendarCell } from './CalendarCell';
import React from 'react';

type CalendarGridProps = {
  state: RangeCalendarState;
} & AriaCalendarGridProps;

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  state,
  ...props
}) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps}>
      <thead {...headerProps} className="text-center">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
