/**
 * FooterMain component.
 * @module components/Footer/FooterMain
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'design-react-kit';

import { UniversalLink } from '@plone/volto/components';
import { FooterTop } from 'volto-editablefooter';
import { getConfigByPath } from 'volto-editablefooter/utils';
import {
  FooterNavigation,
  FooterInfos,
  LogoFooter,
  BrandTextFooter,
  FooterPNRRLogo,
} from 'design-comuni-plone-theme/components/ItaliaTheme/';
import { useHomePath } from 'design-comuni-plone-theme/helpers';

/**
 * FooterMain component class.
 * @class FooterMain
 * @extends Component
 */
const FooterMain = () => {
  const location = useLocation();
  const footerConfiguration = useSelector(
    (state) => state.editableFooterColumns?.result,
  );
  const hasFooterTopContent = !!getConfigByPath(
    footerConfiguration,
    location?.pathname?.length ? location.pathname : '/',
  )?.footerTop;
  const homepath = useHomePath();
  return (
    <div className="it-footer-main">
      <Container tag="div">
        <section>
          <Row className="clearfix" tag="div">
            <Col sm={12} tag="div" widths={['xs', 'sm', 'md', 'lg', 'xl']}>
              <div className="it-brand-wrapper">
                {hasFooterTopContent ? (
                  <FooterTop />
                ) : (
                  <>
                    <FooterPNRRLogo />
                    <UniversalLink href={homepath}>
                      <LogoFooter />
                      <BrandTextFooter />
                    </UniversalLink>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </section>
        <section>
          <FooterNavigation />
        </section>
        <section className="py-4">
          <FooterInfos />
        </section>
      </Container>
    </div>
  );
};

export default FooterMain;
