import { useCalendarCell } from 'react-aria';
import { RangeCalendarState } from 'react-stately';
import { CalendarDate, isSameDay } from '@internationalized/date';
import React, { useRef } from 'react';

type CalendarCellProps = {
  state: RangeCalendarState;
  date: CalendarDate;
};

export const CalendarCell: React.FC<CalendarCellProps> = ({ state, date }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { cellProps, buttonProps, isSelected, ...states } = useCalendarCell(
    { date },
    state,
    ref,
  );
  let isSelectionEnd, isSelectionStart;
  if ('highlightedRange' in state && state.highlightedRange) {
    isSelectionStart = isSameDay(date, state.highlightedRange.start);
    isSelectionEnd = isSameDay(date, state.highlightedRange.end);
  }
  let dataAttrs = {
    'data-focused': states.isFocused || undefined,
    'data-pressed': states.isPressed || undefined,
    'data-unavailable': states.isUnavailable || undefined,
    'data-disabled': states.isDisabled || undefined,
    'data-outside-visible-range': states.isOutsideVisibleRange || undefined,
    'data-selected': isSelected || undefined,
    'data-selection-start': isSelectionStart || undefined,
    'data-selection-end': isSelectionEnd || undefined,
    'data-invalid': states.isInvalid || undefined,
  };

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        {...dataAttrs}
        ref={ref}
        hidden={states.isOutsideVisibleRange}
        className={`react-aria-calendarCell`}
      >
        {states.formattedDate}
      </div>
    </td>
  );
};
