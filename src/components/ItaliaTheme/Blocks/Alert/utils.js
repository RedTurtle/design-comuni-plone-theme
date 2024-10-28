import React from 'react';
import { Row, Container } from 'design-react-kit/dist/design-react-kit';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  expiredDate: {
    id: 'expiredDate',
    defaultMessage: 'Pubblicazione scaduta',
  },
  activeDate: {
    id: 'activeDate',
    defaultMessage: 'Pubblicazione attiva',
  },
  futureDate: {
    id: 'futureDate',
    defaultMessage: 'Pubblicazione futura',
  },
  startTitle: {
    id: 'startTitle',
    defaultMessage: 'Data inizio pubblicazione:',
  },
  endTitle: {
    id: 'endTitle',
    defaultMessage: 'Data fine pubblicazione:',
  },
});

const isActive = ({ startDate, endDate }) => {
  const intl = useIntl();

  let currentStatus = null;

  const isActive = () => {
    const today = new Date().getTime();
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() : null;

    if (start && end) {
      currentStatus = intl.formatMessage(messages.activeDate);
      return today >= start && today <= end;
    }
    if (start) {
      today >= start
        ? (currentStatus = intl.formatMessage(messages.activeDate))
        : (currentStatus = intl.formatMessage(messages.futureDate));
      return today >= start;
    }
    if (end) {
      today <= end
        ? (currentStatus = intl.formatMessage(messages.activeDate))
        : (currentStatus = intl.formatMessage(messages.expiredDate));
      return today <= end;
    }
    return false;
  };

  return isActive;
};

export default isActive(currentStatus);
