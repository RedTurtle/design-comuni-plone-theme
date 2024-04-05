import loadable from '@loadable/component';

export SearchSectionsView from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/SearchSections/View';

export const SearchSectionsEdit = loadable(() =>
  import(
    /* webpackChunkName: "DCPTMange" */ 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/SearchSections/Edit'
  ),
);

export const Sidebar = loadable(() =>
  import(
    /* webpackChunkName: "DCPTMange" */ 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/SearchSections/SideBar'
  ),
);
