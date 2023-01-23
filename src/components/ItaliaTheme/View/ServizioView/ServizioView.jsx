/**
 * ServizioView view component.
 * @module components/theme/View/ServizioView
 */

import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  SideMenu,
  PageHeader,
  ContentImage,
  ServizioPlaceholderAfterContent,
  ServizioPlaceholderAfterRelatedItems,
  RelatedItemInEvidence,
  SkipToMainContent,
  ServizioCosE,
  ServizioAccedi,
  ServizioAChiSiRivolge,
  ServizioComeFare,
  ServizioCosaServe,
  ServizioCosaSiOttiene,
  ServizioCostiVincoli,
  ServizioTempiScadenze,
  ServizioCasiParticolari,
  ServizioProcedure,
  ServizioContatti,
  ServizioAltriDocumenti,
  ServizioSitiEsterni,
  ServizioAllegati,
  ServizioModulistica,
  ServizioTrasparenza,
  ServizioCorrelati,
  ServizioUlterioriInformazioni,
  ServizioMetadati,
  ServizioCondizioni,
  ContentTypeViewSections,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

export const ServizioViewSectionsOrder = [
  {
    /* HEADER IMAGE */

    component: ContentImage,
    props: { position: 'documentBody' },
  },

  { /* A CHI È RIVOLTO */ component: ServizioAChiSiRivolge },

  { /* DESCRIZIONE */ component: ServizioCosE },

  { /* COME FARE */ component: ServizioComeFare },

  { /* COSA SERVE */ component: ServizioCosaServe },

  { /* COSA SI OTTIENE */ component: ServizioCosaSiOttiene },

  { /* TEMPI E SCADENZE */ component: ServizioTempiScadenze },

  { /* QUANTO COSTA */ component: ServizioCostiVincoli },

  { /* ?? CASI PARTICOLARI ?? */ component: ServizioCasiParticolari },

  { /* PROCEDURE ESITO */ component: ServizioProcedure },

  { /* ACCEDI AL SERVIZIO */ component: ServizioAccedi },

  { /* ULTERIORI INFORMAZIONI */ component: ServizioUlterioriInformazioni },

  { /* ?? ALTRI DOCUMENTI ?? */ component: ServizioAltriDocumenti },

  { /* ?? SITI ESTERNI ?? */ component: ServizioSitiEsterni },

  { /* ?? ALLEGATI ?? */ component: ServizioAllegati },

  { /* ?? MODULISTICA ?? */ component: ServizioModulistica },

  { /* CONDIZIONI DI SERVIZIO */ component: ServizioCondizioni },

  { /* CONTATTI */ component: ServizioContatti },

  { /* ?? TRASPARENZA ?? */ component: ServizioTrasparenza },

  { /* ?? CORRELATI ??  */ component: ServizioCorrelati },

  { /* ULTIMO AGGIORNAMENTO  */ component: ServizioMetadati },
];

/**
 * ServizioView view component class.
 * @function ServizioView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ServizioView = ({ content }) => {
  let documentBody = createRef();
  const [sideMenuElements, setSideMenuElements] = useState(null);
  useEffect(() => {
    if (documentBody.current) {
      if (__CLIENT__) {
        setSideMenuElements(documentBody.current);
      }
    }
  }, [documentBody]);

  return (
    <>
      <div className="container px-4 my-4 servizio-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          showdates={false}
          showtassonomiaargomenti={true}
        />
        {/* HEADER IMAGE */}
        <ContentImage content={content} position="afterHeader" />

        <div className="row border-top row-column-border row-column-menu-left">
          <aside className="col-lg-4 ">
            <SideMenu data={sideMenuElements} content_uid={content?.UID} />
          </aside>
          <section
            id="main-content-section"
            className="col-lg-8 it-page-sections-container"
            ref={documentBody}
          >
            {/* SEZIONI */}
            <ContentTypeViewSections
              content={content}
              defaultSections={ServizioViewSectionsOrder}
            />
          </section>
        </div>
      </div>
      <ServizioPlaceholderAfterContent content={content} />
      <RelatedItemInEvidence content={content} />
      <ServizioPlaceholderAfterRelatedItems content={content} />
    </>
  );
};

ServizioView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    tassonomia_argomenti: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        token: PropTypes.string,
      }),
    ),
    stato_servizio: PropTypes.bool,
    motivo_stato_servizio: PropTypes.shape({
      data: PropTypes.string,
    }),
    descrizione_estesa: PropTypes.shape({
      data: PropTypes.string,
    }),
    a_chi_si_rivolge: PropTypes.shape({
      data: PropTypes.string,
    }),
    chi_puo_presentare: PropTypes.shape({
      data: PropTypes.string,
    }),
    copertura_geografica: PropTypes.shape({
      data: PropTypes.string,
    }),
    come_si_fa: PropTypes.shape({
      data: PropTypes.string,
    }),
    cosa_si_ottiene: PropTypes.shape({
      data: PropTypes.string,
    }),
    procedure_collegate: PropTypes.shape({
      data: PropTypes.string,
    }),
    canale_digitale: PropTypes.shape({
      data: PropTypes.string,
    }),
    autenticazione: PropTypes.shape({
      data: PropTypes.string,
    }),
    dove_rivolgersi_extra: PropTypes.shape({
      data: PropTypes.string,
    }),
    prenota_appuntamento: PropTypes.shape({
      data: PropTypes.string,
    }),
    cosa_serve: PropTypes.shape({
      data: PropTypes.string,
    }),
    costi: PropTypes.shape({
      data: PropTypes.string,
    }),
    vincoli: PropTypes.shape({
      data: PropTypes.string,
    }),
    tempi_e_scadenze: PropTypes.shape({
      data: PropTypes.string,
    }),
    casi_particolari: PropTypes.shape({
      data: PropTypes.string,
    }),
    ufficio_responsabile: PropTypes.array.isRequired,
    area: PropTypes.array.isRequired,
    link_siti_esterni: PropTypes.shape({
      data: PropTypes.string,
    }),
    ulteriori_informazioni: PropTypes.shape({
      data: PropTypes.string,
    }),
  }),
};

export default ServizioView;
