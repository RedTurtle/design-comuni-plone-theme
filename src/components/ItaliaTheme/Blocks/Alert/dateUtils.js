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

export const isActive = (startDate, endDate) => {
  const today = new Date().getTime();
  const start = startDate ? new Date(startDate).getTime() : null;
  const end = endDate ? new Date(endDate).getTime() : null;

  if (start && end) {
    return today >= start && today <= end;
  }
  if (start) {
    return today >= start;
  }
  if (end) {
    return today <= end;
  }
  return false;
};

const Dates = ({ startDate, endDate }) => {
  const intl = useIntl();
  const currentDate = new Date().getTime();
  const startDateObj = startDate ? new Date(startDate).getTime() : null;
  const endDateObj = endDate ? new Date(endDate).getTime() : null;

  let currentStatus = null;

  if (startDateObj && endDateObj) {
    if (currentDate < startDateObj) {
      currentStatus = intl.formatMessage(messages.futureDate);
    } else if (currentDate > endDateObj) {
      currentStatus = intl.formatMessage(messages.expiredDate);
    } else {
      currentStatus = intl.formatMessage(messages.activeDate);
    }
  } else if (startDateObj) {
    currentStatus =
      currentDate < startDateObj
        ? intl.formatMessage(messages.futureDate)
        : intl.formatMessage(messages.activeDate);
  } else if (endDateObj) {
    currentStatus =
      currentDate <= endDateObj
        ? intl.formatMessage(messages.activeDate)
        : intl.formatMessage(messages.expiredDate);
  }

  return (
    currentStatus && (
      <Container className="alert-info-dates">
        <Row>
          <p>{currentStatus}</p>
        </Row>
        <Row>
          <ul>
            {startDate && (
              <li>
                <p>
                  {intl.formatMessage(messages.startTitle)}{' '}
                  {new Date(startDate).toLocaleString()}{' '}
                </p>
              </li>
            )}
            {endDate && (
              <li>
                <p>
                  {intl.formatMessage(messages.endTitle)}{' '}
                  {new Date(endDate).toLocaleString()}
                </p>
              </li>
            )}
          </ul>
        </Row>
      </Container>
    )
  );
};

export default Dates;
