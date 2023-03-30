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

// eslint-disable-next-line import/no-unresolved
import logo from '../Logo/logo.png?width=164';

const LogoFooter = () => (
  <img className="icon" src={logo} width="82" height="82" alt="Logo" />
);

export default LogoFooter;
