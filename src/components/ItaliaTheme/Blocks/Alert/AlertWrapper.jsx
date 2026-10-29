/**
 * Alert block validity period (startDate / endDate).
 * Hides the alert outside its validity period and tells editors whether it is
 * scheduled, active, expired or has wrong dates. Ported from the v2 branch
 * (#795), keeping the same block fields; alerts without dates render as before
 * and the status is shown only to users who can edit the page.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-10-27
 */

import React from 'react';
import { useSelector } from 'react-redux';
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
    defaultMessage: 'Non visibile. Verrà pubblicato il {date}.',
  },
  errorDate: {
    id: 'alert_errorDate',
    defaultMessage:
      "Non visibile. C'è un errore sulle date: la data di scadenza è anteriore alla data d'inizio.",
  },
  willExpire: {
    id: 'alert_willExpire',
    defaultMessage: 'Scadrà il {date}.',
  },
});

const toTime = (value, fallback) =>
  value ? new Date(value).getTime() : fallback;

export const getAlertValidity = (data, now = Date.now()) => {
  const start = toTime(data.startDate, -Infinity);
  const end = toTime(data.endDate, Infinity);

  if (end < start) return 'error';
  if (now < start) return 'future';
  if (now >= end) return 'expired';
  return 'active';
};

const formatDate = (intl, value) =>
  intl.formatDate(value, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const getStatusMessage = (intl, status, data) => {
  switch (status) {
    case 'error':
      return intl.formatMessage(messages.errorDate);
    case 'future':
      return intl.formatMessage(messages.futureDate, {
        date: formatDate(intl, data.startDate),
      });
    case 'expired':
      return intl.formatMessage(messages.expiredDate, {
        date: formatDate(intl, data.endDate),
      });
    default: {
      const active = intl.formatMessage(messages.activeDate);
      return data.endDate
        ? `${active} ${intl.formatMessage(messages.willExpire, {
            date: formatDate(intl, data.endDate),
          })}`
        : active;
    }
  }
};

const AlertWrapper = ({ data, isEditMode = false, children }) => {
  const intl = useIntl();
  // Any logged user would be too broad: sites with citizen login have
  // authenticated users who must not see expired or scheduled alerts.
  const canEdit = useSelector((state) =>
    Boolean(
      state.actions?.actions?.object?.some((action) => action.id === 'edit'),
    ),
  );

  if (!data.startDate && !data.endDate) return children;

  const status = getAlertValidity(data);
  const showStatus = isEditMode || canEdit;

  if (status !== 'active' && !showStatus) return null;

  return (
    <>
      {showStatus && (
        <p className="alert-info-dates">
          {getStatusMessage(intl, status, data)}
        </p>
      )}
      {children}
    </>
  );
};

export default AlertWrapper;
