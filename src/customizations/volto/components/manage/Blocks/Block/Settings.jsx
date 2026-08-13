/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Block/Settings.jsx
 *
 * CUSTOMIZATIONS:
 * - Pass block={block} to BlockDataForm: the original core code omits it, so
 *   InlineForm's mount effect (which re-syncs schema defaults via
 *   onChangeFormData) calls onChangeBlock(undefined, data), writing a spurious
 *   "undefined" key into the blocks map on every sidebar mount/unmount.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

const Settings = ({
  data,
  block,
  onChangeBlock,
  schema,
  navRoot,
  contentType,
}) => {
  return (
    <BlockDataForm
      block={block}
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      applySchemaEnhancers={false}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

Settings.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  schema: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(Settings);
