/*
 * Customization with image
 *
 * If you have a jpg/png, do like this:
 *
 * <figure className="icon">
 *  <img src={logo} alt="" />
 * </figure>
 *
 * Note the icon class.
 */

/* SVG example */
// import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
// const Logo = () => <Icon color="" icon="it-pa" padding={false} size="" />;

/* PNG example using https://www.npmjs.com/package/webpack-image-resize-loader *
 * works, but some issues with prettier and jest
 */
// eslint-disable-next-line import/no-unresolved
//import logo from './logo.png?width=164';
import logo from './logo.png';
import { useSelector } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';

const Logo = () => {
  const site = useSelector((state) => state.site.data);

  const image_attrs = {};

  if (site['plone.site_logo']) {
    image_attrs.src = flattenToAppURL(site['plone.site_logo']);
  } else {
    image_attrs.src = logo;
    image_attrs.width = '82';
    image_attrs.height = '82';
  }

  return <img className="icon" alt="Logo" {...image_attrs} />;
};

export default Logo;
