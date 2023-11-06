/**
 * Importante: (06/11/2023)
 * Component creato per essere possibile customizzare in modo più efficiente le traduzioni per lo status dei bandi.
 * Deve essere cancellato dopo l'aggiornamento di Volto
 */

import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  open: {
    id: 'bando_open',
    defaultMessage: 'attivo',
  },
  closed: {
    id: 'bando_closed',
    defaultMessage: 'scaduto',
  },
  inProgress: {
    id: 'bando_inProgress',
    defaultMessage: 'in corso',
  },
  scheduled: {
    id: 'bando_scheduled',
    defaultMessage: 'programmato',
  },
});

/**
 * BandoStatus view component class.
 * @function BandoStatus
 */

const BandoStatus = ({ content }) => {
  const intl = useIntl();
  return <>{intl.formatMessage(messages[content.bando_state[0]])}</>;
};

export default BandoStatus;
