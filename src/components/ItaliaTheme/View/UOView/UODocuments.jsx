import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  Attachments,
  Attachment,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { Row } from 'design-react-kit';

const messages = defineMessages({
  documenti: {
    id: 'uo_documenti',
    defaultMessage: 'Documenti',
  },
  documenti_pubblici: {
    id: 'uo_documenti_pubblici',
    defaultMessage: 'Documenti Pubblici',
  },
});

const UODocuments = ({ content }) => {
  const intl = useIntl();

  return (
    <article id="allegati" className="it-page-section anchor-offset pt-5 mb-5">
      <Attachments
        content={content}
        folder_name={'allegati'}
        as_section={false}
        title={intl.formatMessage(messages.documenti)}
      />
      {content?.documenti_pubblici && (
        <Row className="card-wrapper card-teaser-wrapper documenti-pubblici">
          {content?.documenti_pubblici?.map((dp, i) => (
            <>
              <h5>{intl.formatMessage(messages.documenti_pubblici)}</h5>
              <Attachment {...dp} download_url={dp?.['@id']} key={dp['@id']} />
            </>
          ))}
        </Row>
      )}
    </article>
  );
};

export default UODocuments;
