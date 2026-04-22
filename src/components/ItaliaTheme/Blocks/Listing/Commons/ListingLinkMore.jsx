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

export const ListingLinkMore = ({
  title,
  href,
  className = '',
  blockTitle,
}) => {
  const intl = useIntl();
  const url = href?.[0]?.['@id'];
  const linkText = title || intl.formatMessage(messages.view_all);
  const ariaLabel =
    !title && blockTitle ? `${linkText} ${blockTitle}` : undefined;

  return url ? (
    <div className={`link-button text-center ${className}`}>
      <UniversalLink
        href={flattenToAppURL(url)}
        className="btn btn-tertiary"
        aria-label={ariaLabel}
      >
        {linkText}
      </UniversalLink>
    </div>
  ) : null;
};

ListingLinkMore.propTypes = {
  linkMore: PropTypes.object,
  blockTitle: PropTypes.string,
};

export default ListingLinkMore;
