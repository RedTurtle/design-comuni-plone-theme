/**
 * Edit video block.
 * @module components/manage/Blocks/Title/Edit
 *
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Video/Edit.jsx
 *
 * CUSTOMIZATIONS:
 * - handle url validation and show users errors
 * - validate the submitted url with `checkIfValidVideoLink` (repo helper),
 *   honoring `data.allowExternals` / `config.settings.videoAllowExternalsDefault`,
 *   before calling `onChangeBlock`
 * - on an invalid url, keep the block empty, flag the Input as errored and
 *   show a `VideoBlockInvalidLink` `Toast` error notification (via
 *   `toastify`) instead of applying the url
 * - import `Body` from the local `./Body` customization instead of
 *   `@plone/volto/components/manage/Blocks/Video/Body`
 * - replaced the upstream `withBlockExtensions` HOC with `injectLazyLibs(['toastify'])`
 */

import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Input, Message } from 'semantic-ui-react';
import cx from 'classnames';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import VideoSidebar from '@plone/volto/components/manage/Blocks/Video/VideoSidebar';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import videoBlockSVG from '@plone/volto/components/manage/Blocks/Video/block-video.svg';
import Body from './Body';
import { checkIfValidVideoLink } from 'design-comuni-plone-theme/helpers/index.js';
import config from '@plone/volto/registry';
import Image from '@plone/volto/components/theme/Image/Image';

const messages = defineMessages({
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Type a Video (YouTube, Vimeo or mp4) URL',
    defaultMessage: 'Type a Video (YouTube, Vimeo or mp4) URL',
  },
  allowedURLs: {
    id: '{sources} or mp4 URL allowed',
    defaultMessage: '{sources} or mp4 URL allowed',
  },
  VideoBlockInvalidLink: {
    id: 'VideoBlockInvalidLink',
    defaultMessage:
      "L'URL fornito è invalido e non può essere processato. Per favore, inserisci un URL valido (YouTube, Vimeo or mp4).",
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

const Edit = (props) => {
  const { data, block, onChangeBlock, selected, toastify } = props;
  const intl = useIntl();
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);

  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
    setError(null);
  };

  const onSubmitUrl = useCallback(() => {
    const allowsExternals =
      data.allowExternals !== undefined
        ? !!data.allowExternals
        : !!config.settings.videoAllowExternalsDefault;
    if (checkIfValidVideoLink(url, allowsExternals)) {
      onChangeBlock(block, {
        ...data,
        url: url,
      });
      setError(null);
    } else {
      setError('VideoBlockInvalidLink');
      toastify.toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error)}
          content={intl.formatMessage(messages['VideoBlockInvalidLink'])}
        />,
      );
    }
  }, [onChangeBlock, block, data, url, toastify, intl]);

  const resetSubmitUrl = () => {
    setUrl('');
    setError(null);
  };

  const onKeyDownVariantMenuForm = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        onSubmitUrl();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Do something on ESC key
      }
    },
    [onSubmitUrl],
  );
  const peertubeInstances =
    config.blocks.blocksConfig.video.allowedPeertubeInstances;
  const placeholder = useMemo(
    () =>
      data.placeholder ||
      intl.formatMessage(messages.VideoBlockInputPlaceholder, {
        instances: peertubeInstances.join(', '),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intl, data],
  );

  return (
    <div
      className={cx(
        'block video align',
        {
          selected: selected,
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url ? (
        <Body data={data} isEditMode={true} />
      ) : (
        <Message>
          <center>
            <Image src={videoBlockSVG} alt="" />
            <p>
              {intl.formatMessage(messages.allowedURLs, {
                sources:
                  peertubeInstances.length > 0
                    ? `Youtube, Vimeo, Peertube (${peertubeInstances.join(
                        ', ',
                      )}) instance`
                    : 'Youtube, Vimeo',
              })}
            </p>

            <div className="toolbar-inner">
              <Input
                onKeyDown={onKeyDownVariantMenuForm}
                onChange={onChangeUrl}
                placeholder={placeholder}
                value={url}
                error={!!error}
                // Prevents propagation to the Dropzone and the opening
                // of the upload browser dialog
                onClick={(e) => e.stopPropagation()}
              />
              {url && (
                <Button.Group>
                  <Button
                    type="button"
                    basic
                    className="cancel"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUrl('');
                    }}
                  >
                    <Icon name={clearSVG} size="30px" />
                  </Button>
                </Button.Group>
              )}
              <Button.Group>
                <Button
                  type="button"
                  basic
                  primary
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubmitUrl();
                  }}
                >
                  <Icon name={aheadSVG} size="30px" />
                </Button>
              </Button.Group>
            </div>
          </center>
        </Message>
      )}
      <SidebarPortal selected={selected}>
        <VideoSidebar {...props} resetSubmitUrl={resetSubmitUrl} />
      </SidebarPortal>
    </div>
  );
};

Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default injectLazyLibs(['toastify'])(Edit);
