import { defineMessages } from 'react-intl';

const messages = defineMessages({
  approfondisci: {
    id: 'approfondisci',
    defaultMessage: 'Approfondisci:',
  },
});

const ARIA_LABEL_MAX_LENGTH = 80;

export const getReadMoreAriaLabel = (intl, title) => {
  if (!title) return undefined;
  const truncated =
    title.length > ARIA_LABEL_MAX_LENGTH
      ? title.slice(0, ARIA_LABEL_MAX_LENGTH) + '…'
      : title;
  return intl.formatMessage(messages.approfondisci) + ' ' + truncated;
};
