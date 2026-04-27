import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

const messages = defineMessages({
  view_all: {
    id: 'Vedi tutto',
    defaultMessage: 'Vedi tutto',
  },
});

export const ListingLinkMore = ({ title, href, className = '', ariaLabel }) => {
  const intl = useIntl();
  const url = href?.[0]?.['@id'];
  const linkText = title || intl.formatMessage(messages.view_all);
  // No custom button text: add aria-label with section title for context (es. "Vedi tutto Notizie").
  // Custom button text: skip aria-label, editor is responsible for a descriptive text.
  const ariaLabelTitle =
    !title && ariaLabel ? `${linkText} ${ariaLabel}` : undefined;

  return url ? (
    <div className={`link-button text-center ${className}`}>
      <UniversalLink
        href={flattenToAppURL(url)}
        className="btn btn-tertiary"
        aria-label={ariaLabelTitle}
      >
        {linkText}
      </UniversalLink>
    </div>
  ) : null;
};

ListingLinkMore.propTypes = {
  linkMore: PropTypes.object,
  ariaLabel: PropTypes.string,
};

export default ListingLinkMore;
