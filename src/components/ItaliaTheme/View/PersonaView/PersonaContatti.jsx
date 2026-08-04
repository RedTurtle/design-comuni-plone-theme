import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  RichTextSection,
  ContactsCard,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  contacts: {
    id: 'contacts',
    defaultMessage: 'Contatti',
  },
});

const PersonaContatti = ({ content }) => {
  const intl = useIntl();

  const contacts = (content?.contact_info ?? []).filter(
    (contact) => contact?.value_punto_contatto?.length > 0,
  );

  return contacts.length > 0 ? (
    <RichTextSection
      title={intl.formatMessage(messages.contacts)}
      tag_id="contacts"
    >
      {contacts.map((contact) => (
        <ContactsCard contact={contact} key={contact['@id']} />
      ))}
    </RichTextSection>
  ) : null;
};

export default PersonaContatti;
