import React, { useState } from 'react';
import { Button, Icon, Input, Label } from 'design-react-kit';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  search: {
    id: 'SearchSearchBlock',
    defaultMessage: 'Cerca una parola chiave',
  },
  searchButtonText: {
    id: 'SearchSearchBlockButtonText',
    defaultMessage: 'Search',
  },
  clearSearch: {
    id: 'clearSearch',
    defaultMessage: 'Clear search',
  },
});

const SearchInput = (props) => {
  const {
    data,
    searchText,
    setSearchText,
    isEditMode,
    isLive,
    onTriggerSearch,
  } = props;
  const intl = useIntl();
  const clearSearch = () => {
    setSearchText('');
    onTriggerSearch('');
  };
  const [focused, setFocused] = useState(false);
  return (
    <>
      <span className="autocomplete-icon bg-transparent">
        <Icon icon="it-search" aria-hidden size="sm" />
      </span>
      <Label
        htmlFor={`${props.id}-searchtext`}
        className={focused ? 'active' : 'inactive'}
      >
        {intl.formatMessage(messages.search)}
      </Label>
      <Input
        noWrapper
        disabled={isEditMode}
        id={`${props.id}-searchtext`}
        value={searchText}
        type="search"
        placeholder={
          focused || data.searchInputPrompt
            ? data.searchInputPrompt
            : intl.formatMessage(messages.search)
        }
        onKeyPress={(event) => {
          if (isLive || event.key === 'Enter') onTriggerSearch(searchText);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
          title={intl.formatMessage(messages.clearSearch)}
          style={{ right: isLive ? 0 : 80 }}
        >
          <Icon
            icon="it-close"
            aria-label={intl.formatMessage(messages.clearSearch)}
            title={intl.formatMessage(messages.clearSearch)}
            size="sm"
          />
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
