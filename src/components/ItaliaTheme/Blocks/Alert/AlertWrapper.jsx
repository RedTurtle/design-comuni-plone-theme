import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Container } from 'design-react-kit/dist/design-react-kit';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  expiredDate: {
    id: 'alert_expiredDate',
    defaultMessage: "Non visibile. E' scaduto il {date}.",
  },
  activeDate: {
    id: 'alert_activeDate',
    defaultMessage: 'Pubblicazione attiva.',
  },
  futureDate: {
    id: 'alert_futureDate',
    defaultMessage: 'Non visibile. Verà pubblicato il {date}',
  },
  errorDate: {
    id: 'alert_errorDate',
    defaultMessage:
      "Non visibile. C'è un errore sulle date: la data di scadenza è anteriore alla data d'inizio",
  },
  willExpire: {
    id: 'alert_willExpire',
    defaultMessage: 'Scadrà il {date}',
  },
});

const AlertWrapper = ({ data, children }) => {
  const intl = useIntl();
  const userLogged = useSelector((state) => state.userSession.token);

  const isActive = () => {
    const today = new Date().getTime();
    const start = data.startDate ? new Date(data.startDate).getTime() : 0;
    const end = data.endDate
      ? new Date(data.endDate).getTime()
      : Number.MAX_SAFE_INTEGER;

    const returnValue = { active: false, message: null };

    if (end < start) {
      returnValue.message = intl.formatMessage(messages.errorDate);
    } else if (today < start) {
      returnValue.message = intl.formatMessage(messages.futureDate, {
        date: new Date(data.startDate).toLocaleString(),
      });
      returnValue.active = false;
    } else if (today < end) {
      returnValue.message = intl.formatMessage(messages.activeDate);
      if (data.endDate) {
        returnValue.message +=
          ' ' +
          intl.formatMessage(messages.willExpire, {
            date: new Date(data.endDate).toLocaleString(),
          });
      }
      returnValue.active = true;
    } else {
      returnValue.message = intl.formatMessage(messages.expiredDate, {
        date: new Date(data.endDate).toLocaleString(),
      });
    }
    return returnValue;
  };

  const activeStatus = isActive();

  return (
    <>
      {(userLogged || activeStatus.active) && (
        <>
          {userLogged && (
            <Container className="alert-info-dates">
              <Row>
                <p className="alert-info-text">{activeStatus.message}</p>
              </Row>
            </Container>
          )}
          {children}
        </>
      )}
    </>
  );
};

export default AlertWrapper;
