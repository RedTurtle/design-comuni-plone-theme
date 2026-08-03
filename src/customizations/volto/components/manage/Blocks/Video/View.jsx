/**
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Video/View.jsx
 *
 * CUSTOMIZATIONS:
 * - import `Body` from the local customized `./Body` module instead of
 *   `@plone/volto/components/manage/Blocks/Video/Body`, so this block uses
 *   this repo's customized Body component
 * - do not wrap the component with `withBlockExtensions` and do not accept/
 *   apply the `className` prop it would provide
 */
/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body';
import cx from 'classnames';

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  return (
    <div
      className={cx(
        'block video align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <Body data={data} />
    </div>
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

export default View;
