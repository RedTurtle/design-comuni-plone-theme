/*
CUSTOMIZATIONS:
- get defaultTitle and defaultParentSiteTitle from siteProperties
*/

import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from '@plone/volto/helpers';
import { SiteTitle } from 'volto-site-settings';
import { getSiteProperty } from 'design-comuni-plone-theme/helpers';

const SiteSettingsExtras = (props) => {
  const intl = useIntl();
  const siteTitle = SiteTitle({
    getValue: true,
    defaultTitle: getSiteProperty('siteTitle', intl.locale),
    defaultParentSiteTitle: getSiteProperty('parentSiteTitle', intl.locale),
  });

  return (
    <>
      <Helmet titleTemplate={`%s - ${siteTitle}`} />
    </>
  );
};
export default SiteSettingsExtras;
