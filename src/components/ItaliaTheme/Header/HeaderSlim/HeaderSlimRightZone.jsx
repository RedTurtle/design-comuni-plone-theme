/**
 * HeaderSlim component.
 * @module components/ItaliaTheme/Header/HeaderSlim
 */

import React from 'react';
import { useSelector } from 'react-redux';

import {
  ParentSiteMenu,
  LanguageSelector,
  SpidLogin,
  TertiaryMenu,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

const HeaderSlimRightZone = () => {
  const subsite = useSelector((state) => state.subsite?.data);
  return (
    <>
      <ParentSiteMenu />
      {!subsite && <TertiaryMenu />}
      <LanguageSelector />
      <SpidLogin />
    </>
  );
};

export default HeaderSlimRightZone;
