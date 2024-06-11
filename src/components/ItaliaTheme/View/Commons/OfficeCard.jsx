import { useIntl, defineMessages } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import config from '@plone/volto/registry';

/**
 * OfficeCard view component class.
 * @function OfficeCard
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const OfficeCard = ({
  office,
  icon,
  children,
  margin_bottom = false,
  show_contacts = true,
  showimage = true,
  size,
  no_details = false,
  ...rest
}) => {
  const intl = useIntl();
  const Image = config.getComponent({ name: 'Image' }).component;
  const image =
    showimage && Image({ item: office, sizes: '80px', loading: 'lazy' });

  return (
    <div
      className={cx(
        'card card-teaser office-card preview-image-card border-left-card rounded shadow p-3 ',
        size === 'big' ? 'card-big-io-comune' : 'card-small',
        {
          'mb-3': margin_bottom,
        },
      )}
      {...rest}
    >
      {icon && (
        <Icon
          icon={icon}
          title={intl.formatMessage(messages.icona_ufficio)}
        ></Icon>
      )}
      <div className="card-body pe-3">
        <div className="card-title h5">
          <UniversalLink
            item={office}
            title={office.title}
            data-element="service-area"
          >
            {office.title}
          </UniversalLink>
        </div>
        <p className="card-text">{office.description}</p>
        {show_contacts && office?.sede?.length > 0 && (
          <div>
            {office?.sede?.map((sede, i) => {
              return (
                <div key={i}>
                  {sede.street && <p className="card-text">{sede.street}</p>}
                  {(sede.city || sede.zip_code) && (
                    <p className="card-text">
                      {sede.zip_code} {sede.city}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {/* Con bootstrap-italia 2.8.x e' OBBLIGATORIO che i children siano in clusi in un p
        con class card-text se volete che si veda bene e con la stessa tipografia del resto
        della card */}
        {children && <div>{children}</div>}
      </div>
      {image && <div className="image-container">{image}</div>}
    </div>
  );
};
export default OfficeCard;

OfficeCard.propTypes = {
  office: PropTypes.shape({
    '@id': PropTypes.string,
    '@type': PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    review_state: PropTypes.string,
  }),
  icon: PropTypes.string,
};

const messages = defineMessages({
  icona_ufficio: {
    id: 'icona_ufficio',
    defaultMessage: 'Icona ufficio',
  },
});
