/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/manage/Blocks/Search/components/SearchDetails.jsx
 *
 * CUSTOMIZATIONS:
 * - Agid styling
 * - Default `as` prop changed from `h4` to `p`
 * - Added `aria-live="polite"` to the wrapping element for accessibility
 * - Use the shared `commonSearchBlockMessages.searchedFor` message (from
 *   design-comuni-plone-theme/helpers) instead of the local inline
 *   `FormattedMessage` for "Searched for: <em>{searchedtext}</em>."
 * - Wrap the total results count in `<b>` for bold display
 */
import { commonSearchBlockMessages } from 'design-comuni-plone-theme/helpers';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchResults: {
    id: 'Search results',
    defaultMessage: 'Search results',
  },
});

const SearchDetails = ({ total, text, as = 'p', data }) => {
  const El = as;
  const intl = useIntl();
  return (
    <El className="search-details" aria-live="polite">
      <>
        {text && (
          <>
            {intl.formatMessage(commonSearchBlockMessages.searchedFor, {
              em: (...chunks) => <em>{chunks}</em>,
              searchedtext: text,
            })}
          </>
        )}{' '}
        {data.showTotalResults && (
          <>
            {intl.formatMessage(messages.searchResults)}: <b>{total}</b>
          </>
        )}
      </>
    </El>
  );
};

export default SearchDetails;
