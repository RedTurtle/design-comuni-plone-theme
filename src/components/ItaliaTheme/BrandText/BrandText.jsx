import React from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import { SiteProperty } from 'volto-site-settings';
import { getSiteProperty } from 'design-comuni-plone-theme/helpers';

const BrandText = ({ mobile = false }) => {
  const intl = useIntl();
  let title = SiteProperty({
    property: 'site_title',
    defaultValue: getSiteProperty('siteTitle', intl.locale),
    getValue: true,
    getParent: false,
  });

  const description = SiteProperty({
    property: 'site_subtitle',
    defaultValue: getSiteProperty('siteSubtitle', intl.locale),
    getValue: true,
    getParent: false,
  });
  const titleSplit = title?.split('\n') ?? null;
  title = titleSplit?.map((t, i) => (
    <React.Fragment key={i}>
      {t}
      {i < titleSplit.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="it-brand-text">
      {title && <div className="it-brand-title h2">{title}</div>}
      {description && (
        <div
          className={cx('it-brand-tagline h3', {
            'd-none d-md-block': !mobile,
          })}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default BrandText;
