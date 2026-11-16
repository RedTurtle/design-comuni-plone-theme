import React from 'react';
import prettybytes from 'pretty-bytes';
import cx from 'classnames';
import { getFileViewFormat } from 'design-comuni-plone-theme/helpers';

const EnhanceLink = ({
  enhanced_link_infos,
  hideFileFormat = false,
  className,
  aria_label,
  intl,
}) => {
  let children = <></>;
  let aria_label_extended = null;

  let size =
    enhanced_link_infos.getObjSize?.replaceAll('.', ',') ??
    (enhanced_link_infos?.size
      ? prettybytes(enhanced_link_infos.size, {
          locale: intl?.locale,
        })?.toUpperCase()
      : undefined);

  if (enhanced_link_infos) {
    const viewFormat = getFileViewFormat(enhanced_link_infos);
    children = (
      <span className={cx('enhance-link', { [className]: className })}>
        {' ('}
        {!hideFileFormat && (
          <>
            <span className="file-format">{viewFormat.label}</span> -{' '}
          </>
        )}
        {size && <span className="file-size">{size}</span>}
        {')'}
      </span>
    );

    aria_label_extended =
      (aria_label ? aria_label + ' - ' : '') +
      '(' +
      viewFormat.label +
      ') ' +
      size;
  }

  return { children, aria_label: aria_label_extended };
};

export default EnhanceLink;
