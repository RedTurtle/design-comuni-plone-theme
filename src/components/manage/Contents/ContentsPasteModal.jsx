/*Customizations: 
- added message for MAX_AFFECTED_LIMIT (`limit` prop)
- on Paste, check link integrity to request user confirm to move contents
*/
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { defineMessages, useIntl, FormattedMessage } from 'react-intl';

import { Confirm, Dimmer, Loader, Message } from 'semantic-ui-react';

const messages = defineMessages({
  pasteConfirmSingleItem: {
    id: 'Paste item here?',
    defaultMessage: 'Do you want to paste the item here?',
  },
  pasteConfirmMultipleItems: {
    id: 'Paste selected items?',
    defaultMessage: 'Do you want to paste items here?',
  },
  loading: {
    id: 'paste cheching: loading',
    defaultMessage: 'Checking...',
  },
  paste: {
    id: 'Paste',
    defaultMessage: 'Paste',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

const ContentsPasteModal = (props) => {
  const { itemsToPaste = [], open, onCancel, onOk, limit } = props;
  const intl = useIntl();
  const affectedItems = useSelector(
    (state) => state.search?.subrequests?.affected_items_paste?.total ?? 0,
  );
  const loading = useSelector(
    (state) =>
      state.search?.subrequests?.affected_items_paste?.loading ?? false,
  );

  return (
    open && (
      <Confirm
        open={open}
        confirmButton={intl.formatMessage(messages.paste)}
        cancelButton={intl.formatMessage(messages.cancel)}
        header={
          itemsToPaste.length === 1
            ? intl.formatMessage(messages.pasteConfirmSingleItem)
            : intl.formatMessage(messages.pasteConfirmMultipleItems)
        }
        content={
          <div className="content">
            <Dimmer active={loading} inverted>
              <Loader indeterminate size="massive">
                {intl.formatMessage(messages.loading)}
              </Loader>
            </Dimmer>

            {affectedItems > limit ? (
              <Message warning>
                <FormattedMessage
                  id="You are pasting more then {limit} items. It's recommended to contact administrators to do this operation."
                  defaultMessage="You are pasting more then {limit} items. It's recommended to contact administrators to do this operation."
                  values={{ limit: limit }}
                />
              </Message>
            ) : null}
          </div>
        }
        onCancel={onCancel}
        onConfirm={onOk}
        size="medium"
      />
    )
  );
};

ContentsPasteModal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      UID: PropTypes.string,
    }),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ContentsPasteModal;
