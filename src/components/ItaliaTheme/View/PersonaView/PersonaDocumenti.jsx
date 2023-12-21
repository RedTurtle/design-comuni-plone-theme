import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  RichTextArticle,
  Attachment,
  Attachments,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

import { contentFolderHasItems } from 'design-comuni-plone-theme/helpers';

const messages = defineMessages({
  documenti: {
    id: 'documenti',
    defaultMessage: 'Documenti',
  },
  curriculum_vitae: {
    id: 'curriculum_vitae',
    defaultMessage: 'Curriculum vitae',
  },
  compensi: {
    id: 'compensi',
    defaultMessage: 'Compensi',
  },
  importi_di_viaggio_e_o_servizi: {
    id: 'importi_di_viaggio_e_o_servizi',
    defaultMessage: 'Importi di viaggio e/o servizi',
  },
  altre_cariche: {
    id: 'altre_cariche',
    defaultMessage: 'Altre cariche',
  },
  atto_nomina: {
    id: 'atto_nomina',
    defaultMessage: 'Atto di nomina',
  },
  situazione_patrimoniale: {
    id: 'situazione_patrimoniale',
    defaultMessage: 'Situazione patrimoniale',
  },

  dichiarazione_dei_redditi: {
    id: 'dichiarazione_dei_redditi',
    defaultMessage: 'Dichiarazione dei redditi',
  },

  spese_elettorali: {
    id: 'spese_elettorali',
    defaultMessage: 'Spese elettorali',
  },
  variazione_situazione_patrimoniale: {
    id: 'variazione_situazione_patrimoniale',
    defaultMessage: 'Variazione situazione patrimoniale',
  },
});

const PersonaDocumenti = ({ content }) => {
  const intl = useIntl();
  const default_content_folders = [
    'curriculum-vitae',
    'compensi',
    'importi-di-viaggio-e-o-servizi',
    'altre-cariche',
    'situazione-patrimoniale',
    'dichiarazione-dei-redditi',
    'spese-elettorali',
    'variazione-situazione-patrimoniale',
  ];

  const other_folders = content.items.filter(
    (i) =>
      default_content_folders.indexOf(i.id) < 0 &&
      i.id !== 'foto-e-attivita-politica' &&
      (i['@type'] === 'Document' || i['@type'] === 'Folder') &&
      contentFolderHasItems(content, i.id),
  );

  const showSection =
    content?.curriculum_vitae?.download ||
    content.atto_nomina?.download ||
    default_content_folders.filter((f) => contentFolderHasItems(content, f))
      .length > 0 ||
    other_folders.length > 0;

  return showSection ? (
    <RichTextArticle
      title={intl.formatMessage(messages.documenti)}
      tag_id="documenti"
    >
      {(content.curriculum_vitae?.download ||
        contentFolderHasItems(content, 'curriculum-vitae')) && (
        <div className="mb-5 mt-3">
          <h5>{intl.formatMessage(messages.curriculum_vitae)}</h5>
          <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
            {content.curriculum_vitae?.download && (
              <Attachment
                download_url={content.curriculum_vitae.download}
                title={content.curriculum_vitae.filename}
                item={content.curriculum_vitae}
              />
            )}
          </div>
          {contentFolderHasItems(content, 'curriculum-vitae') && (
            <Attachments
              content={content}
              folder_name={'curriculum-vitae'}
              as_article={false}
            />
          )}
        </div>
      )}

      <Attachments
        content={content}
        folder_name={'compensi'}
        title={intl.formatMessage(messages.compensi)}
        as_article={false}
      />

      <Attachments
        content={content}
        folder_name={'importi-di-viaggio-e-o-servizi'}
        title={intl.formatMessage(messages.importi_di_viaggio_e_o_servizi)}
        as_article={false}
      />

      <Attachments
        content={content}
        folder_name={'altre-cariche'}
        title={intl.formatMessage(messages.altre_cariche)}
        as_article={false}
      />

      {content.atto_nomina?.download && (
        <div className="mb-5 mt-3">
          <h5>{intl.formatMessage(messages.atto_nomina)}</h5>
          <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
            <Attachment
              download_url={content.atto_nomina.download}
              title={content.atto_nomina.filename}
            />
          </div>
        </div>
      )}

      <Attachments
        content={content}
        folder_name={'situazione-patrimoniale'}
        title={intl.formatMessage(messages.situazione_patrimoniale)}
        as_article={false}
      />

      <Attachments
        content={content}
        folder_name={'dichiarazione-dei-redditi'}
        title={intl.formatMessage(messages.dichiarazione_dei_redditi)}
        as_article={false}
      />

      <Attachments
        content={content}
        folder_name={'spese-elettorali'}
        title={intl.formatMessage(messages.spese_elettorali)}
        as_article={false}
      />

      <Attachments
        content={content}
        folder_name={'variazione-situazione-patrimoniale'}
        title={intl.formatMessage(messages.variazione_situazione_patrimoniale)}
        as_article={false}
      />

      {other_folders.map((f) => (
        <Attachments
          content={content}
          folder_name={f.id}
          title={f.title}
          as_article={false}
        />
      ))}
    </RichTextArticle>
  ) : (
    <></>
  );
};

export default PersonaDocumenti;
