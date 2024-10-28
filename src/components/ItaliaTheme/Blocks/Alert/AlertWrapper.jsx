import React from 'react';
import { useSelector } from 'react-redux';
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
  errorDate: {
    id: 'errorDate',
    defaultMessage: "Data di scadenza anteriore a data d'inizio",
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
      returnValue.active = false;
    } else if (today < start) {
      returnValue.message = intl.formatMessage(messages.futureDate);
      returnValue.active = false;
    } else if (today < end) {
      returnValue.message = intl.formatMessage(messages.activeDate);
      returnValue.active = true;
    } else {
      returnValue.message = intl.formatMessage(messages.expiredDate);
      returnValue.active = false;
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
                <p>{activeStatus.message}</p>
              </Row>
              <Row>
                <ul>
                  {data.startDate && (
                    <li>
                      <p>
                        {intl.formatMessage(messages.startTitle)}{' '}
                        {new Date(data.startDate).toLocaleString()}
                      </p>
                    </li>
                  )}
                  {data.endDate && (
                    <li>
                      <p>
                        {intl.formatMessage(messages.endTitle)}{' '}
                        {new Date(data.endDate).toLocaleString()}
                      </p>
                    </li>
                  )}
                </ul>
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
