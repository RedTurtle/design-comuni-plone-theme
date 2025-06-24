import React from 'react';
import PropTypes from 'prop-types';
import BodyWrapper from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/TextCard/CardWithImage/BodyWrapper';
import Block from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/TextCard/CardWithImage/Block';

const TextCardWithImageView = ({ data, id }) => {
  return (
    <BodyWrapper data={data} inEditMode={false}>
      <Block data={data} inEditMode={false} />
    </BodyWrapper>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TextCardWithImageView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export default TextCardWithImageView;
