import { UniversalLink } from '@plone/volto/components';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

const HomeLink = ({ children, href, ...otherProps }) => {
  const currentLang = useSelector((state) => state.intl.locale);

  const link =
    href ?? (config.settings.isMultilingual ? '/' + currentLang : '/');
  console.log(currentLang, link);
  return (
    <UniversalLink {...otherProps} href={link}>
      {link}
      {children}
    </UniversalLink>
  );
};

export default HomeLink;
