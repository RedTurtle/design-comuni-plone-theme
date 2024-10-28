import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import redraft from 'redraft';
import { Container, Row, Col } from 'design-react-kit/dist/design-react-kit';
import config from '@plone/volto/registry';
import AlertWrapper from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Alert/AlertWrapper.jsx';

const View = ({ data }) => {
  const content = data.text
    ? redraft(
        data.text,
        config.settings.richtextViewSettings.ToHTMLRenderers,
        config.settings.richtextViewSettings.ToHTMLOptions,
      )
    : '';

  return content ? (
    <AlertWrapper data={data}>
      <section role="alert" className="block alertblock">
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
    </AlertWrapper>
  ) : null;
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default React.memo(View);
