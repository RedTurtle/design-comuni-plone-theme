/**
 * View Alert block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import redraft from 'redraft';
import { Container, Row, Col } from 'design-react-kit/dist/design-react-kit';
//import { isCmsUi } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import Dates from './Dates';

/**
 * View Alert block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data } = props;
  const userLogged = useSelector((state) => state.userSession.token);

  const content = data.text
    ? redraft(
        data.text,
        config.settings.richtextViewSettings.ToHTMLRenderers,
        config.settings.richtextViewSettings.ToHTMLOptions,
      )
    : '';

  const currentDate = new Date();
  const startDateObj = data.startDate ? new Date(data.startDate) : null;
  const endDateObj = data.endDate ? new Date(data.endDate) : null;

  const isStartActive = startDateObj ? startDateObj <= currentDate : true;
  const isEndActive = endDateObj ? endDateObj >= currentDate : true;

  const isAlertActive =
    startDateObj && endDateObj
      ? isStartActive && isEndActive
      : startDateObj
      ? isStartActive
      : isEndActive;

  return content && (userLogged || isAlertActive) ? (
    <section role="alert" className="block alertblock">
      {userLogged && (
        <Dates startDate={data.startDate} endDate={data.endDate} {...props} />
      )}
      <Row className={cx('row-full-width', 'bg-alert-' + data.color)}>
        <Container className="p-4 pt-5 pb-5">
          <Row className="align-items-start">
            {data.image?.data && (
              <Col sm={2} className="pb-3 image-col">
                <img
                  src={`data:${data.image['content-type']};${data.image.encoding},${data.image.data}`}
                  alt=""
                  aria-hidden="true"
                  className={cx('left-image', [
                    data.sizeImage ? 'size-' + data.sizeImage : 'size-l',
                  ])}
                  loading="lazy"
                />
              </Col>
            )}
            <Col>{content}</Col>
          </Row>
        </Container>
      </Row>
    </section>
  ) : (
    <></>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default React.memo(View);
