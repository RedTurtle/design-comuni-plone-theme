import { defineMessages } from 'react-intl';

import { templatesOptions } from 'design-comuni-plone-theme/config/Blocks/ListingOptions';

const messages = defineMessages({
  show_ente: {
    id: 'show_ente',
    defaultMessage: "Mostra l'ente",
  },
  show_tipologia: {
    id: 'show_tipologia',
    defaultMessage: 'Mostra la tipologia',
  },
  show_data_ultima_modifica: {
    id: 'show_data_ultima_modifica',
    defaultMessage: 'Mostra la data di ultima modifica',
  },
  show_note: {
    id: 'show_note',
    defaultMessage: 'Mostra le note anche per i bandi scaduti',
  },
});

export const addBandiInEvidenceTemplateOptions = (
  schema,
  formData,
  intl,
  position = 0,
) => {
  let pos = position;

  pos = templatesOptions(
    schema,
    formData,
    intl,
    ['show_description', 'show_ente', 'show_tipologia', 'show_data_ultima_modifica', 'show_note'],
    {
      show_ente: {
        default: false,
        label: intl.formatMessage(messages.show_ente),
      },
      show_tipologia: {
        default: false,
        label: intl.formatMessage(messages.show_tipologia),
      },
      show_data_ultima_modifica: {
        default: false,
        label: intl.formatMessage(messages.show_data_ultima_modifica),
      },
      show_note: {
        default: false,
        label: intl.formatMessage(messages.show_note),
      },
    },
    pos,
  );
  return pos;
};
