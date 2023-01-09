import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import {
  RichText,
  RichTextSection,
  richTextHasContent,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const ServizioAccedi = ({ content }) => {
  const intl = useIntl();

  return richTextHasContent(content.canale_digitale) ||
    content.canale_digitale_link ||
    richTextHasContent(content.prenota_appuntamento) ? (
    <RichTextSection
      content={content.canale_digitale}
      tag_id="submit-request"
      title={intl.formatMessage(messages.canale_digitale)}
      hasBg
      p="4"
    >
      {content.canale_digitale_link && (
        <div className="font-serif mb-4">
          <p className="draftjs-buttons">
            <UniversalLink href={content.canale_digitale_link}>
              {intl.formatMessage(messages.canale_digitale_link)}
            </UniversalLink>
          </p>
        </div>
      )}
      <RichText content={content.prenota_appuntamento} />
    </RichTextSection>
  ) : null;
};

ServizioAccedi.propTypes = {
  content: PropTypes.shape({
    canale_digitale: PropTypes.object,
  }),
};

export default ServizioAccedi;

const messages = defineMessages({
  canale_digitale: {
    id: 'servizio_canale_digitale',
    defaultMessage: 'Accedi al servizio',
  },
  canale_digitale_link: {
    id: 'servizio_canale_digitale_link',
    defaultMessage: 'Richiedi iscrizione online',
  },
  prenota_appuntamento: {
    id: 'servizio_prenota_appuntamento',
    defaultMessage: 'Prenota appuntamento',
  },
});
