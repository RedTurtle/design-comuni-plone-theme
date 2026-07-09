/*
 * UniversalLink
 * @module components/UniversalLink
 *
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/manage/UniversalLink/UniversalLink.tsx
 *
 * CUSTOMIZATIONS:
 * - upstream ha convertito questo componente in TypeScript (UniversalLink.tsx), estraendo la funzione getUrl() e aggiungendo un hook di test (__test.renderCounter); questo file resta in JSX e non adotta la tipizzazione TS né l'estrazione di getUrl(), per preservare la logica custom sotto (enhance link, externalRoutes blacklisted, icona esterna, ecc.) senza un riscrittura completa
 * - aggiunto ref forwarding tramite React.forwardRef + React.memo (come upstream), per permettere ai chiamanti di ottenere un ref sull'elemento renderizzato; nessun cambio di comportamento visibile
 * - aggiunto icona per link esterni (icona it-external-link, mostrata se markSpecialLinks è abilitato e overrideMarkSpecialLinks è false)
 * - aggiunto title informativo per link esterni
 * - il comportamento di apertura in nuova tab dei link esterni ora segue config.settings.openExternalLinkInNewTab quando openLinkInNewTab non è esplicitamente impostato (in origine si apriva sempre in una nuova tab)
 * - rimossa la classe CSS "external" applicata di default ai link esterni, sostituita dalla classe condizionale "with-external-link-icon"
 * - aggiunta la dimensione del file se il link punta a un file (enhanced_link_infos)
 * - aggiunto il parametro hideFileFormat per nascondere il formato del file dall'enhance link
 * - aggiunta la condizione su @@display-file e @download-file per gestire i casi in cui questi parametri vengono imposti a monte
 * - aggiunta classe matomo_download sui link ai file
 * - aggiunto il supporto per le externalRoutes "blacklisted" (config.settings.externalRoutes) che forzano un url a essere trattato come link esterno
 * - aggiunto il calcolo di aria-label da props['aria-label'] o item.title, applicato a tutti i tag generati
 * - rimossa la gestione speciale di item['@id'] === '' che restituiva config.settings.publicURL (ora un '@id' vuoto genera l'errore "Invalid item" e usa url='#')
 */

import {
  URLUtils,
  flattenToAppURL,
  isInternalURL,
} from '@plone/volto/helpers/Url/Url';
import { defineMessages, useIntl } from 'react-intl';

