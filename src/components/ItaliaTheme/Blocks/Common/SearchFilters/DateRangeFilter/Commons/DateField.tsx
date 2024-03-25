import { DateValue, AriaDatePickerProps } from '@react-types/datepicker';
import React from 'react';
import {
  DateField as RACDateField,
  Label,
  DateInput,
  DateSegment as RACDateSegment,
} from 'react-aria-components';

interface DateFieldProps
  extends Omit<AriaDatePickerProps<DateValue>, 'onChange'> {
  showLabel?: boolean;
  label: string;
  name: 'end' | 'start';
  onChange: (name: 'end' | 'start', value: DateValue) => void;
}

export const DateField: React.FC<DateFieldProps> = (props) => {
  const { label, showLabel = true, onChange, ...rest } = props;
  const customOnChangeHandler = (value: DateValue) => {
    return onChange(props.name, value);
  };

  return (
    <RACDateField {...rest} onChange={customOnChangeHandler}>
      {showLabel && <Label>{label ?? ''}</Label>}
      <DateInput>{(segment) => <RACDateSegment segment={segment} />}</DateInput>
    </RACDateField>
  );
};
