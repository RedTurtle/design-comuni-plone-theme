/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/theme/Footer/Footer.jsx
 *
 * CUSTOMIZATIONS:
 * - Completely replaced the default semantic-ui based footer markup (Segment/List with
 *   Plone copyright notice and site_actions list) with the design-comuni-plone-theme
 *   ItaliaTheme footer components: FooterMain, FooterSmall and SubsiteFooter.
 * - Added conditional rendering of ContactsBlock, controlled by
 *   config.settings.siteProperties.enableContactsBlock.
 * - Added conditional rendering of FeedbackForm (customer satisfaction form), controlled
 *   by config.settings.siteProperties.enableFeedbackForm /
 *   enableNoFeedbackFormFor / noFeedbackFormFor based on the current content type.
 * - Added a useGoogleAnalytics() call (from the volto-google-analytics package).
 * - Dropped intl usage (injectIntl/FormattedMessage) and propTypes, no longer needed
 *   since the upstream copyright/license text and site actions list were removed.
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { useGoogleAnalytics } from 'volto-google-analytics';

import {
  FooterMain,
  FooterSmall,
  SubsiteFooter,
} from 'design-comuni-plone-theme/components/ItaliaTheme/';

import {
  FeedbackForm,
  ContactsBlock,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import config from '@plone/volto/registry';
/**
 * Footer component class.
 * @class Footer
 * @extends Component
 */

const Footer = () => {
  useGoogleAnalytics();
  const currentContent = useSelector((state) => state.content?.data);
  const contentType = currentContent ? currentContent['@type'] : null;
  const noFeedbackFormFor =
    config.settings.siteProperties.noFeedbackFormFor || [];
  const showFeedbackForm = config.settings.siteProperties
    .enableNoFeedbackFormFor
    ? contentType &&
      !noFeedbackFormFor.includes(contentType) &&
      config.settings.siteProperties.enableFeedbackForm
    : true;

  const showContactsBlock = config.settings.siteProperties.enableContactsBlock;

  return (
    <>
      {showContactsBlock && <ContactsBlock />}
      {showFeedbackForm && (
        <div className="public-ui" id="customer-satisfaction-form">
          <FeedbackForm />
        </div>
      )}

      <SubsiteFooter />
      <footer className="it-footer" id="footer">
        <FooterMain />
        <FooterSmall />
      </footer>
    </>
  );
};

export default Footer;
