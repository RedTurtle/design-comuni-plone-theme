import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

import {
  richTextHasContent,
  RichText,
  RichTextArticle,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { Locations } from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  dove: {
    id: 'dove',
    defaultMessage: 'Dove',
  },
  circoscrizione: {
    id: 'circoscrizione',
    defaultMessage: 'Circoscrizione',
  },
  quartiere: {
    id: 'quartiere',
    defaultMessage: 'Quartiere',
  },
});

const VenueWhere = ({ content }) => {
  const intl = useIntl();

  return (content.geolocation?.latitude && content.geolocation?.longitude) ||
    content.street ||
    content.zip_code ||
    content.city ||
    content.country ||
    content.circoscrizione ||
    content.quartiere ||
    richTextHasContent(content.notes) ? (
    <RichTextArticle tag_id="dove" title={intl.formatMessage(messages.dove)}>
      {content.geolocation?.latitude && content.geolocation?.longitude && (
        <Locations
          content={content}
          locations={content.sede ?? []}
          show_icon={true}
          load={true}
          show_title_link={false}
          details_link={false}
        />
      )}

      {richTextHasContent(content.notes) && (
        <div className="mt-5">
          <RichText content={content.notes} />
        </div>
      )}
    </RichTextArticle>
  ) : (
    <></>
  );
};

VenueWhere.propTypes = {
  content: PropTypes.shape({
    geolocation: PropTypes.object,
    street: PropTypes.string,
    zip_code: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    circoscrizione: PropTypes.string,
    quartiere: PropTypes.string,
  }).isRequired,
};

export default VenueWhere;
