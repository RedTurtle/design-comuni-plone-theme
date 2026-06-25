/*Customizations: 
- added message for MAX_AFFECTED_LIMIT (`limit` prop)
- on Cut, check link integrity to request user confirm to move contents
*/
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';

import { Modal, Message } from 'semantic-ui-react';

const messages = defineMessages({
  cutConfirmSingleItem: {
    id: 'Cut this item?',
    defaultMessage: 'Cut this item?',
  },
  cutConfirmMultipleItems: {
    id: 'Cut selected items?',
    defaultMessage: 'Cut selected items?',
  },
  loading: {
    id: 'link-integrity: loading',
    defaultMessage: 'Checking...',
  },
  cut: {
    id: 'link-integrity: Cut',
    defaultMessage: 'Cut',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

const ContentsAffectedItemsOnCopyModal = (props) => {
  const { onOk, limit, open } = props;
  const intl = useIntl();

  const affectedItems = useSelector(
    (state) => state.search?.subrequests?.affected_items_copy?.total ?? 0,
  );

  return (
    open && (
      <Modal
        open={open}
        confirmButton={intl.formatMessage(messages.cut)}
        cancelButton={intl.formatMessage(messages.cancel)}
        header="Copia"
        content={
          <div className="content">
            {affectedItems > limit ? (
              <Message warning>
                <FormattedMessage
                  id="You are copying more then {limit} items. It's recommended to contact administrators to do this operation."
                  defaultMessage="You are copying more then {limit} items. It's recommended to contact administrators to do this operation."
                  values={{ limit }}
                />
              </Message>
            ) : null}
          </div>
        }
        actions={['Ok']}
        onActionClick={onOk}
        size="medium"
      />
    )
  );
};

ContentsAffectedItemsOnCopyModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  limit: PropTypes.number,
};
export default ContentsAffectedItemsOnCopyModal;
