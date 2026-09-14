import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { useClient } from '@plone/volto/hooks/client/useClient';
import { Card, CardBody, CardTitle, CardText } from 'design-react-kit';
import {
  richTextHasContent,
  RichText,
  RichTextSection,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { OSMMap } from 'volto-venue';

const messages = defineMessages({
  dove: {
    id: 'dove',
    defaultMessage: 'Indirizzo',
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
  // The map only exists in the browser, but it cannot be gated on
  // `__CLIENT__`: that is already true on the very first client render, so the
  // client would emit markup the server does not have and hydration would
  // fail. `useClient()` only turns true after the mount.
  const isClient = useClient();

  return (content.geolocation?.latitude && content.geolocation?.longitude) ||
    content.street ||
    content.zip_code ||
    content.city ||
    content.country ||
    content.circoscrizione ||
    content.quartiere ||
    richTextHasContent(content.notes) ? (
    <RichTextSection tag_id="dove" title={intl.formatMessage(messages.dove)}>
      <Card className="card card-teaser border-left-card preview-image-card card-big-io-comune shadow mt-3 rounded mb-4">
        <CardBody>
          <CardTitle>
            <h3 className="h5 card-title">{content.title}</h3>
          </CardTitle>
          {/* `CardText` renders a <p>: without `tag` the <p> below would be
              nested inside another <p>, the browser parser would close the
              outer one and the SSR DOM would stop matching React's tree,
              breaking hydration. */}
          <CardText tag="div">
            <p>
              {[content.street, content.city]
                .filter((v) => v !== null)
                .join(' - ')}
              {(content.street || content.city) &&
                (content.zip_code || content.country) && <br />}

              {[content.zip_code, content.country?.title]
                .filter((v) => v !== null)
                .join(' - ')}
            </p>
          </CardText>
        </CardBody>
      </Card>
      {isClient &&
        content.geolocation?.latitude &&
        content.geolocation?.longitude && (
          <OSMMap
            markers={[
              {
                latitude: content.geolocation.latitude,
                longitude: content.geolocation.longitude,
                title: content.title,
              },
            ]}
            mapOptions={{
              scrollWheelZoom: false,
              // tap: false,
              // dragging: false,
            }}
          />
        )}
      {content.circoscrizione && (
        <div className="circoscrizione">
          <h3 className="mt-3">
            {intl.formatMessage(messages.circoscrizione)}
          </h3>
          <div className="font-serif">{content.circoscrizione}</div>
        </div>
      )}
      {content.quartiere && (
        <div className="quartiere">
          <h3 className="mt-3">{intl.formatMessage(messages.quartiere)}</h3>
          <div className="font-serif">{content.quartiere}</div>
        </div>
      )}

      {richTextHasContent(content.notes) && (
        <div className="mt-5">
          <RichText data={content.notes} />
        </div>
      )}
    </RichTextSection>
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
