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

const Dates = ({ startDate, endDate, ...props }) => {
  const currentDate = new Date();
  const intl = useIntl();

  const startDateObj = startDate ? new Date(startDate) : null; // reset startDate
  const endDateObj = endDate ? new Date(endDate) : null; // reset endDate

  const hasStartOrEnd = startDateObj || endDateObj;
  const isStartAfterCurrent = startDateObj && startDateObj > currentDate;
  const isEndAfterCurrent = endDateObj && endDateObj > currentDate;
  const isCurrentBetweenStartAndEnd =
    startDateObj &&
    endDateObj &&
    currentDate >= startDateObj &&
    currentDate <= endDateObj;

  const currentStatus =
    startDateObj && !endDateObj // Se solo startDate è definito
      ? isStartAfterCurrent
        ? intl.formatMessage(messages.futureDate)
        : intl.formatMessage(messages.activeDate) // Solo startDate è definito
      : isCurrentBetweenStartAndEnd
      ? intl.formatMessage(messages.activeDate) // Dentro l'intervallo di date
      : isEndAfterCurrent
      ? intl.formatMessage(messages.activeDate) // A data di fine è già passata
      : intl.formatMessage(messages.expiredDate); // Se non rientra in nessuna delle altre condizioni

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
                  {intl.formatMessage(messages.startTitle) +
                    ' ' +
                    startDateObj.toLocaleString()}
                </p>
              </li>
            )}
            {endDateObj && (
              <li>
                <p>
                  {intl.formatMessage(messages.endTitle) +
                    ' ' +
                    endDateObj.toLocaleString()}
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
