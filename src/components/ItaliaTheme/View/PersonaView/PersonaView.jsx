/**
 * PersonaView view component.
 * @module components/theme/View/PersonaView
 */

import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import {
  PageHeader,
  RelatedItems,
  PersonaRuolo,
  PersonaContatti,
  PersonaDocumenti,
  PersonaUlterioriInformazioni,
  PersonaPlaceholderAfterContent,
  PersonaPlaceholderAfterRelatedItems,
  RelatedItemInEvidence,
  SkipToMainContent,
  ContentTypeViewSections,
  useSideMenu,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  sideMenuIndex: {
    id: 'sideMenuIndex',
    defaultMessage: 'Indice della pagina',
  },
  personaContent: {
    id: 'personaContent',
    defaultMessage: 'Contenuto del profilo della persona',
  },
});

export const PersonaViewSectionsOrder = [
  { /* RUOLO */ component: PersonaRuolo },
  { /* CONTATTI */ component: PersonaContatti },
  { /* DOCUMENTI */ component: PersonaDocumenti },
  { /* ULTERIORI INFORMAZIONI */ component: PersonaUlterioriInformazioni },
];

/**
 * PersonaView view component class.
 * @function PersonaView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const PersonaView = ({ content }) => {
  let documentBody = createRef();
  const intl = useIntl();
  const { sideMenuElements, SideMenu } = useSideMenu(content, documentBody);

  return (
    <>
      <div className="container px-4 my-4 persona-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          imageinheader={!!content.foto_persona}
          imageinheader_field={'foto_persona'}
          showdates={false}
          showtassonomiaargomenti={true}
        />
        <div className="row row-column-border border-light row-column-menu-left">
          <aside
            className="col-lg-4"
            aria-label={intl.formatMessage(messages.sideMenuIndex)}
          >
            <SideMenu data={sideMenuElements} content_uid={content?.UID} />
          </aside>
          <section
            className="col-lg-8 it-page-sections-container border-light"
            id="main-content-section"
            ref={documentBody}
            role="region"
            aria-label={intl.formatMessage(messages.personaContent)}
          >
            {/* SEZIONI */}
            <ContentTypeViewSections
              content={content}
              defaultSections={PersonaViewSectionsOrder}
            />
          </section>
        </div>
      </div>
      <PersonaPlaceholderAfterContent content={content} />
      <RelatedItems content={content} />
      <RelatedItemInEvidence content={content} />
      <PersonaPlaceholderAfterRelatedItems content={content} />
    </>
  );
};

// TODO: items
PersonaView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    atto_nomina: PropTypes.shape({
      download: PropTypes.string,
      filename: PropTypes.string,
    }),
    biografia: PropTypes.shape({
      data: PropTypes.string,
    }),
    collegamenti_organizzazione_l1: PropTypes.array,
    collegamenti_organizzazione_l2: PropTypes.array,
    competenze: PropTypes.shape({
      data: PropTypes.string,
    }),
    curriculum_vitae: PropTypes.shape({
      download: PropTypes.string,
      filename: PropTypes.string,
    }),
    data_conclusione_incarico: PropTypes.string,
    data_insediamento: PropTypes.string,
    deleghe: PropTypes.shape({
      data: PropTypes.string,
    }),
    description: PropTypes.string,
    email: PropTypes.array,
    foto_persona: PropTypes.shape({
      scales: PropTypes.shape({
        preview: PropTypes.shape({
          download: PropTypes.string,
        }),
      }),
    }),
    informazioni_di_contatto: PropTypes.shape({
      data: PropTypes.string,
    }),
    organizzazione_riferimento: PropTypes.array.isRequired,
    responsabile_di: PropTypes.array,
    telefono: PropTypes.array,
    ulteriori_informazioni: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default PersonaView;
