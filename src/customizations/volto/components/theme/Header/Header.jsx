/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  /* Anontools,
  Logo,*/
  Navigation,
  /* SearchWidget,*/
} from '@plone/volto/components';

import {
  HeaderSlim,
  HeaderCenter,
  SubsiteHeader,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import { Headers } from 'design-react-kit';

const useDisableHeaderInteractions = () => {
  useEffect(() => {
    const body = document.body;

    const disableHeader = () => {
      if (
        body.classList.contains('cms-ui') &&
        body.classList.contains('section-edit')
      ) {
        const header = document.querySelector('header');
        if (!header) return;

        const focusables = header.querySelectorAll(
          'a, button, input, select, textarea, [tabindex], .it-socials a',
        );

        [...focusables].forEach((item) => {
          item.setAttribute('tabIndex', '-1');
          item.setAttribute('aria-hidden', 'true');
          // item.style.pointerEvents = 'none'; - disabilitare il mouse click?
        });
      }
    };

    disableHeader();

    const bodyObserver = new MutationObserver(disableHeader);
    bodyObserver.observe(body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const header = document.querySelector('header');
    let headerObserver;
    if (header) {
      headerObserver = new MutationObserver(disableHeader);
      headerObserver.observe(header, { childList: true, subtree: true });
    }

    return () => {
      bodyObserver.disconnect();
      headerObserver?.disconnect();
    };
  }, []);
};

const Header = ({ pathname }) => {
  useDisableHeaderInteractions();
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
