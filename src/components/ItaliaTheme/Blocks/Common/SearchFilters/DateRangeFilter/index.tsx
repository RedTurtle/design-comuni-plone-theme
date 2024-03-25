import { MESSAGES as CalendarMessages } from './Calendar/RangeCalendar';
import { MESSAGES as DateFilterMessages } from './DateRangeFilter';
import { lazy } from 'react';

// Remove webpackChunkName if bundling by components that depend on react-aria-component
// is deemed useless now or in the future, given @plone/components has RAC as dependency.
const DateRangeFilter = lazy(
  () => import(/* webpackChunkName: "RACUIComponents" */ './DateRangeFilter'),
);
// Tried to export messages because i18n is unable to generate translations, but babel-plugin-react-intl@5.1.17
// is old, deprecated and broken and you cannot merge translation objects in overrideTrandlations, sad.
// In copy pasting we will trust.
const DateRangeFilterMessages = { ...CalendarMessages, ...DateFilterMessages };
export { DateRangeFilterMessages };
export default DateRangeFilter;
