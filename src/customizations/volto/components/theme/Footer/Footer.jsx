/**
 * Footer component.
 * @module components/theme/Footer/Footer
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
import { useSiteLanguage } from 'design-comuni-plone-theme/helpers/contentLanguage';
/**
 * Footer component class.
 * @class Footer
 * @extends Component
 */

const Footer = () => {
  useGoogleAnalytics();
  // site chrome keeps the site language when the content is in another one
  const siteLanguage = useSiteLanguage();
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
        <div
          className="public-ui"
          id="customer-satisfaction-form"
          lang={siteLanguage.lang}
          dir={siteLanguage.dir}
        >
          <FeedbackForm />
        </div>
      )}

      <SubsiteFooter />
      <footer
        className="it-footer"
        id="footer"
        lang={siteLanguage.lang}
        dir={siteLanguage.dir}
      >
        <FooterMain />
        <FooterSmall />
      </footer>
    </>
  );
};

export default Footer;
