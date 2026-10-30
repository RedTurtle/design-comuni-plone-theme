/**
 * ScrollToTop component.
 * @module components/ScrollToTop/ScrollToTop
 */

import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'design-react-kit';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { useSiteLanguage } from 'design-comuni-plone-theme/helpers/contentLanguage';

const messages = defineMessages({
  scrollToTop: {
    id: 'Scroll to top',
    defaultMessage: 'Torna su',
  },
  scrollToTopAriaLabel: {
    id: "Torna all'inizio della pagina",
    defaultMessage: "Torna all'inizio della pagina",
  },
});

const ScrollToTop = () => {
  const intl = useIntl();
  // site chrome keeps the site language when the content is in another one
  const siteLanguage = useSiteLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {isVisible && (
        <div
          className="public-ui scroll-to-top"
          lang={siteLanguage.lang}
          dir={siteLanguage.dir}
        >
          <Button
            color="tertiary"
            size="sm"
            title={intl.formatMessage(messages.scrollToTop)}
            onClick={scrollToTop}
            aria-label={intl.formatMessage(messages.scrollToTopAriaLabel)}
          >
            <Icon icon="it-arrow-up" padding={false} size="sm" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
