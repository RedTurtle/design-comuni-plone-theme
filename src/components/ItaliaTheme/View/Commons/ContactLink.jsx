import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  telefono: {
    id: 'telefono',
    defaultMessage: 'Tel',
  },
  fax: {
    id: 'fax',
    defaultMessage: 'Fax',
  },
  email_label: {
    id: 'email_label',
    defaultMessage: 'E-mail',
  },
  call: {
    id: 'chiama_il_numero',
    defaultMessage: 'Chiama il numero',
  },
  call_fax: {
    id: 'chiama_il_numero_fax',
    defaultMessage: 'Contatta il numero di fax',
  },
  write_to: {
    id: 'scrivi_a_mail',
    defaultMessage: "Scrivi all'indirizzo",
  },
});

const ContactLink = ({ tel, fax, email, label = true, strong = false }) => {
  const intl = useIntl();

  const formatTel = (str, type) =>
    str
      .split(/((?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d+)/gm)
      .map((v, i) =>
        i % 2 === 0 ? (
          <span key={i}>{` ${v} `}</span>
        ) : (
          <a
            key={i}
            href={`${type}:${v}`}
            title={
              type === 'tel'
                ? intl.formatMessage(messages.call)
                : intl.formatMessage(messages.call_fax)
            }
          >
            {v}
          </a>
        ),
      );

  const formatEmail = (str) =>
    str
      .split(/([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
      .map((v, i) =>
        i % 2 === 0 ? (
          <span key={i}>{` ${v} `}</span>
        ) : (
          <a
            key={i}
            href={`mailto:${v}`}
            title={intl.formatMessage(messages.write_to)}
          >
            {v}
          </a>
        ),
      );

  if (tel) {
    return (
      <>
        {label &&
          (strong ? (
            <strong>{intl.formatMessage(messages.telefono)}</strong>
          ) : (
            intl.formatMessage(messages.telefono)
          ))}
        {formatTel(tel, 'tel')}
      </>
    );
  } else if (fax) {
    return (
      <>
        {label &&
          (strong ? (
            <strong>{intl.formatMessage(messages.fax)}</strong>
          ) : (
            intl.formatMessage(messages.fax)
          ))}
        {formatTel(fax, 'fax')}
      </>
    );
  } else if (email) {
    return (
      <>
        {label &&
          (strong ? (
            <strong>{intl.formatMessage(messages.email_label)}</strong>
          ) : (
            intl.formatMessage(messages.email_label)
          ))}
        {formatEmail(email)}
      </>
    );
  } else {
    return null;
  }
};

ContactLink.propTypes = {
  tel: PropTypes.string,
  fax: PropTypes.string,
  email: PropTypes.string,
  label: PropTypes.bool,
  strong: PropTypes.bool,
};

export default ContactLink;
