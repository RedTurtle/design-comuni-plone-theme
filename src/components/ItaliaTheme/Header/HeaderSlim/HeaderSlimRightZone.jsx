/**
 * HeaderSlim component.
 * @module components/ItaliaTheme/Header/HeaderSlim/HeaderSlimRightZone
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getItemsByPath } from 'volto-slimheader';

import {
  ParentSiteMenu,
  LanguageSelector,
  HeaderLogin,
  TertiaryMenu,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

const HeaderSlimRightZone = () => {
  const subsite = useSelector((state) => state.subsite?.data);
  const pathname = useLocation().pathname;
  const slimHeader = useSelector((state) => state.slimHeader?.result);

  const hasSubsiteSlimItems =
    subsite &&
    (getItemsByPath(slimHeader, pathname)?.filter((item) => item.visible)
      ?.length ?? 0) > 0;

  return (
    <>
      {!hasSubsiteSlimItems && <ParentSiteMenu />}
      <TertiaryMenu />
      <LanguageSelector />
      <HeaderLogin />
    </>
  );
};

export default HeaderSlimRightZone;
