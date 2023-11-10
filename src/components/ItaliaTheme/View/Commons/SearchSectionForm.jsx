import { defineMessages, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'design-react-kit';
import { getSearchFilters } from 'design-comuni-plone-theme/actions';
import { SearchUtils } from 'design-comuni-plone-theme/components';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const { getSearchParamsURL } = SearchUtils;
/**
 * SearchSectionForm view component class.
 * @function SearchSectionForm
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */

const messages = defineMessages({
  search: {
    id: 'search',
    defaultMessage: 'Cerca',
  },
  searchLabel: {
    id: 'searchContentIn',
    defaultMessage: 'Cerca contenuti in',
  },
});

const SearchSectionForm = ({ content }) => {
  const dispatch = useDispatch();
  const path = content['@id'];
  const searchFilters = useSelector(
    (state) => state?.searchFilters?.result?.sections,
  );

  useEffect(() => {
    if (!searchFilters || Object.keys(searchFilters).length === 0)
      dispatch(getSearchFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customPath = [];

  const sections = searchFilters?.[0]?.items ?? [];

  sections.forEach((section) => {
    if (!section.items) {
      return;
    } else {
      if (path === section['@id']) {
        customPath.push(section.items.map((item) => item['@id']));
      }
    }
  });

  const intl = useIntl();

  const subsite = useSelector((state) => state.subsite?.data);
  const [searchableText, setSearchableText] = useState('');
  const doSearch = (e) => {
    if (!e || e.key === 'Enter') {
      if (__CLIENT__)
        window.location.href =
          window.location.origin +
          getSearchParamsURL(
            searchableText,
            {},
            {},
            {},
            {},
            null,
            null,
            customPath.length > 0 ? customPath : null,
            subsite,
            intl.locale,
            false,
          );
    }
  };
  return (
    <div className="form-group mt-5 search-section-form">
      <div className="input-group">
        <input
          id="search-page-text"
          type="text"
          value={searchableText}
          className="form-control"
          onChange={(e) => setSearchableText(e.target.value)}
          onKeyDown={doSearch}
          placeholder={`${intl.formatMessage(messages.searchLabel)} "${
            content.title
          }"`}
          aria-label={`${intl.formatMessage(messages.searchLabel)} "${
            content.title
          }"`}
          aria-describedby="search-page-button"
        />
        <Button
          color="link"
          onClick={() => doSearch()}
          title={intl.formatMessage(messages.search)}
          id="search-page-button"
          className="pe-2 py-0 rounded-0"
        >
          <Icon icon="it-search" aria-hidden={true} size="sm" />
        </Button>
      </div>
    </div>
  );
};

export default SearchSectionForm;

SearchSectionForm.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};
