import React from 'react';
import { Row, Container } from 'design-react-kit/dist/design-react-kit';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  expiredDate: { id: 'expiredDate', defaultMessage: 'Pubblicazione scaduta' },
  activeDate: { id: 'activeDate', defaultMessage: 'Pubblicazione attiva' },
  futureDate: { id: 'futureDate', defaultMessage: 'Pubblicazione futura' },
  startTitle: {
    id: 'startTitle',
    defaultMessage: 'Data inizio pubblicazione:',
  },
  endTitle: { id: 'endTitle', defaultMessage: 'Data fine pubblicazione:' },
});

// Componente Dates
const Dates = ({ startDate, endDate }) => {
  const intl = useIntl();
  const currentDate = new Date();
  const startDateObj = startDate ? new Date(startDate) : null; // Convertire la data di inizio in oggetto Date
  const endDateObj = endDate ? new Date(endDate) : null; // Convertire la data di fine in oggetto Date

  const hasStartOrEnd = startDateObj || endDateObj; // Controlla se almeno una delle date è definita

  let currentStatus = intl.formatMessage(messages.expiredDate); // Stato predefinito

  // Logica per determinare lo stato attuale
  if (startDateObj && endDateObj) {
    if (endDateObj < currentDate) {
      currentStatus = intl.formatMessage(messages.expiredDate);
    } else if (startDateObj > currentDate) {
      currentStatus = intl.formatMessage(messages.futureDate);
    } else {
      currentStatus = intl.formatMessage(messages.activeDate);
    }
  } else if (startDateObj) {
    currentStatus =
      startDateObj > currentDate
        ? intl.formatMessage(messages.futureDate)
        : intl.formatMessage(messages.activeDate);
  } else if (endDateObj) {
    currentStatus =
      endDateObj > currentDate
        ? intl.formatMessage(messages.activeDate)
        : intl.formatMessage(messages.expiredDate);
  }

  return (
    hasStartOrEnd && (
      <Container className="alert-info-dates">
        <Row>
          <p>{currentStatus}</p>
        </Row>
        <Row>
          <ul>
            {startDateObj && (
              <li>
                <p>
                  {intl.formatMessage(messages.startTitle)}{' '}
                  {startDateObj.toLocaleString()}{' '}
                </p>
              </li>
            )}
            {endDateObj && (
              <li>
                <p>
                  {intl.formatMessage(messages.endTitle)}{' '}
                  {endDateObj.toLocaleString()}
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