import { EnhanceLink } from 'design-comuni-plone-theme/helpers';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { HashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import React from 'react';
import config from '@plone/volto/registry';
import cx from 'classnames';
import { matchPath } from 'react-router';
import { useSelector } from 'react-redux';

const messages = defineMessages({
  opensInNewTab: {
    id: 'opensInNewTab',
    defaultMessage: 'Apre in un nuovo tab',
  },
});
const UniversalLink = React.memo(
  React.forwardRef(function UniversalLink(
    {
      href,
      item = null,
      openLinkInNewTab,
      download = false,
      children,
      className = null,
      title = null,
      overrideMarkSpecialLinks = false,
      hideFileFormat = false,
      ...props
    },
    ref,
  ) {
  let translations = {
    opensInNewTab: {
      defaultMessage: messages.opensInNewTab.defaultMessage,
    },
  };
  //questo perchè il provider di intl non è sempre definito, ad esempio in slate_wysiwyg_box (Slate RichTextWidget)
  let intl = null;

  try {
    intl = useIntl();
    Object.keys(translations).forEach(
      (k) => (translations[k].message = intl.formatMessage(messages[k])),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Cannot use intl here. View default messages.', e);
  }
  const token = useSelector((state) => state.userSession?.token);
  const { openExternalLinkInNewTab } = config.settings;

  let url = href;
  let enhanced_link_infos = null;

  if (!href && item) {
    if (!item['@id']) {
      // eslint-disable-next-line no-console
      console.error(
        'Invalid item passed to UniversalLink',
        item,
        props,
        children,
      );
      url = '#';
    } else {
      //case: generic item
      url = flattenToAppURL(item['@id']);

      //case: item like a Link
      let remoteUrl = item.remoteUrl || item.getRemoteUrl;
      if (!token && remoteUrl) {
        url = remoteUrl;
      }

      //case: item of type 'File'
      if (!url.includes('@@download') && !url.includes('@@display-file')) {
        //se non è gia stato aggiunto il suffisso per il download nell'@id dell'item
        if (
          !token &&
          config.settings.downloadableObjects.includes(item['@type'])
        ) {
          url = `${url}/@@download/file`;
        }

        if (
          !token &&
          config.settings.viewableInBrowserObjects.includes(item['@type'])
        ) {
          url = `${url}/@@display-file/file`;
        }
      }
    }
  }

  if (item && item['@id']) {
    /*enhance link*/
    if (item && item.enhanced_links_enabled) {
      enhanced_link_infos = { ...item };
      if (!enhanced_link_infos.filename) {
        enhanced_link_infos.filename = item['@id'];
      }
    }
  }

  const isBlacklisted =
    (config.settings.externalRoutes ?? []).find((route) =>
      matchPath(flattenToAppURL(url), route.match),
    )?.length > 0;
  const isExternal = !isInternalURL(url) || isBlacklisted;
  const isDownload = (!isExternal && url.includes('@@download')) || download;
  const isDisplayFile =
    (!isExternal && url.includes('@@display-file')) || false;

  const checkedURL = URLUtils.checkAndNormalizeUrl(url);
  url = checkedURL.url;

  let aria_label = props['aria-label'] ?? item?.title ?? null;
  let enhanced_link = null;
  let extended_children = <></>;

  if (enhanced_link_infos) {
    enhanced_link = EnhanceLink({ enhanced_link_infos, aria_label });
    extended_children = enhanced_link.children;
    aria_label = enhanced_link.aria_label;
  }
  const showExternalIcon =
    !overrideMarkSpecialLinks &&
    config.settings.siteProperties.markSpecialLinks;
  let tag = (
    <Link
      to={flattenToAppURL(url)}
      target={openLinkInNewTab ?? false ? '_blank' : null}
      title={title}
      className={className}
      smooth={config.settings.hashLinkSmoothScroll}
      {...props}
      aria-label={aria_label}
      ref={ref}
    >
      {children}
      {extended_children}
    </Link>
  );

  if (isExternal) {
    const openInNewTab =
      openLinkInNewTab === null || openLinkInNewTab === undefined
        ? openExternalLinkInNewTab
        : openLinkInNewTab;

    tag = (
      <a
        href={url}
        title={`${title ? title + ' - ' : ''}${
          translations.opensInNewTab.message ??
          translations.opensInNewTab.defaultMessage
        }`}
        target={
          !checkedURL.isMail && !checkedURL.isTelephone && openInNewTab
            ? '_blank'
            : null
        }
        rel="noopener noreferrer"
        className={cx(className, {
          'with-external-link-icon': showExternalIcon,
        })}
        {...props}
        aria-label={aria_label}
        ref={ref}
      >
        {children}
        {showExternalIcon && (
          <Icon
            icon="it-external-link"
            title={`${title ? title + ' - ' : ''}${intl?.formatMessage({
              id: 'opensInNewTab',
            })}`}
            size="xs"
            className="ms-1 align-sub external-link"
          />
        )}
      </a>
    );
  } else if (isDownload) {
    tag = (
      <a
        href={flattenToAppURL(url)}
        download
        title={title}
        className={
          className ? cx(className, 'matomo_download') : 'matomo_download'
        }
        {...props}
        aria-label={aria_label}
        ref={ref}
      >
        {children}
        {extended_children}
      </a>
    );
  } else if (isDisplayFile) {
    tag = (
      <a
        href={flattenToAppURL(url)}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        className={
          className ? cx(className, 'matomo_download') : 'matomo_download'
        }
        {...props}
        aria-label={aria_label}
        ref={ref}
      >
        {children}
        {extended_children}
      </a>
    );
  }
  return tag;
  }),
);

UniversalLink.propTypes = {
  href: PropTypes.string,
  openLinkInNewTab: PropTypes.bool,
  download: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  item: PropTypes.shape({
    '@id': PropTypes.string.isRequired,
    remoteUrl: PropTypes.string, //of plone @type 'Link'
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UniversalLink;
