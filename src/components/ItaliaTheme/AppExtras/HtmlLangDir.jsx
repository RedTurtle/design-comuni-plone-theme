/**
 * Sets lang and dir on <html> from the language of the content being viewed,
 * so pages written in another language (e.g. Arabic) are read and laid out
 * correctly on single-language sites.
 * It is an appExtra because AppExtras render after the header and the routes:
 * its Helmet wins over the ones in App and LanguageSelector.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-10-26
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Helmet } from '@plone/volto/helpers';
import { getPageLanguage } from 'design-comuni-plone-theme/helpers/contentLanguage';

const HtmlLangDir = () => {
  const { pathname } = useLocation();
  const { locale } = useIntl();
  const content = useSelector((state) => state.content.data);
  const { lang, dir } = getPageLanguage({ content, pathname, locale });

  return <Helmet htmlAttributes={{ lang, dir }} />;
};

export default HtmlLangDir;
