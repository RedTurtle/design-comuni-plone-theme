import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import {
  Card,
  CardBody,
  CardTitle,
} from 'design-react-kit/dist/design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';
import { viewDate } from 'design-comuni-plone-theme/helpers';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const messages = defineMessages({
  attachment: {
    id: 'attachment',
    defaultMessage: 'Allegato',
  },
  last_update: {
    id: 'last_update',
    defaultMessage: 'Ultimo agg.to:',
  },
});

const Attachment = ({
  title,
  description,
  download_url,
  item,
  showModified = false,
}) => {
  const intl = useIntl();
  return (
    <Card
      className="card card-teaser shadow p-4 mt-3 rounded attachment"
      noWrapper={true}
      tag="div"
    >
      <Icon
        icon="it-clip"
        alt={intl.formatMessage(messages.attachment)}
        title={intl.formatMessage(messages.attachment)}
      />
      <CardBody tag="div">
        <CardTitle tag="h5">
          <a href={flattenToAppURL(download_url)}>{title}</a>
        </CardTitle>
        {description && <p>{description}</p>}

        {showModified && item?.modified && (
          <p>
            {intl.formatMessage(messages.last_update)}{' '}
            {viewDate(intl.locale, item?.modified, 'DD-MM-Y HH:MM')}
          </p>
        )}
      </CardBody>
    </Card>
  );
};
Attachment.propTypes = {
  title: PropTypes.string,
  download_url: PropTypes.string,
};

export default Attachment;
