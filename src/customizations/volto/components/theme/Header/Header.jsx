/**
 * Header component.
 * @module components/theme/Header/Header
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/theme/Header/Header.jsx
 *
 * CUSTOMIZATIONS:
 * - Replaced the semantic-ui-react Segment/Container markup with the Italia
 *   design system header, composed from HeaderSlim, HeaderCenter and
 *   SubsiteHeader (design-comuni-plone-theme/components/ItaliaTheme) and
 *   Headers (design-react-kit), wrapped in a `.public-ui` div plus an empty
 *   `#portal-header-image` placeholder div.
 * - Dropped the Anontools, LanguageSelector, Logo and SearchWidget usage
 *   (kept only as commented-out imports) since they are rendered elsewhere
 *   in the Italia theme header components.
 * - Removed the token/useSelector logic (anonymous tools were previously
 *   shown based on `!token`); no longer needed since Anontools is not
 *   rendered here.
 * - Removed the `content` prop and the `Header.defaultProps` block.
 */

import React /*, { useEffect, useState } */ from 'react';

import PropTypes from 'prop-types';

/* import Anontools from '@plone/volto/components/theme/Anontools/Anontools'; */
/* import Logo from '@plone/volto/components/theme/Logo/Logo'; */
import Navigation from '@plone/volto/components/theme/Navigation/Navigation';
/* import SearchWidget from '@plone/volto/components/theme/SearchWidget/SearchWidget'; */

import {
  HeaderSlim,
  HeaderCenter,
  SubsiteHeader,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import { Headers } from 'design-react-kit';

const Header = ({ pathname }) => {
  // const [mini, setMini] = useState(false);

  // const handleScroll = () => {
  //   setMini(window.pageYOffset > 120);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <>
      <div className="public-ui">
        <header>
          {/* <div
        className="sticky-placeholder"
        style={{ paddingTop: mini ? '50px' : '120px' }}
      /> */}
          {/* <Headers sticky={true} className={mini ? 'is-sticky' : undefined}> */}
          <Headers>
            <HeaderSlim />

            <div className="it-nav-wrapper">
              <HeaderCenter />
              <Navigation pathname={pathname} />
            </div>
          </Headers>
          <SubsiteHeader />
        </header>
      </div>

      <div id="portal-header-image"></div>
    </>
  );
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Header;
