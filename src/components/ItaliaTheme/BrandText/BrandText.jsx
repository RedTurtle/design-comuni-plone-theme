import React from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import { SiteTitle } from 'volto-site-settings';
import { getSiteProperty } from 'design-comuni-plone-theme/helpers';

const BrandText = ({ mobile = false, subsite }) => {
  //TODO: rimuovere subsite quando si legge anche la description da volto-site-settings
  const intl = useIntl();
  const title = SiteTitle({
    defaultTitle: getSiteProperty('siteTitle', intl.locale),
    defaultParentSiteTitle: getSiteProperty('parentSiteTitle', intl.locale),
  });

  const description =
    subsite?.description || getSiteProperty('siteSubtitle', intl.locale);

  return (
    <div className="it-brand-text">
      {title && <div className="it-brand-title">{title}</div>}
      {description && (
        <div
          className={cx('it-brand-tagline', { 'd-none d-md-block': !mobile })}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default BrandText;
