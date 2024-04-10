/**
 * Icon component.
 * @module components/ItaliaTheme/Icons/SectionIcon
 */
import React from 'react';
import classNames from 'classnames';

import DesignIcon from './DesignIcon';
import TelegramSVG from './svg/TelegramSVG';
import XTwitterSVG from './svg/XTwitterSVG';
import { FontAwesomeIcon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const Icon = (props) => {
  const { icon, className, color, size, padding, ...rest } = props;
  if (icon) {
    const classes = classNames(
      'icon',
      className,
      {
        [`icon-${color}`]: color,
        [`icon-${size}`]: size,
        'icon-padded': padding,
      },
      size,
    );

    const parts = icon.split(' ');

    // TO DO: rimuovere le condizioni dell'icona di twitter quando verrà aggiornato Bootstrap Italia
    // Il commento qui sopra e' fuorviante. La 2.8.0 di bootstrap-italia ha l'icona twitter, la versione
    // usata oggi di design-react-kit e' la 5.0.0-1 e ha bootstrap-italia alla 2.6.1
    // Finche' design-react-kit non ha > 2.8.0 non possiamo usarla, dipende da design-react-kit
    if (icon.indexOf('it-') === 0 && icon !== 'it-twitter') {
      return <DesignIcon {...props} className={classes} {...rest} />;
    } else if (icon === 'telegram') {
      return <TelegramSVG className={classes} {...rest} />;
    } else if (icon === 'it-twitter') {
      return <XTwitterSVG className={classes} {...rest} />;
    } else if (parts.length > 1) {
      return (
        <FontAwesomeIcon icon={parts} className={`fal ${classes}`} {...rest} />
      );
    } else {
      return (
        <FontAwesomeIcon icon={icon} className={`fal ${classes}`} {...rest} />
      );
    }
  }
  return null;
};

export default Icon;
