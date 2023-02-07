/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { useGoogleAnalytics } from 'volto-google-analytics';
import { Container } from 'design-react-kit';

import {
  FooterMain,
  FooterSmall,
  SubsiteFooter,
} from 'design-comuni-plone-theme/components/ItaliaTheme/';

import { FeedbackForm as CustomerSatisfaction } from 'design-comuni-plone-theme/components/ItaliaTheme';
import config from '@plone/volto/registry';
/**
 * Footer component class.
 * @class Footer
 * @extends Component
 */

const Footer = ({ intl }) => {
  useGoogleAnalytics();
  const currentContent = useSelector((state) => state.content?.data);
  let contentType = null;
  if (currentContent != null) {
    contentType = currentContent?.['@type'];
  }
  const NoCustomerSatisfactionFor = ['Plone Site', 'LRF', 'Subsite'];

  let content = (
    <>
      {contentType != null &&
        NoCustomerSatisfactionFor.indexOf(contentType) < 0 &&
        config.settings.siteProperties.enableCustomerSatisfaction && (
          <CustomerSatisfaction />
        )}

      <SubsiteFooter />
      <footer className="it-footer" id="footer">
        <FooterMain />
        <FooterSmall />
      </footer>
    </>
  );

  return content;
};

export default Footer;
