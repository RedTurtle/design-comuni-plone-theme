import React from 'react';
import { Button, Icon } from 'design-react-kit';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchButtonText: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const SearchInput = (props) => {
  const { data, searchText, setSearchText, isLive, onTriggerSearch } = props;
  const intl = useIntl();
  const clearSearch = () => {
    setSearchText('');
    onTriggerSearch('');
  };
  return (
    <>
      <span className="autocomplete-icon bg-transparent">
        <Icon icon="it-search" aria-hidden size="sm" />
      </span>

      <input
        id={`${props.id}-searchtext`}
        value={searchText}
        type="search"
        placeholder={
          data.searchInputPrompt || intl.formatMessage(messages.search)
        }
        onKeyPress={(event) => {
          if (isLive || event.key === 'Enter') onTriggerSearch(searchText);
        }}
        onChange={({ target }) => {
          setSearchText(target.value);
          if (isLive) {
            onTriggerSearch(target.value);
          }
        }}
        className="form-control autocomplete"
      />
      {searchText && (
        <button
          className="clear-icon bg-transparent"
          onClick={clearSearch}
          title={'Clear'}
          style={{ right: isLive ? 0 : 80 }}
        >
          <Icon icon="it-close" aria-hidden size="sm" />
        </button>
      )}

      {data.showSearchButton && (
        <div className="input-group-append">
          <Button
            color="primary"
            tag="button"
            title={
              data.searchButtonLabel ||
              intl.formatMessage(messages.searchButtonText)
            }
            size="sm"
            onClick={() => onTriggerSearch(searchText)}
          >
            {data.searchButtonLabel ||
              intl.formatMessage(messages.searchButtonText)}
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchInput;
