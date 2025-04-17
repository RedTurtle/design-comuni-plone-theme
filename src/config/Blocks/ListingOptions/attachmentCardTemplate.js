import { defineMessages } from 'react-intl';

import { templatesOptions } from 'design-comuni-plone-theme/config/Blocks/ListingOptions';

const messages = defineMessages({
  show_description_attachment: {
    id: 'show_description_attachment',
    defaultMessage: 'Mostra la descrizione degli allegati',
  },
  show_pdf_preview: {
    id: 'show_pdf_preview',
    defaultMessage: 'Mostra i PDF in anteprima',
  },
  show_pdf_desc: {
    id: 'show_pdf_desc',
    defaultMessage:
      "Permette di aprire l'anteprima di tutti i PDF di questo elenco in una tab separata. Se non impostato, i PDF vengono scaricati.",
  },
});

export const addAttachmentCardTemplateOptions = (
  schema,
  formData,
  intl,
  position = 1,
) => {
  let pos = position;

  pos = templatesOptions(
    schema,
    formData,
    intl,
    ['show_description_attachment', 'show_pdf_preview'],
    {
      show_description_attachment: {
        default: false,
        label: intl.formatMessage(messages.show_description_attachment),
      },
      show_pdf_preview: {
        default: false,
        label: intl.formatMessage(messages.show_pdf_preview),
        description: intl.formatMessage(messages.show_pdf_desc),
      },
    },

    pos,
  );
  return pos;
};
