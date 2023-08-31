import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Row, Col } from 'design-react-kit';
import { UniversalLink } from '@plone/volto/components';
import { searchContent, resetSearchContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import {
  Icon,
  CardCalendar,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

import config from '@plone/volto/registry';

const messages = defineMessages({
  events: {
    id: 'events',
    defaultMessage: 'Appuntamenti',
  },
  title: {
    id: 'event_title',
    defaultMessage: 'Eventi',
  },
  immagine: {
    id: 'Immagine',
    defaultMessage: 'Immagine',
  },
});

/**
 * Evento view component class.
 * @function Evento
 * @params {object} Evento: object.
 * @returns {string} Markup of the component.
 */
const Evento = ({ event, show_image }) => {
  const intl = useIntl();
  const Image = config.getComponent({ name: 'Image' }).component;

  return event ? (
    <Col lg="6">
      <Card className="card-teaser-image no-after rounded shadow">
        {show_image &&
          (event.image_field || event.preview_image || event.image) && (
            <div className="img-responsive-wrapper">
              <div className="img-responsive img-responsive-panoramic">
                <figure className="img-wrapper">
                  <Image
                    item={event}
                    alt={intl.formatMessage(messages.immagine)}
                    loading="lazy"
                  />
                </figure>
                <CardCalendar
                  start={event.start}
                  end={event.end}
                  recurrence={event.recurrence}
                />
              </div>
            </div>
          )}
        <CardBody>
          <h5 className="card-title card-title-icon">
            <Icon icon={'it-calendar'}></Icon>
            <span className="text-uppercase">
              {intl.formatMessage(messages.title)}
            </span>
          </h5>
          <div className="card-text">
            {event.luogo_evento?.length > 0 && (
              <p className="text-uppercase">{event.luogo_evento[0]?.title}</p>
            )}

            <UniversalLink
              href={flattenToAppURL(event['@id'])}
              title={event.title}
            >
              <h6 className="font-weight-semibold card-title">{event.title}</h6>
            </UniversalLink>
          </div>
        </CardBody>
      </Card>
    </Col>
  ) : null;
};

/**
 * Events view component class.
 * @function Events
 * @params {object} content: Eventi object.
 * @returns {string} Markup of the component.
 */
const Events = ({ content, title, show_image, folder_name, isChild }) => {
  const intl = useIntl();

  const path = isChild ? content.parent['@id'] : content['@id'];
  const searchResults = useSelector((state) => state.search.subrequests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !searchResults?.[folder_name]?.loading &&
      !searchResults?.[folder_name]?.loaded
    ) {
      dispatch(
        searchContent(
          flattenToAppURL(path),
          {
            portal_type: 'Event',
            'path.depth': 1,
            sort_on: 'getObjPositionInParent',
            fullobjects: true,
          },
          folder_name,
        ),
      );
    }
    return () => {
      // dispatch(resetSearchContent(folder_name)); //quando si passa agli eventi figli non si vedono piu gli eventi se questo è abilitato
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  let events = searchResults?.[folder_name]?.items || [];

  if (isChild) {
    events = [...events].filter((el) => !content['@id'].includes(el['@id']));
  }

  return (
    <>
      {events.length > 0 ? (
        <article
          id="appuntamenti"
          className="it-page-section anchor-offset mt-5"
          aria-labelledby={'header-appuntamenti'}
        >
          {title ? (
            <h4 id="header-appuntamenti">{title}</h4>
          ) : (
            <h4 id="header-appuntamenti">
              {intl.formatMessage(messages.events)}
            </h4>
          )}
          <Row>
            <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal card-teaser-block-2">
              {events.map((item, i) => (
                <Evento
                  key={item['@id']}
                  event={item}
                  show_image={show_image}
                />
              ))}
            </div>
          </Row>
        </article>
      ) : null}
    </>
  );
};

export default Events;

Events.propTypes = {
  content: PropTypes.object,
  show_image: PropTypes.bool,
  isChild: PropTypes.bool,
  title: PropTypes.string,
  folder_name: PropTypes.string,
};

Evento.propTypes = {
  event: PropTypes.object,
  show_image: PropTypes.bool,
};
