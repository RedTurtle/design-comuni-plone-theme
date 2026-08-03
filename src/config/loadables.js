import loadable from '@loadable/component';
import { loadables as subsitesLoadables } from './Subsites';

export const loadables = {
  reactSlick: loadable.lib(() => import('react-slick')),
  rrule: loadable.lib(() => import('rrule')),
  htmlDiffLib: loadable.lib(() => import('htmldiff-js')),
  reactDnd: loadable.lib(() => import('react-dnd')),
  reactDndHtml5Backend: loadable.lib(() => import('react-dnd-html5-backend')),
  ...subsitesLoadables,
};
