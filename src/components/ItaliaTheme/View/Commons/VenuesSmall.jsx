import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getContent, resetContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import config from '@plone/volto/registry';

const messages = defineMessages({
  VenuesSmall: {
    id: 'VenuesSmall',
    defaultMessage: 'Luoghi',
  },
  details: {
    id: 'details',
    defaultMessage: 'Maggiori dettagli',
  },
});

/**
 * Location view component class.
 * @function Location
 * @params {object} location: object.
 * @returns {string} Markup of the component.
 */
const Location = ({ location, show_icon }) => {
  const intl = useIntl();
  const url = flattenToAppURL(location['@id']);
  const key = `luogo${url}`;
  const Image = config.getComponent({ name: 'Image' }).component;

  const locationContent = useSelector(
    (state) => state.content.subrequests?.[key],
  );
  const loaded = locationContent?.loading || locationContent?.loaded;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(getContent(url, null, key));
    }
    return () => dispatch(resetContent(key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  let location_fo = locationContent?.data;

  return location_fo ? (
    <div className="card card-teaser flex-nowrap shadow mt-3 rounded">
      {show_icon && <Icon icon={'it-pin'} />}
      <div className="card-body">
        <h5 className="card-title">{location_fo.title}</h5>
        <div className="card-text">
          {(location_fo.street || location_fo.zip_code) && (
            <p>
              {location_fo.street && location_fo.street}
              {location_fo.street && location_fo.zip_code ? ' - ' : ' '}
              {location_fo.zip_code}
            </p>
          )}
          <p className="mt-3">
            <Link
              to={flattenToAppURL(location_fo['@id'])}
              title={location_fo.title}
            >
              {intl.formatMessage(messages.details)}
            </Link>
          </p>
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
            sizes="80px"
          />
        </div>
      )}
    </div>
  ) : (
    ''
  );
};

/**
 * VenuesSmall view component class.
 * @function VenuesSmall
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const VenuesSmall = ({ venues, show_icon }) => {
  return venues ? (
    <div className="card-wrapper card-teaser-wrapper">
      {venues.map((item, i) => (
        <Location key={item['@id']} location={item} show_icon={show_icon} />
      ))}
    </div>
  ) : null;
};
export default VenuesSmall;

VenuesSmall.propTypes = {
  VenuesSmall: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      '@type': PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      review_state: PropTypes.string,
    }),
  ),
  show_icon: PropTypes.bool,
};

Location.propTypes = {
  location: PropTypes.shape({
    '@id': PropTypes.string,
    '@type': PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    review_state: PropTypes.string,
  }),
  show_icon: PropTypes.bool,
};
