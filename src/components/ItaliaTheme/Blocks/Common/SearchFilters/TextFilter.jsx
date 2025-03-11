import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  text_filter_placeholder: {
    id: 'text_filter_placeholder',
    defaultMessage: 'Inserisci un valore',
  },
});

const TextFilter = ({ value, id, onChange, placeholder }) => {
  const intl = useIntl();
  const filterID = uuid();

  return (
    <div className="me-lg-3 my-2 my-lg-1 filter-wrapper text-filter">
      <label for={filterID} className="visually-hidden">
        {placeholder}
      </label>
      <input
        type="text"
        placeholder={
          placeholder || intl.formatMessage(messages.text_filter_placeholder)
        }
        value={value}
        onChange={(e, data) => {
          onChange(id, e.target.value ?? '');
        }}
        autocomplete="off"
        id={filterID}
      />
    </div>
  );
};

export default TextFilter;
