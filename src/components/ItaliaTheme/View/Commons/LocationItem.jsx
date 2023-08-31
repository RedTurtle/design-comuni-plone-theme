import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';
import { getContent, resetContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import config from '@plone/volto/registry';

const messages = defineMessages({
  locations: {
    id: 'locations',
    defaultMessage: 'Luoghi',
  },
  details: {
    id: 'details',
    defaultMessage: 'Maggiori dettagli',
  },
  quartiere: {
    id: 'quartiere',
    defaultMessage: 'Quartiere',
  },
  circoscrizione: {
    id: 'circoscrizione',
    defaultMessage: 'Circoscrizione',
  },
});

const LocationItem = ({
  location,
  show_icon,
  show_title_link,
  load = true,
  details_link = true,
}) => {
  const intl = useIntl();
  const url = flattenToAppURL(location['@id']);
  const key = `luogo${url}`;
  const locationContent = useSelector((state) => state.content.subrequests);
  const loaded =
    locationContent?.[key]?.loading || locationContent?.[key]?.loaded;
  const dispatch = useDispatch();

  useEffect(() => {
    if (load && !loaded) {
      dispatch(getContent(url, null, key));
      return () => dispatch(resetContent(key));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  let location_fo = locationContent?.[key]?.data || location;

  let address = ['street', 'city', 'zip_code']
    .map((key) => location_fo?.[key])
    .filter(Boolean)
    .join(' - ');

  const Image = config.getComponent({ name: 'Image' }).component;

  return location_fo ? (
    <div className="card card-teaser shadow mt-3 rounded flex-nowrap location-item">
      {show_icon && <Icon icon={'it-pin'} />}
      <div className="card-body">
        <h5 className="card-title">
          {(location_fo.nome_sede || location_fo.title) && (
            <>
              {location_fo['@type'] === 'Venue' ||
              (location_fo['@type'] === 'UnitaOrganizzativa' &&
                show_title_link) ? (
                <UniversalLink
                  href={flattenToAppURL(location_fo['@id'])}
                  title={location_fo.title || ''}
                >
                  {location_fo.nome_sede || location_fo.title}
                </UniversalLink>
              ) : (
                location_fo.nome_sede || location_fo.title
              )}
            </>
          )}
        </h5>
        <div className="card-text">
          <p>{address}</p>

          {!details_link && (
            <>
              {location_fo.quartiere && (
                <p>
                  {intl.formatMessage(messages.quartiere)}:{' '}
                  {location_fo.quartiere}
                </p>
              )}
              {location_fo.circoscrizione && (
                <p>
                  {intl.formatMessage(messages.circoscrizione)}:{' '}
                  {location_fo.circoscrizione}
                </p>
              )}
            </>
          )}
          {details_link && (
            <p className="mt-3">
              <UniversalLink
                href={flattenToAppURL(location_fo['@id'])}
                title={location_fo.title || ''}
              >
                {intl.formatMessage(messages.details)}
              </UniversalLink>
            </p>
          )}
        </div>
      </div>
      {((location_fo.image_field && location_fo[location_fo.image_field]) ||
        location_fo.image) && (
        <div className="avatar ml-3 size-xl">
          <Image
            item={{
              ...location_fo,
              image_field: location_fo.image_field ?? 'image',
            }}
            loading="lazy"
          />
        </div>
      )}
    </div>
  ) : (
    ''
  );
};

LocationItem.propTypes = {
  location: PropTypes.shape({
    '@id': PropTypes.string,
    '@type': PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    review_state: PropTypes.string,
  }),

  show_icon: PropTypes.bool,
};

export default LocationItem;
